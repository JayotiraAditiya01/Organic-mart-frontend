/**
 * Image Download Script for Organic E-commerce
 * Downloads high-quality, royalty-free images from Unsplash
 * 
 * Setup:
 * 1. Get a free API key from https://unsplash.com/developers
 * 2. Run: npm install axios
 * 3. Set your UNSPLASH_ACCESS_KEY below
 * 4. Run: node download-images.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ⚠️ REPLACE WITH YOUR UNSPLASH ACCESS KEY
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY_HERE';

// Image categories with specific search queries
const categories = [
  {
    name: 'fruits',
    folder: 'fruits',
    queries: [
      'organic apple white background',
      'organic banana white background',
      'organic orange fruit white background',
      'organic strawberry white background',
      'organic mango white background',
      'organic grapes white background',
      'organic watermelon white background',
      'organic pineapple white background',
      'organic papaya white background',
      'organic kiwi white background',
      'organic berries white background',
      'organic pomegranate white background',
      'organic peach white background',
      'organic pear white background',
      'organic cherry white background',
      'organic lemon white background',
      'organic lime white background',
      'organic avocado white background',
      'organic dragon fruit white background',
      'organic guava white background',
      'organic plum white background',
      'organic apricot white background',
      'organic melon white background',
      'organic passion fruit white background',
      'organic lychee white background',
      'organic fig white background',
      'organic persimmon white background',
      'organic tangerine white background',
      'organic grapefruit white background',
      'organic coconut white background'
    ]
  },
  {
    name: 'vegetables',
    folder: 'vegetables',
    queries: [
      'organic tomato white background',
      'organic carrot white background',
      'organic broccoli white background',
      'organic cauliflower white background',
      'organic spinach white background',
      'organic lettuce white background',
      'organic cucumber white background',
      'organic bell pepper white background',
      'organic potato white background',
      'organic onion white background',
      'organic garlic white background',
      'organic eggplant white background',
      'organic cabbage white background',
      'organic zucchini white background',
      'organic pumpkin white background',
      'organic beetroot white background',
      'organic radish white background',
      'organic green beans white background',
      'organic peas white background',
      'organic corn white background',
      'organic kale white background',
      'organic celery white background',
      'organic asparagus white background',
      'organic mushroom white background',
      'organic ginger white background',
      'organic sweet potato white background',
      'organic turnip white background',
      'organic leek white background',
      'organic artichoke white background',
      'organic brussels sprouts white background'
    ]
  },
  {
    name: 'dry-fruits',
    folder: 'dry-fruits',
    queries: [
      'organic almonds white background',
      'organic cashews white background',
      'organic walnuts white background',
      'organic pistachios white background',
      'organic raisins white background',
      'organic dates white background',
      'organic dried apricots white background',
      'organic dried figs white background',
      'organic dried cranberries white background',
      'organic prunes white background',
      'organic hazelnuts white background',
      'organic pecans white background',
      'organic brazil nuts white background',
      'organic pine nuts white background',
      'organic macadamia nuts white background',
      'organic dried mango white background',
      'organic dried pineapple white background',
      'organic dried papaya white background',
      'organic dried banana chips white background',
      'organic mixed nuts white background',
      'organic sunflower seeds white background',
      'organic pumpkin seeds white background',
      'organic chia seeds white background',
      'organic flax seeds white background',
      'organic sesame seeds white background',
      'organic dried berries white background',
      'organic dried cherries white background',
      'organic dried coconut white background',
      'organic dried apple rings white background',
      'organic trail mix white background'
    ]
  },
  {
    name: 'dairy',
    folder: 'dairy',
    queries: [
      'organic milk bottle white background',
      'organic yogurt white background',
      'organic cheese white background',
      'organic butter white background',
      'organic cream white background',
      'organic cottage cheese white background',
      'organic paneer white background',
      'organic ghee white background',
      'organic greek yogurt white background',
      'organic cheddar cheese white background',
      'organic mozzarella white background',
      'organic parmesan white background',
      'organic sour cream white background',
      'organic buttermilk white background',
      'organic whipped cream white background',
      'organic cream cheese white background',
      'organic kefir white background',
      'organic ricotta white background',
      'organic goat cheese white background',
      'organic feta cheese white background',
      'organic milk glass white background',
      'organic cheese slices white background',
      'organic butter block white background',
      'organic yogurt cup white background',
      'organic fresh milk white background',
      'organic dairy products white background',
      'organic cheese wheel white background',
      'organic milk jug white background',
      'organic dairy assortment white background',
      'organic fresh cream white background'
    ]
  },
  {
    name: 'grains',
    folder: 'grains',
    queries: [
      'organic rice white background',
      'organic wheat white background',
      'organic quinoa white background',
      'organic oats white background',
      'organic barley white background',
      'organic millet white background',
      'organic buckwheat white background',
      'organic brown rice white background',
      'organic whole wheat white background',
      'organic red rice white background',
      'organic black rice white background',
      'organic basmati rice white background',
      'organic jasmine rice white background',
      'organic wild rice white background',
      'organic cornmeal white background',
      'organic bulgur white background',
      'organic amaranth white background',
      'organic sorghum white background',
      'organic rye white background',
      'organic spelt white background',
      'organic farro white background',
      'organic freekeh white background',
      'organic wheat berries white background',
      'organic rolled oats white background',
      'organic steel cut oats white background',
      'organic pearl barley white background',
      'organic couscous white background',
      'organic polenta white background',
      'organic grain mix white background',
      'organic whole grains white background'
    ]
  }
];

// Create directories if they don't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Download image from URL
async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Search and download images from Unsplash
async function downloadImagesForCategory(category) {
  console.log(`\n📦 Processing category: ${category.name}`);
  console.log(`🔍 Downloading ${category.queries.length} images...\n`);

  const outputDir = path.join(__dirname, 'public', 'images', 'products', category.folder);
  ensureDirectoryExists(outputDir);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < category.queries.length; i++) {
    const query = category.queries[i];
    
    try {
      // Search for image on Unsplash
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: query,
          per_page: 1,
          orientation: 'squarish',
          content_filter: 'high'
        },
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const photo = response.data.results[0];
        const imageUrl = photo.urls.regular; // High quality image
        const filename = `${category.folder}-${String(i + 1).padStart(2, '0')}.jpg`;
        const filepath = path.join(outputDir, filename);

        // Download the image
        await downloadImage(imageUrl, filepath);
        
        successCount++;
        console.log(`✅ [${successCount}/${category.queries.length}] Downloaded: ${filename}`);
        
        // Attribution (save photographer info)
        const attribution = {
          photographer: photo.user.name,
          photographer_url: photo.user.links.html,
          photo_url: photo.links.html,
          download_location: photo.links.download_location
        };
        
        // Trigger download tracking (Unsplash requirement)
        await axios.get(photo.links.download_location, {
          headers: {
            'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
          }
        });

      } else {
        console.log(`⚠️  No image found for: ${query}`);
        failCount++;
      }

      // Rate limiting: wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Error downloading image for "${query}":`, error.message);
      failCount++;
    }
  }

  console.log(`\n✨ Category "${category.name}" completed!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}\n`);
}

// Main function
async function main() {
  console.log('🌿 Organic E-commerce Image Downloader');
  console.log('=====================================\n');

  // Check if API key is set
  if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY_HERE') {
    console.error('❌ ERROR: Please set your UNSPLASH_ACCESS_KEY in the script!');
    console.log('\n📝 Steps to get your API key:');
    console.log('   1. Go to https://unsplash.com/developers');
    console.log('   2. Register as a developer');
    console.log('   3. Create a new application');
    console.log('   4. Copy your Access Key');
    console.log('   5. Replace YOUR_UNSPLASH_ACCESS_KEY_HERE in this script\n');
    process.exit(1);
  }

  const startTime = Date.now();

  // Download images for each category
  for (const category of categories) {
    await downloadImagesForCategory(category);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000 / 60).toFixed(2);

  console.log('\n🎉 All done!');
  console.log(`⏱️  Total time: ${duration} minutes`);
  console.log(`📁 Images saved to: frontend/public/images/products/\n`);
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
