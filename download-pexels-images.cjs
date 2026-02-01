/**
 * Alternative Image Downloader using Pexels API
 * Pexels has simpler API and better e-commerce style photos
 * 
 * Setup:
 * 1. Get free API key from https://www.pexels.com/api/
 * 2. Run: npm install axios
 * 3. Set your PEXELS_API_KEY below
 * 4. Run: node download-pexels-images.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// ⚠️ REPLACE WITH YOUR PEXELS API KEY
const PEXELS_API_KEY = 'X9i8nrH9jGiCYrlthPCE3tZjqASvDo1UO3HzSSj8ztwwplMZqlC4FI9u';

const categories = {
  fruits: [
    'red apple isolated', 'ripe banana bunch', 'orange citrus fruit', 'purple grapes cluster',
    'yellow mango tropical', 'fresh strawberries red', 'whole pineapple tropical', 'watermelon slice red',
    'kiwi fruit green', 'papaya orange tropical', 'pomegranate seeds red', 'blueberries bowl',
    'fresh raspberries', 'blackberries fresh', 'green pear', 'peach fruit fuzzy',
    'purple plums', 'red cherries', 'guava tropical', 'lychee fruit',
    'apricot orange', 'cantaloupe melon', 'honeydew melon green', 'dragon fruit pink',
    'passion fruit', 'fresh fig', 'pink grapefruit', 'mandarin orange',
    'tangerine citrus', 'nectarine fruit'
  ],
  vegetables: [
    'red tomato fresh', 'potato vegetable', 'orange carrot', 'green broccoli florets',
    'spinach leaves fresh', 'bell pepper capsicum', 'green cucumber', 'cauliflower white',
    'purple eggplant', 'green zucchini', 'sweet potato orange', 'red radish',
    'beetroot purple', 'lettuce salad green', 'kale leaves', 'green cabbage',
    'celery stalks', 'red bell pepper', 'yellow bell pepper', 'green okra',
    'green peas pod', 'corn yellow', 'onion vegetable', 'garlic bulb',
    'ginger root', 'artichoke vegetable', 'asparagus green', 'brussels sprouts',
    'mushrooms brown', 'corn cob yellow'
  ]
};

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

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

async function searchPexelsImages(query, perPage = 1) {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        'Authorization': PEXELS_API_KEY
      },
      params: {
        query: query,
        per_page: perPage,
        orientation: 'square',
        size: 'large'
      }
    });

    return response.data.photos || [];
  } catch (error) {
    console.error(`Error searching Pexels for "${query}":`, error.message);
    return [];
  }
}

async function downloadCategoryImages(categoryName, queries) {
  console.log(`\n📦 Processing: ${categoryName.toUpperCase()}`);
  console.log(`${'='.repeat(50)}`);
  
  const outputDir = path.join(__dirname, 'public', 'images', 'products', categoryName);
  ensureDirectoryExists(outputDir);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];
    
    try {
      const photos = await searchPexelsImages(query, 1);

      if (photos.length > 0) {
        const photo = photos[0];
        const imageUrl = photo.src.large2x; // High quality
        const filename = `${categoryName}-${String(i + 1).padStart(2, '0')}.jpg`;
        const filepath = path.join(outputDir, filename);

        await downloadImage(imageUrl, filepath);
        
        successCount++;
        console.log(`✅ [${successCount}/${queries.length}] ${filename} - ${query}`);

      } else {
        console.log(`⚠️  [${i + 1}/${queries.length}] No image for: ${query}`);
        failCount++;
      }

      // Rate limiting: Pexels allows 200 requests per hour
      // Wait 2 seconds between requests to be safe
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ Error for "${query}":`, error.message);
      failCount++;
    }
  }

  console.log(`\n📊 Results for ${categoryName}:`);
  console.log(`   ✅ Downloaded: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Location: public/images/products/${categoryName}/\n`);
}

async function main() {
  console.log('\n🌿 ORGANIC E-COMMERCE IMAGE DOWNLOADER (Pexels)');
  console.log('='.repeat(50));
  console.log('📸 Downloading 30 HD images per category\n');

  if (PEXELS_API_KEY === 'YOUR_PEXELS_API_KEY_HERE') {
    console.error('❌ ERROR: Please set your PEXELS_API_KEY!\n');
    console.log('📝 How to get your API key:');
    console.log('   1. Visit: https://www.pexels.com/api/');
    console.log('   2. Sign up for free');
    console.log('   3. Go to "Your API Key" section');
    console.log('   4. Copy your API key');
    console.log('   5. Replace YOUR_PEXELS_API_KEY_HERE in this script\n');
    process.exit(1);
  }

  const startTime = Date.now();
  const totalImages = Object.values(categories).reduce((sum, arr) => sum + arr.length, 0);
  
  console.log(`🎯 Total images to download: ${totalImages}`);
  console.log(`📂 Categories: ${Object.keys(categories).length}\n`);

  for (const [categoryName, queries] of Object.entries(categories)) {
    await downloadCategoryImages(categoryName, queries);
  }

  const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);

  console.log('\n' + '='.repeat(50));
  console.log('🎉 DOWNLOAD COMPLETE!');
  console.log(`⏱️  Time taken: ${duration} minutes`);
  console.log(`📁 All images saved to: frontend/public/images/products/`);
  console.log('='.repeat(50) + '\n');
}

main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
