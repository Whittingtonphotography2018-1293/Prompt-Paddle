# App Store Submission Guide for Prompt Paddle

This guide walks you through the complete process of submitting Prompt Paddle to the Apple App Store.

## Prerequisites

Before you begin, make sure you have:

1. **Apple Developer Account** ($99/year)
   - Sign up at: https://developer.apple.com
   - Complete enrollment process (can take 1-2 days)

2. **EAS Account** (Expo Application Services)
   - Install EAS CLI: `npm install -g eas-cli`
   - Login: `eas login`

3. **Required Assets**
   - App icon (1024x1024 PNG)
   - Splash screen image
   - Screenshots for iPhone and iPad
   - App preview video (optional)

## Step 1: Prepare Your App Icons and Assets

### Create App Icons

You need to create high-resolution versions of your app icon from the existing logo:

1. **Main App Icon**: 1024x1024 pixels
   - Use `paddle_and_speech_bubble_logo.png` as the base
   - Ensure no transparency
   - RGB color space
   - Save as PNG

2. **Splash Screen**: 1284x2778 pixels (or similar)
   - Create a branded splash screen
   - Can use the logo centered on white background
   - Save as `splash.png` in `assets/images/`

3. **Adaptive Icon** (Android): 1024x1024 pixels
   - Foreground layer with your logo
   - Background should work with the white background specified in app.json
   - Save as `adaptive-icon.png` in `assets/images/`

### Tool Recommendations:
- Figma (free, online)
- Adobe Photoshop/Illustrator
- Canva (free templates available)
- Online tools like AppIcon.co or MakeAppIcon.com

## Step 2: Configure EAS Project

1. **Initialize EAS**
   ```bash
   eas init
   ```
   This creates a project ID and links it to your account.

2. **Update app.json**
   - Copy the project ID from the output
   - Paste it in `app.json` under `extra.eas.projectId`

3. **Configure credentials**
   ```bash
   eas credentials
   ```
   Follow the prompts to set up:
   - iOS Distribution Certificate
   - iOS Provisioning Profile
   - Push Notification keys (if needed later)

## Step 3: Build for iOS

1. **Create a production build**
   ```bash
   npm run build:ios
   ```

   Or directly with EAS:
   ```bash
   eas build --platform ios --profile production
   ```

2. **Wait for build to complete**
   - This typically takes 15-30 minutes
   - You'll receive an email when complete
   - You can monitor progress at: https://expo.dev

3. **Download the build**
   - The `.ipa` file will be available in your EAS dashboard
   - You can also submit directly to App Store from EAS

## Step 4: Create App Store Connect Listing

1. **Log in to App Store Connect**
   - Go to: https://appstoreconnect.apple.com
   - Sign in with your Apple Developer account

2. **Create a new app**
   - Click "My Apps" → "+" button → "New App"
   - Platform: iOS
   - Name: Prompt Paddle
   - Primary Language: English (U.S.)
   - Bundle ID: Select `com.promptpaddle.app`
   - SKU: `prompt-paddle-001` (or similar unique identifier)

3. **Fill in App Information**
   - Name: Prompt Paddle
   - Subtitle: Master AI Prompt Engineering
   - Privacy Policy URL: https://promptpaddle.com/privacy
   - Category: Education (Primary), Productivity (Secondary)
   - Age Rating: 4+

4. **Prepare for Upload**
   - Use the descriptions from `APP_STORE_METADATA.md`
   - Upload your screenshots (see requirements in metadata file)
   - Upload your app icon (1024x1024)
   - Set up app preview video (optional)

## Step 5: Upload Build

### Option A: Submit via EAS (Recommended)

```bash
npm run submit:ios
```

Or directly with EAS:
```bash
eas submit --platform ios --profile production
```

This will:
- Use the latest build from EAS
- Automatically upload to App Store Connect
- Handle all the TestFlight configuration

### Option B: Manual Upload via Transporter

1. Download Transporter app from Mac App Store
2. Download your `.ipa` file from EAS
3. Drag and drop into Transporter
4. Click "Deliver"

## Step 6: Complete App Store Connect Setup

1. **Select your build**
   - Go to App Store Connect → Your App → App Store tab
   - Under "Build", click "+" and select your uploaded build
   - It may take 10-15 minutes for the build to appear after upload

2. **Configure App Information**
   - **Name**: Prompt Paddle
   - **Subtitle**: Master AI Prompt Engineering
   - **Description**: Copy from `APP_STORE_METADATA.md`
   - **Keywords**: Copy from metadata file
   - **Support URL**: https://promptpaddle.com/support
   - **Marketing URL**: https://promptpaddle.com

3. **Upload Screenshots**
   For each device size:
   - iPhone 6.7" (required)
   - iPhone 6.5" (required)
   - iPad Pro 12.9" (if supporting iPad)

4. **General App Information**
   - **Copyright**: 2025 Prompt Paddle
   - **Age Rating**: Complete the questionnaire (should result in 4+)
   - **App Review Information**:
     - Contact Name: Your name
     - Contact Phone: Your phone
     - Contact Email: Your email
     - Demo Account: If you create one, provide credentials
     - Notes: Copy from `APP_STORE_METADATA.md`

5. **Version Information**
   - **Copyright**: © 2025 Prompt Paddle
   - **Version**: 1.0.0
   - **What's New**: Copy from metadata file

6. **App Privacy**
   - Click "Get Started"
   - Add privacy practices:
     - **Contact Info** (Email Address): Used for account creation
     - **User Content**: Prompts created by users
     - Data linked to user identity
     - Data used to track user (None)

## Step 7: Submit for Review

