# App Store Screenshots Guide for Prompt Paddle

This guide will help you create professional screenshots for your App Store submission.

## Required Screenshot Sizes

### iPhone 6.7" Display (iPhone 15 Pro Max, 14 Pro Max, 13 Pro Max, 12 Pro Max)
- **Resolution:** 1290 x 2796 pixels
- **Required:** Yes (3-10 screenshots)
- **Priority:** High

### iPhone 6.5" Display (iPhone 11 Pro Max, XS Max)
- **Resolution:** 1242 x 2688 pixels
- **Required:** Yes (3-10 screenshots)
- **Priority:** High

### iPad Pro (12.9" Display) - If Supporting iPad
- **Resolution:** 2048 x 2732 pixels
- **Required:** If iPad support enabled
- **Priority:** Medium

## Screenshot Capture Methods

### Method 1: iOS Simulator (Recommended)

1. **Launch the iOS Simulator**
   ```bash
   cd /tmp/cc-agent/61378250/project
   npm run dev
   # Press 'i' to open iOS simulator
   ```

2. **Select the Right Device**
   - In Simulator, go to: **Hardware → Device → iPhone 15 Pro Max**
   - This gives you the 6.7" display size needed

3. **Capture Screenshots**
   - Navigate to each screen you want to capture
   - Press **⌘ + S** (Command + S) to save screenshot
   - Screenshots save to your Desktop by default
   - They'll be in the correct resolution automatically

### Method 2: Real Device (TestFlight)

1. **Install via TestFlight**
   - Build and upload to TestFlight first
   - Install on your iPhone 15 Pro Max (or similar)

2. **Capture Screenshots**
   - Navigate to each screen
   - Press **Volume Up + Side Button** simultaneously
   - Screenshots save to Photos app
   - AirDrop to your Mac for processing

### Method 3: Third-Party Tools (Most Professional)

Use these tools to create polished, marketing-ready screenshots:

#### 1. **App Store Screenshot Generator** (Free)
- Website: https://www.appscreenshot.com/
- Upload raw screenshots
- Add device frames
- Add text overlays
- Export in correct sizes

#### 2. **Previewed App** (Paid - $30/month)
- Website: https://previewed.app/
- Professional mockup generator
- Multiple device frames
- Customizable backgrounds
- Text overlays and annotations

#### 3. **Rotato** (Paid - $69 one-time)
- Website: https://rotato.app/
- 3D mockup generator for Mac
- Beautiful device frames
- Video export capability
- Perfect for app preview videos

#### 4. **Figma** (Free/Paid)
- Create custom frames at exact dimensions
- Import screenshots
- Add device frames from UI kits
- Export at 2x for retina quality

## Required Screenshots for Prompt Paddle

Based on the app structure, capture these 7 screens in order:

### 1. Welcome/Onboarding Screen
**Screen:** `app/onboarding/welcome.tsx`
**What to show:**
- Clean welcome screen
- App logo prominently displayed
- Tagline: "Master AI Prompt Engineering"
- Clear call-to-action button

**Caption suggestion:** "Welcome to Prompt Paddle - Master AI Prompt Engineering"

---

### 2. Template Selection (Create Tab)
**Screen:** `app/(tabs)/create.tsx`
**What to show:**
- Multiple prompt templates visible
- Category filters at top
- Professional design with icons
- Show "Write a Professional Email" and other templates

**Caption suggestion:** "Choose from 15+ Expert-Crafted Prompt Templates"

---

### 3. Prompt Wizard in Action
**Screen:** `app/prompt-wizard/[id].tsx`
**What to show:**
- Wizard interface with form fields
- Progress indicator
- Example: Email wizard with fields filled in
- Show the step-by-step guidance

**Caption suggestion:** "Step-by-Step Guidance for Perfect Prompts"

---

### 4. Generated Prompt Result
**Screen:** `app/prompt-result.tsx`
**What to show:**
- Complete generated prompt
- Copy button prominently visible
- Save to library button
- Professional formatting

**Caption suggestion:** "Copy and Use Your Prompt with Any AI Platform"

---

### 5. Library Screen
**Screen:** `app/(tabs)/library.tsx`
**What to show:**
- Multiple saved prompts
- Search functionality visible
- Organized collection
- Clear categories or tags

