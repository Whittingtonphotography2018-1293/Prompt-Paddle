# App Store Screenshots Checklist

Use this checklist to track your progress creating screenshots for App Store submission.

## Phase 1: Preparation

### App Setup
- [ ] App builds and runs without errors
- [ ] Demo user account created
- [ ] Sample data added to app:
  - [ ] 5-7 saved prompts in library
  - [ ] Onboarding completed
  - [ ] User profile set up
- [ ] All screens reviewed and looking good
- [ ] No placeholder text or Lorem Ipsum
- [ ] No debug information visible

### Development Environment
- [ ] Xcode installed
- [ ] iOS Simulator available
- [ ] iPhone 15 Pro Max simulator downloaded
- [ ] iPhone 11 Pro Max simulator downloaded (for 6.5")
- [ ] App running in simulator: `npm run dev`

### Capture Tools Ready
- [ ] Automated script tested: `./capture-screenshots.sh`
- [ ] Screenshots directory created
- [ ] Backup plan if script doesn't work (manual capture)

## Phase 2: Screenshot Capture - iPhone 6.7"

Required: 7 screenshots at 1290 x 2796 pixels

### Screenshot 1: Welcome/Onboarding
- [ ] Screen: `app/onboarding/welcome.tsx`
- [ ] Logo visible and clear
- [ ] Tagline readable
- [ ] Call-to-action button prominent
- [ ] Clean, inviting design
- [ ] Screenshot captured: `1-welcome.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Welcome to Prompt Paddle - Master AI Prompt Engineering"

---

### Screenshot 2: Template Selection
- [ ] Screen: `app/(tabs)/create.tsx`
- [ ] Multiple templates visible
- [ ] Category filters showing
- [ ] Icons and design elements clear
- [ ] "Write a Professional Email" template visible
- [ ] At least 3 templates showing
- [ ] Screenshot captured: `2-templates.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Choose from 15+ Expert-Crafted Prompt Templates"

---

### Screenshot 3: Prompt Wizard in Action
- [ ] Screen: `app/prompt-wizard/[id].tsx`
- [ ] Wizard interface showing
- [ ] Form fields filled with realistic content
- [ ] Progress indicator visible
- [ ] Step-by-step guidance clear
- [ ] Professional appearance
- [ ] Screenshot captured: `3-wizard.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Step-by-Step Guidance for Perfect Prompts"

---

### Screenshot 4: Generated Prompt Result
- [ ] Screen: `app/prompt-result.tsx`
- [ ] Complete generated prompt visible
- [ ] Copy button prominent
- [ ] Save to library button showing
- [ ] Clean formatting
- [ ] Realistic prompt content
- [ ] Screenshot captured: `4-result.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Copy and Use Your Prompt with Any AI Platform"

---

### Screenshot 5: Library Screen
- [ ] Screen: `app/(tabs)/library.tsx`
- [ ] Multiple saved prompts showing
- [ ] Search functionality visible
- [ ] Categories or organization clear
- [ ] At least 5 prompts visible
- [ ] Professional layout
- [ ] Screenshot captured: `5-library.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Save and Organize Your Best Prompts"

---

### Screenshot 6: Learn/Tutorial Screen
- [ ] Screen: `app/(tabs)/learn.tsx`
- [ ] Tutorial cards visible
- [ ] Different difficulty levels showing
- [ ] Educational content preview
- [ ] Clean, organized design
- [ ] At least 3 tutorials visible
- [ ] Screenshot captured: `6-learn.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Learn Prompt Engineering at Your Own Pace"

---

### Screenshot 7: Platform Recommendation
- [ ] Screen: `app/platform-recommendation.tsx`
- [ ] AI platform comparison visible
- [ ] Clear recommendations
- [ ] Information architecture clear
- [ ] Helpful for users
- [ ] Professional design
- [ ] Screenshot captured: `7-recommendation.png`
- [ ] Dimensions verified: 1290 x 2796
- [ ] File size under 500KB

**Caption:** "Find the Right AI Tool for Your Needs"

---

## Phase 3: Screenshot Capture - iPhone 6.5"

Required: Same 7 screenshots at 1242 x 2688 pixels

### Switch Simulator
- [ ] Open iPhone 11 Pro Max simulator
- [ ] App running properly
- [ ] Same demo account and data

### Repeat Captures
- [ ] Screenshot 1 captured (1242 x 2688)
- [ ] Screenshot 2 captured (1242 x 2688)
- [ ] Screenshot 3 captured (1242 x 2688)
- [ ] Screenshot 4 captured (1242 x 2688)
- [ ] Screenshot 5 captured (1242 x 2688)
- [ ] Screenshot 6 captured (1242 x 2688)
- [ ] Screenshot 7 captured (1242 x 2688)

### Verification
- [ ] All dimensions correct: 1242 x 2688
- [ ] All file sizes under 500KB
- [ ] Content matches 6.7" screenshots
- [ ] Screenshots saved in separate folder

## Phase 4: Optional Enhancements

### Device Frames (Recommended)
- [ ] Visited screenshot generator tool
- [ ] Uploaded all screenshots
- [ ] Selected iPhone frames
- [ ] Downloaded framed versions
- [ ] Verified framed dimensions still correct

### Text Overlays (Optional)
- [ ] Opened in design tool (Figma/Photoshop)
- [ ] Added text captions
- [ ] Used brand colors
- [ ] Text is readable
- [ ] Exported at correct resolution

### Quality Check
- [ ] Viewed at 100% zoom - all clear
- [ ] No pixelation or blur
- [ ] Colors look vibrant
- [ ] Text is readable
- [ ] Professional appearance

## Phase 5: Organization

### File Structure
- [ ] Created organized folders:
  ```
  screenshots/
  ├── iphone-6.7/
  │   ├── 1-welcome.png
  │   ├── 2-templates.png
  │   ├── 3-wizard.png
  │   ├── 4-result.png
  │   ├── 5-library.png
  │   ├── 6-learn.png
  │   └── 7-recommendation.png
  └── iphone-6.5/
      ├── 1-welcome.png
      ├── 2-templates.png
      ├── 3-wizard.png
      ├── 4-result.png
      ├── 5-library.png
      ├── 6-learn.png
      └── 7-recommendation.png
  ```

### File Naming
- [ ] All files properly named
- [ ] Numbers indicate order (1-7)
- [ ] Descriptive names used
- [ ] No spaces in filenames

## Phase 6: Final Review

### Technical Verification
- [ ] All screenshots are PNG or JPG format
- [ ] RGB color space (not CMYK)
- [ ] No transparency
- [ ] Correct dimensions for each device
- [ ] File sizes all under 500KB
- [ ] Total of 14 files (7 per device size)

### Content Review
- [ ] No personal information visible
- [ ] No error messages showing
- [ ] No empty states (unless intentional)
- [ ] Realistic, professional content
- [ ] Consistent time (9:41 AM)
- [ ] Consistent battery (full)
- [ ] Same color mode across all screenshots

### Visual Consistency
- [ ] All screenshots use same color mode (light/dark)
- [ ] Same demo account across all
- [ ] Consistent visual style
- [ ] Professional appearance throughout
- [ ] Screenshots tell coherent story

### Screenshots Show Key Features
- [ ] Onboarding/welcome experience
- [ ] Template selection variety
- [ ] Wizard functionality
- [ ] Generated output quality
- [ ] Library organization
- [ ] Learning resources
- [ ] Platform recommendations

## Phase 7: Upload to App Store Connect

### Pre-Upload
- [ ] Logged into App Store Connect
- [ ] Navigated to app → App Store tab
- [ ] Found "App Previews and Screenshots" section
- [ ] Ready to upload

### iPhone 6.7" Upload
- [ ] Clicked + under iPhone 6.7" Display
- [ ] Uploaded screenshot 1 (Welcome)
- [ ] Uploaded screenshot 2 (Templates)
- [ ] Uploaded screenshot 3 (Wizard)
- [ ] Uploaded screenshot 4 (Result)
- [ ] Uploaded screenshot 5 (Library)
- [ ] Uploaded screenshot 6 (Learn)
- [ ] Uploaded screenshot 7 (Recommendation)
- [ ] Screenshots in correct order
- [ ] All uploads successful

### iPhone 6.5" Upload
- [ ] Clicked + under iPhone 6.5" Display
- [ ] Uploaded all 7 screenshots
- [ ] Screenshots in correct order
- [ ] All uploads successful

### Captions (Optional)
- [ ] Added caption to screenshot 1
- [ ] Added caption to screenshot 2
- [ ] Added caption to screenshot 3
- [ ] Added caption to screenshot 4
- [ ] Added caption to screenshot 5
- [ ] Added caption to screenshot 6
- [ ] Added caption to screenshot 7

### Final App Store Connect Check
- [ ] All screenshots displaying correctly
- [ ] Preview looks good
- [ ] No upload errors
- [ ] Changes saved

## Phase 8: Additional Considerations

### iPad Screenshots (If Supporting iPad)
- [ ] iPad Pro 12.9" screenshots (2048 x 2732)
- [ ] 7 screenshots captured
- [ ] Uploaded to App Store Connect

### App Preview Video (Optional)
- [ ] 15-30 second video created
- [ ] Shows key features
- [ ] Professional quality
- [ ] Uploaded to App Store Connect

### Localization (Future)
- [ ] Screenshots for other languages
- [ ] Localized captions
- [ ] Cultural appropriateness checked

## Phase 9: Backup and Documentation

### Backups
- [ ] Screenshots backed up to cloud storage
- [ ] Source files saved
- [ ] Organized folder structure maintained
- [ ] Can recreate if needed

### Documentation
- [ ] Noted which device was used
- [ ] Documented any special setup
- [ ] Saved demo account credentials
- [ ] Noted any custom configurations

## Phase 10: Post-Submission

### After Upload
- [ ] Verified screenshots show in App Store Connect
- [ ] Showed screenshots to team/friends for feedback
- [ ] Made notes for future screenshot updates
- [ ] Planned for next version's screenshots

### For Future Updates
- [ ] Process documented for next time
- [ ] Tools and resources saved
- [ ] Template for future versions created
- [ ] Lessons learned noted

---

## Quick Status Check

**Total Screenshots Required:** 14 (7 for each device size)

**Current Progress:**
- iPhone 6.7" (1290 x 2796): ___ / 7 complete
- iPhone 6.5" (1242 x 2688): ___ / 7 complete

**Total Uploaded to App Store Connect:** ___ / 14

---

## Time Tracking

- **Preparation Time:** _____ hours
- **Capture Time:** _____ hours
- **Enhancement Time:** _____ hours
- **Upload Time:** _____ hours
- **Total Time:** _____ hours

---

## Notes

Use this space for notes, issues encountered, or reminders for next time:

```
[Your notes here]
```

---

## Need Help?

- See `SCREENSHOTS_QUICK_START.md` for quick reference
- See `APP_STORE_SCREENSHOTS_GUIDE.md` for detailed guide
- Run `./capture-screenshots.sh` for automated capture

---

**Ready to submit?** Make sure all checkboxes above are checked!
