# App Store Submission Checklist

Use this checklist to track your progress toward App Store submission.

## Pre-Submission Setup

### Assets Creation
- [ ] Create 1024x1024 app icon from logo
- [ ] Create splash screen image (1284x2778)
- [ ] Create adaptive icon for Android (1024x1024)
- [ ] Place splash.png in assets/images/
- [ ] Place adaptive-icon.png in assets/images/
- [ ] Replace icon.png with final app icon

### Screenshots
- [ ] Review screenshot requirements: `SCREENSHOTS_QUICK_START.md`
- [ ] Use automated capture script: `./capture-screenshots.sh`
- [ ] Track progress with: `SCREENSHOTS_CHECKLIST.md`
- [ ] Take screenshots on iPhone 6.7" (1290 x 2796)
- [ ] Take screenshots on iPhone 6.5" (1242 x 2688)
- [ ] Take screenshots on iPad Pro 12.9" (2048 x 2732) - if iPad support
- [ ] Capture all 7 required screenshots:
  - [ ] Welcome/onboarding screen
  - [ ] Template selection (Create tab)
  - [ ] Prompt creation wizard in action
  - [ ] Generated result with copy button
  - [ ] Library with saved prompts
  - [ ] Learn/Tutorial screen
  - [ ] Platform recommendation screen
- [ ] Optional: Add device frames using online tools
- [ ] Optional: Create app preview video (15-30 seconds)

### Apple Developer Account
- [ ] Sign up for Apple Developer Program ($99/year)
- [ ] Complete enrollment verification
- [ ] Accept latest agreements in App Store Connect

### Domain & URLs
- [ ] Register domain (e.g., promptpaddle.com)
- [ ] Host privacy policy at: yoursite.com/privacy
- [ ] Host terms of service at: yoursite.com/terms
- [ ] Create support page at: yoursite.com/support
- [ ] Update URLs in app/settings.tsx
- [ ] Test all URLs are accessible

### App Configuration
- [x] Update app.json with bundle identifier
- [x] Add iOS infoPlist permissions
- [x] Add Android permissions
- [x] Configure splash screen
- [x] Set up asset patterns
- [ ] Verify all configuration is correct

## EAS Build Setup

### Installation & Login
- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login to EAS: `eas login`
- [ ] Initialize project: `eas init`
- [ ] Copy project ID to app.json

### Credentials Setup
- [ ] Run: `eas credentials`
- [ ] Create iOS Distribution Certificate
- [ ] Create iOS Provisioning Profile
- [ ] Configure push notifications (if needed)

### Build
- [ ] Run: `eas build --platform ios --profile production`
- [ ] Wait for build to complete (15-30 minutes)
- [ ] Download .ipa file or prepare for submission

## App Store Connect Setup

### Create App Listing
- [ ] Log in to App Store Connect
- [ ] Create new app
- [ ] Select correct bundle ID (com.promptpaddle.app)
- [ ] Set app name: "Prompt Paddle"
- [ ] Set subtitle: "Master AI Prompt Engineering"
- [ ] Choose primary language: English (U.S.)

### App Information
- [ ] Fill in description (from APP_STORE_METADATA.md)
- [ ] Add keywords
- [ ] Set category: Education (Primary)
- [ ] Set secondary category: Productivity
- [ ] Upload app icon (1024x1024)
- [ ] Add privacy policy URL
- [ ] Add support URL
- [ ] Add marketing URL (optional)

### Pricing & Availability
- [ ] Set price: Free
- [ ] Select available territories: All
- [ ] Set availability date: Upon approval

### App Privacy
- [ ] Complete privacy questionnaire
- [ ] Add data types collected:
  - [ ] Contact Info (Email)
  - [ ] User Content (Prompts)
- [ ] Specify data usage purposes
- [ ] Specify data linking (Linked to user)
- [ ] Confirm no tracking data

### Age Rating
- [ ] Complete age rating questionnaire
- [ ] Verify rating: 4+
- [ ] Review rating summary

### Build Upload
- [ ] Submit via EAS: `eas submit --platform ios`
- [ ] OR upload via Transporter app
- [ ] Wait for build to process (10-15 minutes)
- [ ] Select build in App Store Connect

### Screenshots & Media
- [ ] Upload iPhone 6.7" screenshots (3-10)
- [ ] Upload iPhone 6.5" screenshots (3-10)
- [ ] Upload iPad screenshots (if applicable)
- [ ] Upload app preview video (optional)
- [ ] Add captions/descriptions (optional)

### App Review Information
- [ ] Add contact name
- [ ] Add contact phone number
- [ ] Add contact email
- [ ] Add demo account (if applicable):
  - [ ] Create demo user in app
  - [ ] Provide credentials to reviewer
- [ ] Add review notes from APP_STORE_METADATA.md
- [ ] Mention camera usage purpose
- [ ] Explain data storage (Supabase)

### Version Information
- [ ] Set version number: 1.0.0
- [ ] Add "What's New" text
- [ ] Add copyright: © 2025 Prompt Paddle

## Final Review

