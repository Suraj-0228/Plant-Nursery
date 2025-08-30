export interface Plant {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Indoor Plants' | 'Outdoor Plants' | 'Herbs & Vegetables' | 'Flowers';
  careLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  lightRequirement: 'Low' | 'Medium' | 'High';
  waterFrequency: 'Weekly' | 'Bi-weekly' | 'Daily';
  size: 'Small' | 'Medium' | 'Large';
  popularity: number;
}

export const plants: Plant[] = [
  // Indoor Plants
  {
    id: '1',
    name: 'Monstera Deliciosa',
    price: 3799,
    image: 'https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Indoor Plants',
    careLevel: 'Intermediate',
    description: 'Beautiful split-leaf tropical plant perfect for bright indoor spaces.',
    lightRequirement: 'Medium',
    waterFrequency: 'Weekly',
    size: 'Large',
    popularity: 95
  },
  {
    id: '2',
    name: 'Snake Plant',
    price: 2099,
    image: 'https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Indoor Plants',
    careLevel: 'Beginner',
    description: 'Low-maintenance plant that thrives in low light conditions.',
    lightRequirement: 'Low',
    waterFrequency: 'Bi-weekly',
    size: 'Medium',
    popularity: 88
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    price: 5499,
    image: 'https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Indoor Plants',
    careLevel: 'Advanced',
    description: 'Dramatic large-leafed plant that makes a stunning focal point.',
    lightRequirement: 'High',
    waterFrequency: 'Weekly',
    size: 'Large',
    popularity: 82
  },
  {
    id: '4',
    name: 'Pothos',
    price: 1599,
    image: 'https://images.pexels.com/photos/4505172/pexels-photo-4505172.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Indoor Plants',
    careLevel: 'Beginner',
    description: 'Trailing vine perfect for hanging baskets or shelves.',
    lightRequirement: 'Medium',
    waterFrequency: 'Weekly',
    size: 'Small',
    popularity: 92
  },

  // Outdoor Plants
  {
    id: '5',
    name: 'Japanese Maple',
    price: 7499,
    image: 'https://images.pexels.com/photos/1212487/pexels-photo-1212487.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Outdoor Plants',
    careLevel: 'Intermediate',
    description: 'Stunning ornamental tree with beautiful fall colors.',
    lightRequirement: 'Medium',
    waterFrequency: 'Weekly',
    size: 'Large',
    popularity: 85
  },
  {
    id: '6',
    name: 'Hydrangea',
    price: 2799,
    image: 'https://images.pexels.com/photos/1212485/pexels-photo-1212485.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Outdoor Plants',
    careLevel: 'Intermediate',
    description: 'Beautiful flowering shrub with large colorful blooms.',
    lightRequirement: 'Medium',
    waterFrequency: 'Weekly',
    size: 'Medium',
    popularity: 78
  },
  {
    id: '7',
    name: 'Lavender',
    price: 1899,
    image: 'https://images.pexels.com/photos/1212490/pexels-photo-1212490.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Outdoor Plants',
    careLevel: 'Beginner',
    description: 'Fragrant herb perfect for gardens and aromatherapy.',
    lightRequirement: 'High',
    waterFrequency: 'Bi-weekly',
    size: 'Medium',
    popularity: 90
  },

  // Herbs & Vegetables
  {
    id: '8',
    name: 'Basil',
    price: 749,
    image: 'https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Herbs & Vegetables',
    careLevel: 'Beginner',
    description: 'Essential culinary herb perfect for cooking and pesto.',
    lightRequirement: 'High',
    waterFrequency: 'Daily',
    size: 'Small',
    popularity: 95
  },
  {
    id: '9',
    name: 'Cherry Tomatoes',
    price: 1099,
    image: 'https://images.pexels.com/photos/1212486/pexels-photo-1212486.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Herbs & Vegetables',
    careLevel: 'Intermediate',
    description: 'Sweet, prolific tomatoes perfect for containers.',
    lightRequirement: 'High',
    waterFrequency: 'Daily',
    size: 'Medium',
    popularity: 88
  },
  {
    id: '10',
    name: 'Rosemary',
    price: 1249,
    image: 'https://images.pexels.com/photos/1212488/pexels-photo-1212488.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Herbs & Vegetables',
    careLevel: 'Beginner',
    description: 'Aromatic evergreen herb excellent for cooking.',
    lightRequirement: 'High',
    waterFrequency: 'Bi-weekly',
    size: 'Medium',
    popularity: 85
  },

  // Flowers
  {
    id: '11',
    name: 'Sunflower',
    price: 849,
    image: 'https://images.pexels.com/photos/1212489/pexels-photo-1212489.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Flowers',
    careLevel: 'Beginner',
    description: 'Bright, cheerful flowers that follow the sun.',
    lightRequirement: 'High',
    waterFrequency: 'Weekly',
    size: 'Large',
    popularity: 92
  },
  {
    id: '12',
    name: 'Marigold',
    price: 599,
    image: 'https://images.pexels.com/photos/1212491/pexels-photo-1212491.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Flowers',
    careLevel: 'Beginner',
    description: 'Vibrant, pest-repelling flowers perfect for gardens.',
    lightRequirement: 'High',
    waterFrequency: 'Weekly',
    size: 'Small',
    popularity: 80
  }
];

export const careGuides = [
  {
    id: '1',
    title: 'Watering Your Plants',
    category: 'Basic Care',
    image: 'https://images.pexels.com/photos/1212492/pexels-photo-1212492.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Learn the proper watering techniques for different plant types.',
    content: 'Proper watering is essential for plant health. Check soil moisture regularly and water when the top inch feels dry...',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Understanding Light Requirements',
    category: 'Basic Care',
    image: 'https://images.pexels.com/photos/1212493/pexels-photo-1212493.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Discover how to match your plants with the right lighting conditions.',
    content: 'Light is crucial for photosynthesis. Different plants have varying light needs from low to high intensity...',
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Seasonal Plant Care',
    category: 'Seasonal Tips',
    image: 'https://images.pexels.com/photos/1212494/pexels-photo-1212494.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Adapt your plant care routine throughout the seasons.',
    content: 'Plants have different needs throughout the year. Spring brings new growth, summer requires more water...',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Common Plant Problems',
    category: 'Troubleshooting',
    image: 'https://images.pexels.com/photos/1212495/pexels-photo-1212495.jpeg?auto=compress&cs=tinysrgb&w=400',
    excerpt: 'Identify and solve the most common plant health issues.',
    content: 'Yellow leaves, brown tips, and wilting can indicate various problems. Here\'s how to diagnose and treat them...',
    readTime: '8 min read'
  }
];