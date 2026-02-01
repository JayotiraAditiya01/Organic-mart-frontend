#!/bin/bash

# Image Counter Script
# This will count your images and update the gallery

echo "🌿 Counting Product Images..."
echo "================================"

FRUITS=$(ls "/home/sama/Desktop/ORGANIC PROJECT/organic-ecommerce/frontend/public/images/products/fruits/" 2>/dev/null | wc -l)
VEGETABLES=$(ls "/home/sama/Desktop/ORGANIC PROJECT/organic-ecommerce/frontend/public/images/products/vegetables/" 2>/dev/null | wc -l)
DAIRY=$(ls "/home/sama/Desktop/ORGANIC PROJECT/organic-ecommerce/frontend/public/images/products/dairy/" 2>/dev/null | wc -l)
MEDICINES=$(ls "/home/sama/Desktop/ORGANIC PROJECT/organic-ecommerce/frontend/public/images/products/organic-medicines/" 2>/dev/null | wc -l)
FARM=$(ls "/home/sama/Desktop/ORGANIC PROJECT/organic-ecommerce/frontend/public/images/products/farm-products/" 2>/dev/null | wc -l)

echo "📊 Current Image Counts:"
echo "   Fruits: $FRUITS images"
echo "   Vegetables: $VEGETABLES images"
echo "   Dairy: $DAIRY images"
echo "   Organic Medicines: $MEDICINES images"
echo "   Farm Products: $FARM images"
echo ""
TOTAL=$((FRUITS + VEGETABLES + DAIRY + MEDICINES + FARM))
echo "   ✅ TOTAL: $TOTAL images"
echo ""
echo "================================"
echo ""
echo "📝 To update gallery, copy this code:"
echo ""
echo "  const categories = {"
echo "    fruits: { count: $FRUITS, name: 'Fruits' },"
echo "    vegetables: { count: $VEGETABLES, name: 'Vegetables' },"
echo "    dairy: { count: $DAIRY, name: 'Dairy Products' },"
echo "    'organic-medicines': { count: $MEDICINES, name: 'Organic Medicines' },"
echo "    'farm-products': { count: $FARM, name: 'Farm Products' }"
echo "  }"
echo ""
echo "📍 File to update: src/pages/ImageGallery.jsx (line 7)"
