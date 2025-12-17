# Screenshots Quick Start Guide

## TL;DR - Fastest Method

```bash
# 1. Start your app
npm run dev

# 2. Open iOS simulator and press 'i'

# 3. Run the automated script
./capture-screenshots.sh

# 4. Follow the prompts to capture all 7 required screenshots
```

## What You Need

### Required Screenshots (7 total)
1. **Welcome/Onboarding** - First impression
2. **Template Selection** - Create tab with templates
3. **Prompt Wizard** - Form fields filled in
4. **Generated Result** - Final prompt with copy button
5. **Library** - Saved prompts collection
6. **Learn/Tutorials** - Educational content
7. **Platform Recommendation** - AI platform comparison

### Required Dimensions
- **iPhone 6.7"**: 1290 x 2796 pixels (iPhone 15 Pro Max)
- **iPhone 6.5"**: 1242 x 2688 pixels (iPhone 11 Pro Max)

## Manual Method (3 Steps)

### Step 1: Open Simulator
```bash
npm run dev
# Press 'i' to open iOS simulator
# Select iPhone 15 Pro Max from devices
```

### Step 2: Navigate & Capture
```bash
# Navigate to each screen in your app
# Press ⌘ + S to save screenshot
# Screenshots save to Desktop
```

### Step 3: Organize
```bash
# Rename screenshots:
# 1-welcome.png
# 2-templates.png
# 3-wizard.png
# 4-result.png
# 5-library.png
# 6-learn.png
# 7-recommendation.png
```

## Automated Method (Recommended)

### Using the Script

```bash
# 1. Make sure simulator is open with your app running
npm run dev

# 2. Run the automated script
./capture-screenshots.sh

# 3. Follow the interactive prompts:
#    - Navigate to each screen in the app
#    - Press ENTER when ready to capture
#    - Screenshots are automatically saved and organized
```

The script will:
- Create organized folders
- Capture screenshots with proper naming
- Verify dimensions
- Open the folder when done

## Before You Start

### Prepare Your App
- Create a demo account
- Add 5-7 sample prompts to library
- Complete onboarding
- Verify all content looks professional

### Simulator Settings
- Set time to 9:41 AM
- Ensure full battery
- Disable notifications
- Use **Window → Physical Size** (⌘ + 1)

## After Capture

### Option 1: Use As-Is (Fastest)
- Upload directly to App Store Connect
- Clean, minimal look

### Option 2: Add Device Frames (Recommended)
1. Go to https://www.appscreenshot.com/
2. Upload your screenshots
3. Select iPhone 15 Pro Max frame
4. Add text overlays (optional)
5. Download and upload to App Store Connect

### Option 3: Professional Polish
Use tools like:
- **Previewed** - Professional mockups
- **Rotato** - 3D device frames
- **Figma** - Custom designs

## Quick Commands

```bash
# Check available simulators
xcrun simctl list devices | grep iPhone

# Boot specific simulator
xcrun simctl boot "iPhone 15 Pro Max"

# Take screenshot manually
xcrun simctl io booted screenshot ~/Desktop/screenshot.png

# View screenshot dimensions
sips -g pixelWidth -g pixelHeight screenshot.png

# Open screenshots folder
open ~/Desktop/PromptPaddle-Screenshots/iphone-6.7/
```

## Verification Checklist

Before uploading to App Store Connect:

- [ ] 7 screenshots captured for iPhone 6.7"
- [ ] All images are 1290 x 2796 pixels
- [ ] File sizes under 500KB each
- [ ] No personal information visible
- [ ] Content looks professional and realistic
- [ ] Screenshots are in logical order
- [ ] All key features are shown

## Upload to App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Select your app → App Store tab
3. Scroll to **App Previews and Screenshots**
4. Click **+** under iPhone 6.7" Display
5. Drag and drop screenshots in order
6. Add optional captions if desired
7. Repeat for iPhone 6.5" (required)

## Troubleshooting

### Screenshots Wrong Size
- Verify simulator is iPhone 15 Pro Max
- Use Physical Size mode (⌘ + 1)
- Don't scale or resize after capture

### Simulator Not Found
```bash
# List all devices
xcrun simctl list devices

# If missing, download in Xcode:
# Xcode → Settings → Platforms
```

### Script Won't Run
```bash
# Make executable
chmod +x capture-screenshots.sh

# Run with bash
bash capture-screenshots.sh
```

## Pro Tips

1. **Consistency is Key**
   - Use same time (9:41 AM)
   - Same battery level (full)
   - Same color mode (light or dark)

2. **Show Real Content**
   - No "Lorem Ipsum"
   - No empty states
   - Realistic use cases

3. **Tell a Story**
   - Screenshot order should flow naturally
   - Show user journey from start to finish

4. **Highlight Value**
   - First screenshot is most important
   - Show core features early
   - End with wow factor

## Time Estimate

- **Manual Method**: 30-60 minutes
- **Automated Script**: 15-30 minutes
- **With Frames/Polish**: 2-3 hours total

## Need Help?

See the complete guide: `APP_STORE_SCREENSHOTS_GUIDE.md`

## Resources

- [App Store Screenshot Specs](https://help.apple.com/app-store-connect/#/devd274dd925)
- [Screenshot Generator](https://www.appscreenshot.com/)
- [Apple Design Resources](https://developer.apple.com/design/resources/)

---

Ready to capture screenshots? Run: `./capture-screenshots.sh`
