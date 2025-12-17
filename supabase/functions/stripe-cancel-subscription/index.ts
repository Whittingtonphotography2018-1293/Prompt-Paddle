import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2024-12-18.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const { data: customer } = await supabaseClient
      .from("stripe_customers")
      .select("customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!customer) {
      throw new Error("No customer found");
    }

    const { data: subscription } = await supabaseClient
      .from("stripe_subscriptions")
      .select("subscription_id")
      .eq("customer_id", customer.customer_id)
      .maybeSingle();

    if (!subscription || !subscription.subscription_id) {
      throw new Error("No active subscription found");
    }

    const canceledSubscription = await stripe.subscriptions.update(
      subscription.subscription_id,
      {
        cancel_at_period_end: true,
      }
    );

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabaseAdmin.from("stripe_subscriptions").update({
      cancel_at_period_end: true,
      updated_at: new Date().toISOString(),
    }).eq("subscription_id", subscription.subscription_id);

    return new Response(
      JSON.stringify({
        success: true,
        cancel_at_period_end: canceledSubscription.cancel_at_period_end,
        current_period_end: canceledSubscription.current_period_end,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});
