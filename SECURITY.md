# Security Implementation

## Password Security

This application implements comprehensive password security to protect user accounts.

### Compromised Password Detection

The app checks all new passwords against the HaveIBeenPwned database to prevent users from using passwords that have been exposed in data breaches.

**How it works:**
1. When a user creates an account, their password is hashed using SHA-1
2. Only the first 5 characters of the hash are sent to the HaveIBeenPwned API (k-anonymity)
3. The API returns all hashes matching those 5 characters
4. The app checks if the full hash matches any compromised passwords
5. If compromised, the user is required to choose a different password

**Privacy:**
- The full password is never sent to any external service
- Only a partial hash is transmitted
- The password remains secure even during the check

### Password Strength Requirements

All passwords must meet these criteria:
- Minimum 8 characters
- At least one lowercase letter (a-z)
- At least one uppercase letter (A-Z)
- At least one number (0-9)
- At least one special character (!@#$%^&*, etc.)

### Real-time Feedback

Users receive immediate feedback as they type:
- Visual indicators show which requirements are met
- Warning messages guide users to create stronger passwords
- Compromised password detection runs before account creation

## Database Security

### Row Level Security (RLS)

All database tables have Row Level Security enabled with policies that:
- Verify user authentication via `auth.uid()`
- Ensure users can only access their own data
- Prevent unauthorized data access or modification

### Stripe Integration Security

Payment-related tables have read-only access for users:
- Modifications only occur via secure webhook handlers
- Service role is used for all payment operations
- Soft delete prevents data loss while maintaining security

## Best Practices

### For Users
- Use a unique password for this application
- Change your password if you receive a breach notification
- Enable multi-factor authentication when available

### For Developers
- Never disable password security checks
- Keep the HaveIBeenPwned API integration active
- Regularly audit RLS policies
- Monitor for suspicious authentication patterns
