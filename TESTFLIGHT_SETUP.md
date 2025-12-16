# TestFlight Setup Guide

## Critical Steps to Fix TestFlight Crashes

### 1. Configure EAS Secrets (REQUIRED)

Your environment variables from `.env` are not included in production builds. You must configure them as EAS secrets:

```bash
# Set your Supabase URL
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value "https://olpmknbaxshfqbcazfzv.supabase.co" --type string

# Set your Supabase Anon Key
eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9scG1rbmJheHNoZnFiY2F6Znp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NjAzMjQsImV4cCI6MjA4MTAzNjMyNH0.J8QyRdhZwu_B976C88_vHbC7luEEf4qfH1bEYGoUdqM" --type string

# Set your Stripe Price ID (if using Stripe)
eas secret:create --scope project --name EXPO_PUBLIC_STRIPE_PRICE_ID --value "price_1Sf28eKgn1iCzvzBqk6NkGRF" --type string
```

To verify your secrets are set:
```bash
eas secret:list
```

### 2. Get Your EAS Project ID

Run this command to get your actual EAS project ID:
```bash
eas project:info
```

Then update the `projectId` in `app.json` (line 60) with the real value.

### 3. Rebuild for TestFlight

After setting secrets and updating the project ID:

```bash
# Create a new production build
eas build --platform ios --profile production

# Once build completes, submit to TestFlight
eas submit --platform ios --profile production
```

### 4. Increment Build Number

For subsequent builds, the build number will auto-increment (configured in `eas.json`). However, you can manually increment it in `app.json` if needed:

```json
"ios": {
  "buildNumber": "2"  // Increment this for each new build
}
```

## Fixed Issues

The following code issues have been fixed:

1. ✅ **Platform-specific code**: `useFrameworkReady` now only runs on web
2. ✅ **AsyncStorage**: Added for Supabase session persistence on native
3. ✅ **Splash screen**: Properly configured to prevent crashes on launch
4. ✅ **Dependencies**: Installed `@react-native-async-storage/async-storage`

## Testing Checklist

Before submitting to TestFlight:

- [ ] EAS secrets are configured
- [ ] Real EAS project ID is in app.json
- [ ] Build completes successfully with `eas build`
- [ ] App launches in TestFlight without crashing
- [ ] Authentication works (sign up/sign in)
- [ ] Database operations work
- [ ] Camera permissions work if needed

## Common Issues

**"Missing Supabase environment variables" error:**
- Your EAS secrets aren't configured. Follow step 1 above.

**"Invalid project ID" error:**
- Update the projectId in app.json with your real EAS project ID from step 2.

**Authentication not working:**
- Verify EAS secrets are set correctly with `eas secret:list`
- Check that the Supabase URL and key are correct

**App still crashes:**
- Check crash logs in App Store Connect
- Verify all secrets are set: `eas secret:list`
- Ensure you're building with the production profile: `eas build --platform ios --profile production`
