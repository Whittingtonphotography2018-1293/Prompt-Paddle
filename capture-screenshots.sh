#!/bin/bash

# App Store Screenshot Capture Script for Prompt Paddle
# This script helps automate the screenshot capture process

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEVICE_NAME="iPhone 15 Pro Max"
SCREENSHOTS_DIR="$HOME/Desktop/PromptPaddle-Screenshots"
DATE=$(date +"%Y-%m-%d-%H%M%S")

echo -e "${BLUE}╔═══════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Prompt Paddle Screenshot Capture    ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════╝${NC}"
echo ""

# Create screenshots directory
mkdir -p "$SCREENSHOTS_DIR/iphone-6.7"
mkdir -p "$SCREENSHOTS_DIR/iphone-6.5"

echo -e "${GREEN}✓${NC} Created screenshots directory: $SCREENSHOTS_DIR"
echo ""

# Check if simulator is running
echo -e "${YELLOW}Checking simulator status...${NC}"
SIMULATOR_ID=$(xcrun simctl list devices | grep "$DEVICE_NAME" | grep -o '[A-F0-9-]\{36\}' | head -1)

if [ -z "$SIMULATOR_ID" ]; then
    echo -e "${YELLOW}! Simulator not found. Available devices:${NC}"
    xcrun simctl list devices | grep iPhone
    exit 1
fi

echo -e "${GREEN}✓${NC} Found simulator: $DEVICE_NAME"
echo -e "  ID: $SIMULATOR_ID"
echo ""

# Boot simulator if not running
SIMULATOR_STATE=$(xcrun simctl list devices | grep "$DEVICE_NAME" | grep -o '(.*)')

if [[ ! "$SIMULATOR_STATE" =~ "Booted" ]]; then
    echo -e "${YELLOW}Booting simulator...${NC}"
    xcrun simctl boot "$SIMULATOR_ID"
    sleep 3
    echo -e "${GREEN}✓${NC} Simulator booted"
else
    echo -e "${GREEN}✓${NC} Simulator already running"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${BLUE}  Ready to Capture Screenshots${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""
echo "Required screenshots for App Store:"
echo ""
echo "  1. Welcome/Onboarding Screen"
echo "  2. Template Selection (Create Tab)"
echo "  3. Prompt Wizard in Action"
echo "  4. Generated Prompt Result"
echo "  5. Library Screen with Saved Prompts"
echo "  6. Learn/Tutorial Screen"
echo "  7. Platform Recommendation Screen"
echo ""
echo -e "${YELLOW}Instructions:${NC}"
echo "  • Navigate to each screen in the simulator"
echo "  • Press ENTER to capture screenshot for current screen"
echo "  • Screenshots will be saved to: $SCREENSHOTS_DIR"
echo "  • Press Q + ENTER to quit"
echo ""

# Capture screenshots
capture_screenshot() {
    local screen_name=$1
    local screen_number=$2

    read -p "Ready to capture '$screen_name'? (Press ENTER, or Q to quit): " response

    if [[ "$response" =~ ^[Qq]$ ]]; then
        echo ""
        echo -e "${YELLOW}Screenshot capture cancelled.${NC}"
        exit 0
    fi

    local filename="$SCREENSHOTS_DIR/iphone-6.7/${screen_number}-${screen_name// /-}.png"

    xcrun simctl io "$SIMULATOR_ID" screenshot "$filename"

    if [ -f "$filename" ]; then
        echo -e "${GREEN}✓${NC} Captured: $screen_name"

        # Get image dimensions
        if command -v sips &> /dev/null; then
            dimensions=$(sips -g pixelWidth -g pixelHeight "$filename" | grep -E 'pixel(Width|Height)' | awk '{print $2}' | paste -sd 'x' -)
            echo -e "  Dimensions: $dimensions"
        fi

        echo ""
    else
        echo -e "${YELLOW}! Failed to capture screenshot${NC}"
        echo ""
    fi
}

# Capture each required screenshot
echo -e "${BLUE}Starting screenshot capture...${NC}"
echo ""

capture_screenshot "Welcome-Onboarding" "1"
capture_screenshot "Template-Selection" "2"
capture_screenshot "Prompt-Wizard" "3"
capture_screenshot "Generated-Result" "4"
capture_screenshot "Library-Screen" "5"
capture_screenshot "Learn-Tutorials" "6"
capture_screenshot "Platform-Recommendation" "7"

# Summary
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Screenshot capture complete!${NC}"
echo -e "${BLUE}═══════════════════════════════════════${NC}"
echo ""
echo "Screenshots saved to:"
echo "  $SCREENSHOTS_DIR/iphone-6.7/"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Review screenshots in Finder"
echo "  2. Verify dimensions (should be 1290 x 2796)"
echo "  3. Add device frames if desired"
echo "  4. Create iPhone 6.5\" versions (1242 x 2688) if needed"
echo "  5. Upload to App Store Connect"
echo ""
echo "Quick view screenshots:"
echo "  open '$SCREENSHOTS_DIR/iphone-6.7'"
echo ""

# Open screenshots folder
read -p "Open screenshots folder now? (Y/n): " open_folder
if [[ ! "$open_folder" =~ ^[Nn]$ ]]; then
    open "$SCREENSHOTS_DIR/iphone-6.7"
fi

echo ""
echo -e "${GREEN}Done! 🎉${NC}"
