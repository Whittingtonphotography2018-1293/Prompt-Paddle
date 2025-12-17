/*
  # Create RevenueCat Entitlements Table

  1. New Tables
    - `revenuecat_entitlements`
      - `id` (uuid, primary key) - Unique identifier
      - `user_id` (uuid, foreign key) - References auth.users
      - `revenuecat_user_id` (text) - RevenueCat user identifier
      - `entitlement_id` (text) - Entitlement identifier (e.g., 'premium')
      - `product_id` (text) - Product identifier from App Store/Play Store
      - `store` (text) - Store type (app_store, play_store, stripe, etc.)
      - `is_active` (boolean) - Whether entitlement is currently active
      - `expires_at` (timestamptz) - When the entitlement expires (null for lifetime)
      - `will_renew` (boolean) - Whether subscription will auto-renew
      - `period_type` (text) - Subscription period (monthly, annual, lifetime, etc.)
      - `purchased_at` (timestamptz) - When the entitlement was first purchased
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp
  
  2. Security
    - Enable RLS on `revenuecat_entitlements` table
    - Add policies for authenticated users to:
      - Read their own entitlements
      - Service role can insert/update entitlements (via webhook)
  
  3. Indexes
    - Index on user_id for fast lookups
    - Index on revenuecat_user_id for webhook processing
    - Index on is_active and expires_at for active subscription checks
*/

-- Create revenuecat_entitlements table
CREATE TABLE IF NOT EXISTS revenuecat_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  revenuecat_user_id text NOT NULL,
  entitlement_id text NOT NULL,
  product_id text NOT NULL,
  store text NOT NULL,
  is_active boolean DEFAULT false NOT NULL,
  expires_at timestamptz,
  will_renew boolean DEFAULT false NOT NULL,
  period_type text DEFAULT 'monthly' NOT NULL,
  purchased_at timestamptz DEFAULT now() NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_revenuecat_entitlements_user_id 
  ON revenuecat_entitlements(user_id);

CREATE INDEX IF NOT EXISTS idx_revenuecat_entitlements_revenuecat_user_id 
  ON revenuecat_entitlements(revenuecat_user_id);

CREATE INDEX IF NOT EXISTS idx_revenuecat_entitlements_active 
  ON revenuecat_entitlements(user_id, is_active, expires_at) 
  WHERE is_active = true;

-- Enable RLS
ALTER TABLE revenuecat_entitlements ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own entitlements
CREATE POLICY "Users can read own entitlements"
  ON revenuecat_entitlements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Note: INSERT/UPDATE/DELETE policies are not needed for regular users
-- These operations will be performed by the webhook using service role key

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_revenuecat_entitlements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_revenuecat_entitlements_updated_at ON revenuecat_entitlements;
CREATE TRIGGER set_revenuecat_entitlements_updated_at
  BEFORE UPDATE ON revenuecat_entitlements
  FOR EACH ROW
  EXECUTE FUNCTION update_revenuecat_entitlements_updated_at();
