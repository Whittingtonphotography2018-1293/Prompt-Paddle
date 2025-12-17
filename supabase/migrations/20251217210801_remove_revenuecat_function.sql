/*
  # Remove RevenueCat function

  Removes the unused RevenueCat entitlements update function since RevenueCat is not being used in this project.

  ## Changes
    - Drop `update_revenuecat_entitlements_updated_at` function
*/

DROP FUNCTION IF EXISTS update_revenuecat_entitlements_updated_at() CASCADE;