1. **Final Checklist**
   - [ ] App icon uploaded
   - [ ] All required screenshots uploaded
   - [ ] Description and metadata complete
   - [ ] Privacy policy URL working
   - [ ] Support URL working
   - [ ] Build selected
   - [ ] Age rating completed
   - [ ] App Review Information filled
   - [ ] Pricing set (Free)
   - [ ] Availability/territories selected

2. **Submit**
   - Click "Add for Review" (not "Submit for Review" yet)
   - Review everything one final time
   - Click "Submit for Review"

3. **Wait for Review**
   - Typical review time: 1-3 days
   - You'll receive email updates on status
   - Monitor in App Store Connect

## Step 8: Post-Submission

### While Waiting for Review

1. **Test via TestFlight**
   - Your build is automatically available in TestFlight
   - Invite beta testers to help you test
   - Gather feedback for future updates

2. **Prepare Marketing Materials**
   - Social media posts
   - Launch announcement
   - Blog post
   - Press kit

3. **Set Up Analytics**
   - Apple App Analytics (built-in)
   - Consider adding Firebase Analytics
   - Set up conversion tracking

### If Rejected

Don't panic! Rejections are common. Common reasons:

1. **Privacy Policy Issues**
   - Make sure URL is accessible
   - Ensure it covers all data collection
   - Update if needed and resubmit

2. **Permission Descriptions**
   - Camera usage description must be clear
   - Update in app.json if needed
   - Rebuild and resubmit

3. **Incomplete Information**
   - Provide missing screenshots
   - Add demo account if requested
   - Clarify app functionality

To resubmit:
- Address the issues mentioned in rejection
- Update build if code changes needed
- Click "Submit for Review" again

### If Approved

Congratulations! Your app is live. Now:

1. **Announce Launch**
   - Social media
   - Email list
   - Product Hunt
   - Reddit communities
   - LinkedIn

2. **Monitor Performance**
   - Check reviews daily
   - Respond to user feedback
   - Monitor crash reports
   - Track downloads

3. **Plan Updates**
   - Fix any reported bugs quickly
   - Add requested features
   - Improve based on usage data

## Step 9: Ongoing Maintenance

### Regular Updates

Plan to update your app every 2-3 months:

1. **Bug Fixes**
   - Address crashes
   - Fix UI issues
   - Improve performance

2. **New Features**
   - Add new prompt templates
   - Enhance existing features
   - Add user-requested functionality

3. **iOS Updates**
   - Test on new iOS versions
   - Update for new devices
   - Adopt new iOS features

### Update Process

```bash
# 1. Update version in app.json
# 2. Build new version
npm run build:ios

# 3. Submit new version
npm run submit:ios

# 4. Update "What's New" in App Store Connect
# 5. Submit for review
```

## Troubleshooting

### Build Fails

**Problem**: EAS build fails during compilation

**Solution**:
- Check error logs in EAS dashboard
- Ensure all dependencies are compatible
- Verify app.json configuration
- Test build locally first

### Screenshots Don't Upload

**Problem**: App Store Connect rejects screenshots

**Solution**:
- Verify exact pixel dimensions
- Ensure JPG or PNG format
- Check file size (max 500KB each)
- Save as RGB color space

### Camera Permission Issue

**Problem**: Reviewer rejects due to camera permission

**Solution**:
- Ensure NSCameraUsageDescription is clear
- Explain why camera is needed
- If not essential, consider removing camera features

### Privacy Policy Not Accessible

**Problem**: Privacy policy URL returns error

**Solution**:
- Ensure URL is live and public
- Test in browser
- Use HTTPS (not HTTP)
- Make sure it loads on mobile devices

### Build Not Appearing

**Problem**: Build doesn't show up in App Store Connect

**Solution**:
- Wait 15-30 minutes after upload
- Check for email about processing
- Verify TestFlight processing status
- Ensure correct bundle identifier

## Resources

### Official Documentation
- [Apple App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Expo EAS Documentation](https://docs.expo.dev/eas/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)

### Helpful Tools
- [App Store Screenshot Generator](https://www.appscreenshot.com/)
- [App Icon Generator](https://appicon.co/)
- [ASO Tool](https://www.apptweek.com/) - App Store Optimization

### Support
- Expo Discord: https://chat.expo.dev/
- Apple Developer Forums: https://developer.apple.com/forums/
- Stack Overflow: Tag your questions with `expo` and `ios`

## Estimated Timeline

| Task | Time |
|------|------|
| Asset creation (icons, screenshots) | 2-4 hours |
| EAS setup and configuration | 1-2 hours |
| First build | 20-30 minutes |
| App Store Connect setup | 1-2 hours |
| Review waiting period | 1-3 days |
| **Total to launch** | **3-5 days** |

## Cost Breakdown

| Item | Cost |
|------|------|
| Apple Developer Program | $99/year |
| EAS (Hobby tier) | Free |
| Total | $99/year |

Note: EAS free tier is sufficient for small apps. Production tier ($29/month) offers faster builds and more build minutes if needed.

## Next Steps

After successfully launching v1.0, consider:

1. **Version 1.1 Features**
   - User feedback implementation
   - Performance improvements
   - New templates
   - Export functionality

2. **Monetization** (if desired)
   - Premium templates
   - Subscription tier
   - One-time purchases
   - Implement via RevenueCat

3. **Android Version**
   - Build for Google Play
   - Adapt UI for Android
   - Test on multiple devices

4. **Marketing**
   - App Store Optimization (ASO)
   - Content marketing
   - Community building
   - Paid advertising (optional)

Good luck with your App Store submission! 🎉
