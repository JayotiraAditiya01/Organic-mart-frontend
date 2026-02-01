// Image Configuration for Organic E-Commerce
// All images are sourced from Unsplash with proper licensing

export const productImages = {
  // Dairy Products
  dairy: {
    milk: {
      url: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
      alt: "Fresh organic milk in glass bottle",
      photographer: "Srikanta H. U"
    },
    butter: {
      url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&q=80",
      alt: "Organic butter on wooden board",
      photographer: "Megumi Nachev"
    },
    yogurt: {
      url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80",
      alt: "Fresh Greek yogurt in bowl",
      photographer: "Brenda Godinez"
    },
    cheese: {
      url: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500&q=80",
      alt: "Aged organic cheddar cheese",
      photographer: "Alexander Maasch"
    }
  },

  // Organic Medicines
  medicines: {
    herbalTea: {
      url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
      alt: "Organic herbal tea with herbs",
      photographer: "Manki Kim"
    },
    turmeric: {
      url: "https://images.unsplash.com/photo-1615485500834-bc10199bc315?w=500&q=80",
      alt: "Organic turmeric powder with root",
      photographer: "Pratiksha Mohanty"
    },
    ashwagandha: {
      url: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=500&q=80",
      alt: "Organic ashwagandha supplement",
      photographer: "Nadi Lindsay"
    }
  },

  // Farm Products / Grains
  farmProducts: {
    honey: {
      url: "https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=500&q=80",
      alt: "Pure organic honey in jar",
      photographer: "Arwin Neil Baichoo"
    },
    eggs: {
      url: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500&q=80",
      alt: "Farm fresh organic eggs in carton",
      photographer: "Jake Goossen"
    },
    quinoa: {
      url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
      alt: "Organic quinoa grains",
      photographer: "Pille-Riin Priske"
    }
  },

  // Fruits & Vegetables
  produce: {
    kale: {
      url: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&q=80",
      alt: "Fresh organic kale leaves",
      photographer: "Nadine Primeau"
    },
    tomatoes: {
      url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80",
      alt: "Ripe heirloom tomatoes",
      photographer: "Henrique Félix"
    },
    carrots: {
      url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&q=80",
      alt: "Fresh organic carrots with greens",
      photographer: "Gabriel Gurrola"
    },
    blueberries: {
      url: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=500&q=80",
      alt: "Bowl of fresh blueberries",
      photographer: "Joanna Kosinska"
    },
    avocados: {
      url: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80",
      alt: "Ripe organic avocados",
      photographer: "Thought Catalog"
    },
    apples: {
      url: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&q=80",
      alt: "Fresh red organic apples",
      photographer: "Priscilla Du Preez"
    }
  },

  // Honey Product Details Images
  honeyDetails: [
    {
      url: "https://images.unsplash.com/photo-1587049352846-4a222e784acc?w=800&q=80",
      alt: "Pure organic honey in glass jar",
      photographer: "Arwin Neil Baichoo"
    },
    {
      url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
      alt: "Honeycomb with fresh honey",
      photographer: "Art Rachen"
    },
    {
      url: "https://images.unsplash.com/photo-1606729383045-0b9f7e4a8b0d?w=800&q=80",
      alt: "Honey dripping from wooden dipper",
      photographer: "Meggyn Pomerleau"
    },
    {
      url: "https://images.unsplash.com/photo-1471943038946-da37193ce03c?w=800&q=80",
      alt: "Organic honey with wildflowers",
      photographer: "Sonja Langford"
    }
  ]
};

// Image optimization settings
export const imageConfig = {
  quality: 80,
  sizes: {
    thumbnail: 200,
    card: 500,
    detail: 800,
    zoom: 1200
  },
  lazyLoad: true,
  placeholder: "blur"
};

// Fallback emojis for when images fail to load
export const fallbackEmojis = {
  dairy: "🥛",
  medicines: "💊",
  farmProducts: "🌾",
  produce: "🥬",
  honey: "🍯"
};