### Test Everything
- [ ] Test app on physical iOS device
- [ ] Test all templates work
- [ ] Test authentication (sign up/sign in)
- [ ] Test onboarding flow
- [ ] Test camera permission (if used)
- [ ] Test library save/load
- [ ] Test all navigation flows
- [ ] Verify no crashes or major bugs

### Double-Check Documentation
- [ ] Privacy policy is live and accurate
- [ ] Terms of service is live and accurate
- [ ] Support page is accessible
- [ ] All URLs work correctly
- [ ] Legal documents match app functionality

### Verify Metadata
- [ ] App name correct
- [ ] Description clear and compelling
- [ ] Keywords relevant
- [ ] Screenshots show app accurately
- [ ] App icon looks good
- [ ] Contact information correct

### Final Checks
- [ ] All required fields filled in App Store Connect
- [ ] Build is selected
- [ ] Screenshots uploaded for all required sizes
- [ ] Age rating completed
- [ ] Privacy info complete
- [ ] Review notes helpful and clear
- [ ] No placeholder text remains
- [ ] URLs all tested and working

## Submit for Review
- [ ] Click "Add for Review"
- [ ] Review all information one last time
- [ ] Click "Submit for Review"
- [ ] Note submission date and time
- [ ] Save confirmation email

## Post-Submission

### Monitoring
- [ ] Check email regularly for updates
- [ ] Monitor App Store Connect for status changes
- [ ] Check for any reviewer questions
- [ ] Respond to reviewer within 24 hours if needed

### TestFlight
- [ ] Verify build appears in TestFlight
- [ ] Invite beta testers (optional)
- [ ] Gather feedback from testers
- [ ] Fix any critical issues found

### Prepare for Launch
- [ ] Write launch announcement
- [ ] Prepare social media posts
- [ ] Draft blog post (optional)
- [ ] Set up analytics tracking
- [ ] Create support resources (FAQ, etc.)
- [ ] Plan response to reviews

## If Rejected

- [ ] Read rejection reason carefully
- [ ] Address all issues mentioned
- [ ] Update app if code changes needed
- [ ] Rebuild if necessary
- [ ] Respond to reviewer or resubmit
- [ ] Update App Store Connect info if needed

## If Approved

### Launch Day
- [ ] Verify app is live in App Store
- [ ] Download and test from App Store
- [ ] Share on social media
- [ ] Email announcement to list
- [ ] Post on Product Hunt
- [ ] Share in relevant communities
- [ ] Thank beta testers

### First Week
- [ ] Monitor reviews daily
- [ ] Respond to reviews
- [ ] Track download numbers
- [ ] Monitor crash reports
- [ ] Gather user feedback
- [ ] Create list of improvements
- [ ] Fix critical bugs immediately

### First Month
- [ ] Analyze usage patterns
- [ ] Review analytics data
- [ ] Plan version 1.1 features
- [ ] Start working on improvements
- [ ] Continue marketing efforts
- [ ] Build community

## Long-Term Maintenance

### Regular Updates
- [ ] Plan update every 2-3 months
- [ ] Fix bugs reported by users
- [ ] Add requested features
- [ ] Improve performance
- [ ] Update for new iOS versions
- [ ] Add new prompt templates
- [ ] Enhance existing features

### Marketing & Growth
- [ ] Optimize App Store listing (ASO)
- [ ] Encourage reviews from happy users
- [ ] Create content (blog, videos)
- [ ] Engage with community
- [ ] Consider paid advertising
- [ ] Track key metrics (retention, engagement)

### Monetization (Future)
- [ ] Research monetization options
- [ ] Plan premium features
- [ ] Implement RevenueCat (if subscriptions)
- [ ] Test pricing strategies
- [ ] Monitor revenue

## Notes

**Submission Date:** _________________

**Expected Review Completion:** _________________

**Approval Date:** _________________

**Launch Date:** _________________

**Key Metrics to Track:**
- Total downloads: _________________
- Daily active users: _________________
- Average rating: _________________
- Number of reviews: _________________
- Retention rate: _________________

**Important Links:**
- App Store Connect: https://appstoreconnect.apple.com
- EAS Dashboard: https://expo.dev
- Analytics Dashboard: _________________
- Support Email: _________________

## Resources Used

- ✅ APP_STORE_METADATA.md - Complete app descriptions and metadata
- ✅ APP_STORE_SUBMISSION_GUIDE.md - Step-by-step submission process
- ✅ SCREENSHOTS_QUICK_START.md - Quick guide to capturing screenshots
- ✅ APP_STORE_SCREENSHOTS_GUIDE.md - Comprehensive screenshot guide
- ✅ SCREENSHOTS_CHECKLIST.md - Detailed screenshot progress tracker
- ✅ capture-screenshots.sh - Automated screenshot capture script
- ✅ PRIVACY_POLICY.md - Privacy policy document
- ✅ TERMS_OF_SERVICE.md - Terms of service document
- ✅ app.json - App configuration
- ✅ eas.json - Build configuration

---

**Good luck with your submission! 🚀**

Remember: Most apps get approved within 1-3 days. If you get rejected, don't worry - it's normal and usually easy to fix. Just address the feedback and resubmit.
