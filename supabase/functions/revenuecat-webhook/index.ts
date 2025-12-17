import { createClient } from 'npm:@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface RevenueCatWebhookEvent {
  event: {
    type: string;
    app_user_id: string;
    product_id: string;
    period_type: string;
    purchased_at_ms: number;
    expiration_at_ms: number | null;
    store: string;
    environment: string;
    entitlement_ids: string[];
    will_renew: boolean;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: RevenueCatWebhookEvent = await req.json();
    const { event } = payload;

    console.log('RevenueCat webhook received:', event.type);

    const revenueCatUserId = event.app_user_id;
    const productId = event.product_id;
    const store = event.store;
    const periodType = event.period_type;
    const willRenew = event.will_renew;
    const entitlementIds = event.entitlement_ids || [];
    const purchasedAt = new Date(event.purchased_at_ms);
    const expiresAt = event.expiration_at_ms
      ? new Date(event.expiration_at_ms)
      : null;

    const isActive =
      event.type === 'INITIAL_PURCHASE' ||
      event.type === 'RENEWAL' ||
      event.type === 'UNCANCELLATION' ||
      (event.type === 'NON_RENEWING_PURCHASE' && (!expiresAt || expiresAt > new Date()));

    let userId: string | null = null;

    if (revenueCatUserId.startsWith('$RCAnonymousID:')) {
      console.log('Anonymous user, skipping database update');
      return new Response(
        JSON.stringify({ success: true, message: 'Anonymous user' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const { data: userData, error: userError } = await supabase.auth.admin.getUserById(
      revenueCatUserId
    );

    if (userError || !userData.user) {
      console.error('User not found:', userError);
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    userId = userData.user.id;

    for (const entitlementId of entitlementIds) {
      const { data: existingEntitlement } = await supabase
        .from('revenuecat_entitlements')
        .select('id')
        .eq('user_id', userId)
        .eq('entitlement_id', entitlementId)
        .maybeSingle();

      if (existingEntitlement) {
        const { error: updateError } = await supabase
          .from('revenuecat_entitlements')
          .update({
            product_id: productId,
            store,
            is_active: isActive,
            expires_at: expiresAt,
            will_renew: willRenew,
            period_type: periodType,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingEntitlement.id);

        if (updateError) {
          console.error('Error updating entitlement:', updateError);
        } else {
          console.log('Updated entitlement:', entitlementId);
        }
      } else {
        const { error: insertError } = await supabase
          .from('revenuecat_entitlements')
          .insert({
            user_id: userId,
            revenuecat_user_id: revenueCatUserId,
            entitlement_id: entitlementId,
            product_id: productId,
            store,
            is_active: isActive,
            expires_at: expiresAt,
            will_renew: willRenew,
            period_type: periodType,
            purchased_at: purchasedAt,
          });

        if (insertError) {
          console.error('Error inserting entitlement:', insertError);
        } else {
          console.log('Inserted new entitlement:', entitlementId);
        }
      }
    }

    if (
      event.type === 'CANCELLATION' ||
      event.type === 'EXPIRATION' ||
      event.type === 'BILLING_ISSUE'
    ) {
      const { error: deactivateError } = await supabase
        .from('revenuecat_entitlements')
        .update({
          is_active: false,
          will_renew: false,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('revenuecat_user_id', revenueCatUserId);

      if (deactivateError) {
        console.error('Error deactivating entitlements:', deactivateError);
      } else {
        console.log('Deactivated entitlements for user:', userId);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
