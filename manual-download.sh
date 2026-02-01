#!/bin/bash

# Simple Image Downloader using curl
# For users who prefer not to use Node.js scripts

echo "🌿 Organic E-commerce Image Downloader (Manual URLs)"
echo "===================================================="
echo ""
echo "This script downloads images from direct URLs."
echo "You'll need to provide URLs for each image."
echo ""

# Create directories
mkdir -p public/images/products/{fruits,vegetables,dry-fruits,dairy,grains}

echo "✅ Directories created!"
echo ""
echo "📝 How to use this script:"
echo ""
echo "1. Find 30 image URLs for each category from:"
echo "   - Pexels.com"
echo "   - Unsplash.com"
echo "   - Pixabay.com"
echo ""
echo "2. Edit this script and add URLs to the arrays below"
echo ""
echo "3. Run: bash manual-download.sh"
echo ""
echo "════════════════════════════════════════════════════"
echo ""
echo "⚠️  INSTRUCTIONS:"
echo "   1. Open this file in a text editor"
echo "   2. Scroll down to 'IMAGE URLS' section"
echo "   3. Add your image URLs"
echo "   4. Save and run: bash manual-download.sh"
echo ""
echo "════════════════════════════════════════════════════"
echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# IMAGE URLS - ADD YOUR URLS HERE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Example format:
# FRUIT_URLS=(
#   "https://images.pexels.com/photos/xxxxx/pexels-photo-xxxxx.jpeg"
#   "https://images.pexels.com/photos/xxxxx/pexels-photo-xxxxx.jpeg"
#   ... add 30 URLs
# )

FRUIT_URLS=()
VEGETABLE_URLS=()
DRY_FRUIT_URLS=()
DAIRY_URLS=()
GRAIN_URLS=()

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# Check if URLs are provided
if [ ${#FRUIT_URLS[@]} -eq 0 ]; then
    echo "❌ No URLs found!"
    echo ""
    echo "Please edit this script and add image URLs."
    echo "See instructions above."
    exit 1
fi

# Function to download images
download_category() {
    local category=$1
    local folder=$2
    shift 2
    local urls=("$@")
    
    echo "📦 Downloading ${category}..."
    local count=1
    
    for url in "${urls[@]}"; do
        local filename="${folder}-$(printf "%02d" $count).jpg"
        local filepath="public/images/products/${folder}/${filename}"
        
        echo "  ⬇️  [${count}/${#urls[@]}] ${filename}"
        curl -L -s -o "$filepath" "$url"
        
        if [ $? -eq 0 ]; then
            echo "  ✅ Downloaded successfully"
        else
            echo "  ❌ Failed to download"
        fi
        
        ((count++))
        sleep 1  # Be nice to servers
    done
    
    echo "✨ ${category} complete!"
    echo ""
}

# Download all categories
if [ ${#FRUIT_URLS[@]} -gt 0 ]; then
    download_category "Fruits" "fruits" "${FRUIT_URLS[@]}"
fi

if [ ${#VEGETABLE_URLS[@]} -gt 0 ]; then
    download_category "Vegetables" "vegetables" "${VEGETABLE_URLS[@]}"
fi

if [ ${#DRY_FRUIT_URLS[@]} -gt 0 ]; then
    download_category "Dry Fruits" "dry-fruits" "${DRY_FRUIT_URLS[@]}"
fi

if [ ${#DAIRY_URLS[@]} -gt 0 ]; then
    download_category "Dairy Products" "dairy" "${DAIRY_URLS[@]}"
fi

if [ ${#GRAIN_URLS[@]} -gt 0 ]; then
    download_category "Organic Grains" "grains" "${GRAIN_URLS[@]}"
fi

echo "════════════════════════════════════════════════════"
echo "🎉 Download complete!"
echo "📁 Images saved to: public/images/products/"
echo "════════════════════════════════════════════════════"
