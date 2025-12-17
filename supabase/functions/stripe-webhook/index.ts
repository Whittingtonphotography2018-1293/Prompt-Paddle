import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@17.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.49.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") as string, {
  apiVersion: "2024-12-18.acacia",
  httpClient: Stripe.createFetchHttpClient(),
});

const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

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

  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response(JSON.stringify({ error: "No signature" }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
      undefined,
      Stripe.createSubtleCryptoProvider()
    );

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const paymentMethod = await stripe.paymentMethods.retrieve(
          subscription.default_payment_method as string
        );

        await supabaseAdmin.from("stripe_subscriptions").upsert({
          customer_id: session.customer as string,
          subscription_id: subscription.id,
          price_id: subscription.items.data[0].price.id,
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          payment_method_brand: paymentMethod.card?.brand,
          payment_method_last4: paymentMethod.card?.last4,
          status: subscription.status,
          updated_at: new Date().toISOString(),
        });

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        let paymentMethodData = {};
        if (subscription.default_payment_method) {
          const paymentMethod = await stripe.paymentMethods.retrieve(
            subscription.default_payment_method as string
          );
          paymentMethodData = {
            payment_method_brand: paymentMethod.card?.brand,
            payment_method_last4: paymentMethod.card?.last4,
          };
        }

        await supabaseAdmin.from("stripe_subscriptions").upsert({
          customer_id: subscription.customer as string,
          subscription_id: subscription.id,
          price_id: subscription.items.data[0].price.id,
          current_period_start: subscription.current_period_start,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          ...paymentMethodData,
          status: subscription.status,
          updated_at: new Date().toISOString(),
        });

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string
          );

          await supabaseAdmin.from("stripe_subscriptions").upsert({
            customer_id: invoice.customer as string,
            subscription_id: subscription.id,
            price_id: subscription.items.data[0].price.id,
            current_period_start: subscription.current_period_start,
            current_period_end: subscription.current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
            status: subscription.status,
            updated_at: new Date().toISOString(),
          });
        }

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Webhook handler failed" }),
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