**Caption suggestion:** "Save and Organize Your Best Prompts"

---

### 6. Learn/Tutorial Screen
**Screen:** `app/(tabs)/learn.tsx`
**What to show:**
- Tutorial cards
- Different difficulty levels visible
- Educational content preview
- Clean, inviting design

**Caption suggestion:** "Learn Prompt Engineering at Your Own Pace"

---

### 7. Platform Recommendation
**Screen:** `app/platform-recommendation.tsx`
**What to show:**
- AI platform comparison
- Recommendations
- Clear information architecture
- Helpful for users

**Caption suggestion:** "Find the Right AI Tool for Your Needs"

## Screenshot Preparation Checklist

Before capturing, ensure:

- [ ] User is signed in (not showing sign-in screen)
- [ ] Library has sample prompts (not empty state)
- [ ] Use realistic, high-quality content
- [ ] No Lorem Ipsum or placeholder text
- [ ] No personal information visible
- [ ] Consistent time and battery in status bar
- [ ] Dark mode or light mode (pick one and stay consistent)
- [ ] No notification badges or alerts
- [ ] Clean, professional appearance

## Step-by-Step Capture Process

### 1. Prepare Sample Data

First, create realistic sample data in your app:
- Create a demo user account
- Save 5-7 example prompts to library
- Complete onboarding
- Navigate through all screens to verify content

### 2. Set Up Simulator

```bash
# Open simulator with specific device
xcrun simctl list devices
xcrun simctl boot "iPhone 15 Pro Max"
```

### 3. Configure Simulator Settings

