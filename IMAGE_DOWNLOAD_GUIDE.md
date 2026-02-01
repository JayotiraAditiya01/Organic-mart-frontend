# 🌿 Image Download Guide for Organic E-commerce

## 📋 Overview
This guide will help you download 150 high-quality, royalty-free images (30 per category) for your organic e-commerce website.

## 🎯 Categories & Image Count
- ✅ Fruits (30 images)
- ✅ Vegetables (30 images)  
- ✅ Dry Fruits (30 images)
- ✅ Dairy Products (30 images)
- ✅ Organic Grains (30 images)

**Total: 150 professional HD images**

---

## 🚀 Quick Start (Recommended: Pexels)

### Step 1: Get Pexels API Key (FREE)
1. Visit: https://www.pexels.com/api/
2. Click "Get Started" and sign up
3. Go to your dashboard
4. Copy your API key

### Step 2: Install Dependencies
```bash
cd frontend
npm install axios
```

### Step 3: Configure Script
Open `download-pexels-images.js` and replace:
```javascript
const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY_HERE';
```
With your actual API key.

### Step 4: Download Images
```bash
node download-pexels-images.js
```

This will download all 150 images (takes ~10-15 minutes).

---

## 🎨 Alternative Option: Unsplash

If you prefer Unsplash's image quality:

### Step 1: Get Unsplash API Key
1. Visit: https://unsplash.com/developers
2. Register as a developer
3. Create a new application
4. Copy your Access Key

### Step 2: Configure Script
Open `download-images.js` and add your key:
```javascript
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY_HERE';
```

### Step 3: Run Script
```bash
node download-images.js
```

---

## 📁 Directory Structure

After running the script, images will be organized as:

```
frontend/
└── public/
    └── images/
        └── products/
            ├── fruits/
            │   ├── fruits-01.jpg
            │   ├── fruits-02.jpg
            │   └── ... (30 images)
            ├── vegetables/
            │   ├── vegetables-01.jpg
            │   └── ... (30 images)
            ├── dry-fruits/
            │   ├── dry-fruits-01.jpg
            │   └── ... (30 images)
            ├── dairy/
            │   ├── dairy-01.jpg
            │   └── ... (30 images)
            └── grains/
                ├── grains-01.jpg
                └── ... (30 images)
```

---

## 🖼️ Manual Download Option

If you prefer to download manually:

### Top Free Stock Photo Websites:

1. **Pexels** - https://www.pexels.com/
   - Search: "organic [category] white background"
   - Best for e-commerce style images

2. **Unsplash** - https://unsplash.com/
   - Search: "organic [product name]"
   - High-quality photography

3. **Pixabay** - https://pixabay.com/
   - Search: "organic [category]"
   - Large variety

4. **Freepik** - https://www.freepik.com/
   - Search: "organic [product] isolated"
   - Professional product photos

### Search Terms for Each Category:

#### Fruits (30)
- Apple, Banana, Orange, Strawberry, Mango
- Grapes, Watermelon, Pineapple, Papaya, Kiwi
- Berries, Pomegranate, Peach, Pear, Cherry
- Lemon, Lime, Avocado, Dragon Fruit, Guava
- Plum, Apricot, Melon, Passion Fruit, Lychee
- Fig, Persimmon, Tangerine, Grapefruit, Coconut

#### Vegetables (30)
- Tomato, Carrot, Broccoli, Cauliflower, Spinach
- Lettuce, Cucumber, Bell Pepper, Potato, Onion
- Garlic, Eggplant, Cabbage, Zucchini, Pumpkin
- Beetroot, Radish, Green Beans, Peas, Corn
- Kale, Celery, Asparagus, Mushroom, Ginger
- Sweet Potato, Turnip, Leek, Artichoke, Brussels Sprouts

#### Dry Fruits (30)
- Almonds, Cashews, Walnuts, Pistachios, Raisins
- Dates, Dried Apricots, Dried Figs, Cranberries, Prunes
- Hazelnuts, Pecans, Brazil Nuts, Pine Nuts, Macadamia
- Dried Mango, Pineapple, Papaya, Banana Chips, Mixed Nuts
- Sunflower Seeds, Pumpkin Seeds, Chia Seeds, Flax Seeds
- Sesame Seeds, Dried Berries, Cherries, Coconut, Trail Mix

#### Dairy Products (30)
- Milk Bottle, Yogurt, Cheese, Butter, Cream
- Cottage Cheese, Paneer, Ghee, Greek Yogurt
- Various cheese types: Cheddar, Mozzarella, Parmesan, Feta
- Cream Cheese, Kefir, Ricotta, Goat Cheese
- Milk in different containers, Butter blocks
- Dairy product arrangements

#### Organic Grains (30)
- Rice (White, Brown, Red, Black, Wild, Basmati, Jasmine)
- Wheat, Quinoa, Oats, Barley, Millet
- Buckwheat, Bulgur, Amaranth, Sorghum
- Rye, Spelt, Farro, Freekeh, Couscous
- Rolled Oats, Steel Cut Oats, Polenta
- Grain mixes and whole grain assortments

---

## ✅ Image Quality Requirements

All images should meet these criteria:

- **Resolution**: Minimum 1200x1200px
- **Format**: JPG (for web optimization)
- **Background**: White or clean/neutral
- **Lighting**: Natural, bright, professional
- **Style**: E-commerce product photography
- **Quality**: HD, no watermarks, no logos
- **Focus**: Sharp, well-framed, centered product

---

## 🔧 Troubleshooting

### Script not working?
1. Make sure you're in the `frontend` directory
2. Verify API key is correct
3. Check internet connection
4. Ensure axios is installed: `npm install axios`

### Rate limiting?
- Pexels: 200 requests/hour (script has 2-second delays)
- Unsplash: 50 requests/hour (script has 1-second delays)
- If you hit the limit, wait an hour and resume

### Low quality images?
- Use Pexels' `large2x` or Unsplash's `regular` size
- Both provide HD quality suitable for e-commerce

---

## 📝 Image Attribution

### Pexels
- No attribution required
- 100% free for commercial use
- No permission needed

### Unsplash
- Attribution appreciated but not required
- Free for commercial use
- Give credit when possible

---

## 🎯 Next Steps

After downloading images:

1. **Verify Downloads**: Check each category folder
2. **Review Quality**: Ensure images meet requirements
3. **Optimize**: Consider using image optimization tools
4. **Backup**: Save originals before optimization
5. **Update Database**: Add image paths to your product database

---

## 💡 Tips for Best Results

1. **Consistency**: All images should have similar style/lighting
2. **Sizing**: Keep aspect ratios consistent (1:1 is ideal)
3. **Naming**: Scripts already use organized naming (category-01.jpg)
4. **Optimization**: Use tools like TinyPNG or ImageOptim before deploying
5. **WebP Format**: Consider converting to WebP for better performance

---

## 📞 Support

If you encounter issues:
1. Check the error messages in terminal
2. Verify API keys are active
3. Ensure npm packages are installed
4. Check directory permissions

---

## 🌟 Pro Tips

- Run downloads during off-peak hours for faster speeds
- Keep original high-res versions as backup
- Use a CDN for serving images in production
- Implement lazy loading for better performance
- Consider using the OptimizedImage component in your project

---

**Happy downloading! 🎉**
