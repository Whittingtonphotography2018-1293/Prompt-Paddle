# App Store Screenshots - Getting Started

This directory contains everything you need to create professional screenshots for your App Store submission.

## Quick Start (5 Minutes)

The fastest way to get your screenshots:

```bash
# 1. Start your app
npm run dev

# 2. Press 'i' to open iOS simulator

# 3. Run the automated script
./capture-screenshots.sh

# 4. Follow the prompts
```

That's it! Your screenshots will be ready to upload.

## What You'll Get

The script will help you capture 7 professional screenshots:

1. **Welcome Screen** - First impression of your app
2. **Template Gallery** - Browse prompt templates
3. **Wizard in Action** - Create a prompt step-by-step
4. **Generated Result** - See the final prompt
5. **Library View** - Saved prompts collection
6. **Learning Center** - Tutorials and guides
7. **Platform Finder** - AI tool recommendations

## Resources

We've created comprehensive documentation to guide you:

### 📖 Documentation

- **SCREENSHOTS_QUICK_START.md** - TL;DR version, fastest path
- **APP_STORE_SCREENSHOTS_GUIDE.md** - Complete guide with all details
- **SCREENSHOTS_CHECKLIST.md** - Track your progress step-by-step

### 🛠 Tools

- **capture-screenshots.sh** - Automated screenshot capture script
- Built-in simulator tools
- Links to free online frame generators

### 📋 Requirements

**iPhone 6.7" Display (1290 x 2796 pixels)**
- iPhone 15 Pro Max
- iPhone 14 Pro Max
- iPhone 13 Pro Max
- iPhone 12 Pro Max

**iPhone 6.5" Display (1242 x 2688 pixels)**
- iPhone 11 Pro Max
- iPhone XS Max

## Three Ways to Capture Screenshots

### Method 1: Automated Script (Recommended)
Fast, organized, and foolproof.

```bash
./capture-screenshots.sh
```

### Method 2: Manual Capture
If you prefer doing it yourself.

1. Open simulator
2. Navigate to each screen
3. Press ⌘ + S to save

### Method 3: Real Device
Best for final quality.

1. Build with TestFlight
2. Install on your iPhone
3. Capture with Volume Up + Side Button

## Before You Start

### Prepare Your App

1. **Create Sample Data**
   - Sign in with a demo account
   - Save 5-7 prompts to library
   - Complete onboarding

2. **Check Your Settings**
   - Set time to 9:41 AM
   - Full battery
   - No notifications

3. **Verify Content**
   - No placeholder text
   - Professional appearance
   - Realistic examples

### Simulator Setup

```bash
# Install required simulator
# In Xcode: Settings → Platforms → iOS

# List available devices
xcrun simctl list devices | grep iPhone

# Launch specific device
xcrun simctl boot "iPhone 15 Pro Max"
```

## After Capture

### Option 1: Upload Directly (Fastest)
Your screenshots are ready as-is!

### Option 2: Add Frames (Recommended)
Make them look professional:

1. Visit https://www.appscreenshot.com/
2. Upload your screenshots
3. Select iPhone frame
4. Download framed versions

### Option 3: Add Polish
Use design tools:
- Previewed (paid)
- Rotato (paid)
- Figma (free)

## File Organization

The script creates this structure automatically:

```
~/Desktop/PromptPaddle-Screenshots/
├── iphone-6.7/
│   ├── 1-Welcome-Onboarding.png
│   ├── 2-Template-Selection.png
│   ├── 3-Prompt-Wizard.png
│   ├── 4-Generated-Result.png
│   ├── 5-Library-Screen.png
│   ├── 6-Learn-Tutorials.png
│   └── 7-Platform-Recommendation.png
└── iphone-6.5/
    └── (same files)
```

## Quality Checklist

Before uploading to App Store Connect:

- [ ] All images are correct dimensions
- [ ] File sizes under 500KB each
- [ ] No personal information visible
- [ ] Content looks professional
- [ ] 7 screenshots for each device size
- [ ] Screenshots tell a clear story

## Upload to App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your app
3. Click **App Store** tab
4. Scroll to **App Previews and Screenshots**
5. Click **+** next to iPhone 6.7"
6. Drag and drop your screenshots in order
7. Repeat for iPhone 6.5"
8. Save changes

## Need Help?

### Quick Questions
See `SCREENSHOTS_QUICK_START.md`

### Detailed Instructions
See `APP_STORE_SCREENSHOTS_GUIDE.md`

### Step-by-Step Tracking
Use `SCREENSHOTS_CHECKLIST.md`

### Troubleshooting

**Script won't run?**
```bash
chmod +x capture-screenshots.sh
```

**Wrong dimensions?**
- Verify you're using iPhone 15 Pro Max
- Use Window → Physical Size (⌘ + 1)

**Simulator not found?**
- Download in Xcode Settings → Platforms

## Time Estimate

- **Automated capture**: 15-30 minutes
- **Manual capture**: 30-60 minutes
- **With enhancements**: 2-3 hours

## Pro Tips

1. **Tell a Story**
   - Show the user journey
   - Start with welcome
   - End with success

2. **Show Value**
   - Highlight key features
   - Use real, compelling content
   - Make it look useful

3. **Stay Consistent**
   - Same time on all screenshots
   - Same battery level
   - Same color theme

4. **Make it Pretty**
   - Clean interface
   - No errors or empty states
   - Professional demo data

## Next Steps

1. ✅ Read this document
2. ✅ Review `SCREENSHOTS_QUICK_START.md`
3. ✅ Run `./capture-screenshots.sh`
4. ✅ Review captured screenshots
5. ✅ Add frames if desired
6. ✅ Upload to App Store Connect

## Resources & Links

### Apple Documentation
- [Screenshot Specifications](https://help.apple.com/app-store-connect/#/devd274dd925)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)

### Free Tools
- [Screenshot Generator](https://www.appscreenshot.com/)
- [Device Frames](https://www.figma.com/community/search?q=device%20frame)

### Our Documentation
- Complete submission guide: `APP_STORE_SUBMISSION_GUIDE.md`
- App metadata: `APP_STORE_METADATA.md`
- Submission checklist: `APP_STORE_CHECKLIST.md`

---

**Ready to start?** Run: `./capture-screenshots.sh`

**Questions?** See the detailed guides or reach out for help.

**Good luck! Your app is going to look amazing! 🎨📱**