In Simulator:
- **Window → Physical Size** (or ⌘ + 1)
- Set time to 9:41 AM (Apple's standard)
- Ensure full battery icon
- Disable notifications

### 4. Capture Each Screen

Navigate to each screen and capture:
```bash
# Simulator screenshot keyboard shortcut
⌘ + S (Command + S)
```

Screenshots will be saved as:
- `Simulator Screen Shot - iPhone 15 Pro Max - [date-time].png`

### 5. Rename Files

Rename files systematically:
```bash
1-welcome-onboarding.png
2-template-selection.png
3-prompt-wizard.png
4-generated-result.png
5-library.png
6-learn-tutorials.png
7-platform-recommendation.png
```

## Post-Processing

### Option A: Add Device Frames (Recommended)

Use AppStore Screenshot Generator:
1. Go to https://www.appscreenshot.com/
2. Upload your screenshots
3. Select "iPhone 15 Pro Max" frame
4. Choose background color (white or gradient)
5. Download framed versions

### Option B: Add Text Overlays

Using Figma or Photoshop:
1. Import screenshot
2. Add text overlay at top
3. Use your brand colors
4. Keep text concise (5-7 words max)
5. Export at 2x resolution

### Option C: Use Screenshots As-Is

For a clean, minimal approach:
- Use simulator screenshots directly
- Ensure they're the correct resolution
- Verify file size is under 500KB each
- Save as PNG or JPG

## Quality Guidelines

### Do's:
✅ Show real, meaningful content
✅ Use high-quality, crisp images
✅ Maintain visual consistency across screenshots
✅ Highlight key features
✅ Use device frames if adding text overlays
✅ Show the app in actual use
✅ Include diverse use cases

### Don'ts:
❌ Don't use blurry or low-res images
❌ Don't show empty states (unless intentional)
❌ Don't include personal information
❌ Don't use inconsistent device frames
❌ Don't add too much text overlay
❌ Don't show error states or bugs
❌ Don't use outdated device models in frames

## File Format Specifications

### Format
- PNG or JPG
- RGB color space (not CMYK)
- No transparency
- Max file size: 500KB per screenshot

### Resolution
- Use actual device resolution (don't upscale)
- Don't add borders that change dimensions
- Export at 72 DPI minimum (144 DPI recommended)

## Verification Checklist

Before uploading to App Store Connect:

- [ ] All screenshots are correct dimensions
- [ ] File sizes are under 500KB
- [ ] Screenshots show actual app content
- [ ] No personal or sensitive information visible
- [ ] Consistent visual style across all images
- [ ] Screenshots are in logical order
- [ ] All key features are represented
- [ ] Images are clear and professional
- [ ] Text is readable if overlays used
- [ ] Device frames match (if used)

## Quick Commands Reference

### Simulator Commands
```bash
# List available simulators
xcrun simctl list devices

# Boot specific device
xcrun simctl boot "iPhone 15 Pro Max"

# Take screenshot
xcrun simctl io booted screenshot ~/Desktop/screenshot.png

# Reset simulator (clear all data)
xcrun simctl erase "iPhone 15 Pro Max"
```

### Screenshot Location
```bash
# Default simulator screenshot location
~/Desktop/

# Or check recent screenshots
ls -lt ~/Desktop/*.png | head -10
```

## Alternative: Using Expo Go

If you're testing with Expo Go app:

1. **Install Expo Go on iPhone 15 Pro Max**
2. **Scan QR code from `npm run dev`**
3. **Capture screenshots directly on device**
4. **AirDrop to Mac**

Note: Make sure status bar looks clean in Expo Go

## Professional Touch: App Preview Video

Consider creating a 15-30 second video:

### Tools for Video:
- **QuickTime Player** (Mac) - Free screen recording
- **OBS Studio** - Free, powerful recording software
- **ScreenFlow** - Professional ($169)
- **Rotato** - 3D device mockup videos ($69)

### Video Structure:
1. **0-3s:** App logo/splash screen
2. **3-8s:** Browse templates
3. **8-15s:** Create a prompt (wizard)
4. **15-20s:** Show result and copy
5. **20-25s:** Quick library view
6. **25-30s:** Closing with logo

## Troubleshooting

### Screenshot Wrong Size
**Problem:** Simulator screenshots don't match required dimensions

**Solution:**
- Verify you're using correct simulator device
- Use "Physical Size" not "Fit Screen"
- Check Window → Show Device Bezels is OFF

### Screenshots Look Blurry
**Problem:** Images appear blurry or pixelated

**Solution:**
- Capture from simulator, not scaled window
- Don't resize images after capture
- Use PNG format, not low-quality JPG
- Ensure retina display settings are correct

### Content Doesn't Look Good
**Problem:** Screenshots don't look professional

**Solution:**
- Add realistic sample data
- Use consistent lighting mode (light/dark)
- Clean up UI before capture
- Consider using device frames
- Add subtle text overlays highlighting features

## Final Preparation

Once you have all screenshots:

1. **Create a folder structure:**
   ```
   screenshots/
   ├── iphone-6.7/
   │   ├── 1-welcome.png
   │   ├── 2-templates.png
   │   └── ...
   └── iphone-6.5/
       ├── 1-welcome.png
       ├── 2-templates.png
       └── ...
   ```

2. **Review each screenshot**
   - Zoom to 100% and check quality
   - Verify dimensions in Preview or image editor
   - Ensure file sizes are reasonable

3. **Get feedback**
   - Show to friends or colleagues
   - Ask: Does this make the app look appealing?
   - Iterate if needed

4. **Upload to App Store Connect**
   - Go to App Store Connect
   - Navigate to your app → Screenshots
   - Drag and drop in order
   - Add localized captions if desired

## Resources

### Tools
- [App Store Screenshot Generator](https://www.appscreenshot.com/) - Free
- [Previewed](https://previewed.app/) - Professional mockups
- [Rotato](https://rotato.app/) - 3D device mockups
- [Figma](https://www.figma.com/) - Design and frames

### Templates
- [iOS UI Kit in Figma](https://www.figma.com/community/file/809486210290271845)
- [Device Mockups](https://www.figma.com/community/search?model_type=files&q=device%20mockup)

### Reference
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [App Store Screenshot Specifications](https://help.apple.com/app-store-connect/#/devd274dd925)

## Timeline Estimate

| Task | Time |
|------|------|
| Set up simulator and app | 30 minutes |
| Capture raw screenshots | 30 minutes |
| Add frames/overlays | 1-2 hours |
| Review and iterate | 30 minutes |
| Export and verify | 30 minutes |
| **Total** | **3-4 hours** |

## Next Steps

1. Set up your development environment
2. Build and run the app in simulator
3. Create sample data for realistic screenshots
4. Capture screenshots following this guide
5. Process and enhance screenshots
6. Upload to App Store Connect
7. Submit for review

Good luck with your screenshots! Remember, these are often the first impression users have of your app, so take the time to make them look great! 📸
