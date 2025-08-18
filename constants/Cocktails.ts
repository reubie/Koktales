export type CocktailType = {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  preparation: string[];
  alcoholic: boolean;
  category: string;
  glassType: string;
  favorite?: boolean;
  rating?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeMinutes: number;
  tags: string[];
};

export type CategoryType = {
  id: string;
  name: string;
  image: string;
  description: string;
  count: number;
};

export const categories: CategoryType[] = [
  {
    id: '1',
    name: 'Popular',
    image: 'https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg',
    description: 'Most loved cocktails by our users',
    count: 24
  },
  {
    id: '2',
    name: 'Classics',
    image: 'https://images.pexels.com/photos/613037/pexels-photo-613037.jpeg',
    description: 'Timeless cocktail recipes',
    count: 18
  },
  {
    id: '3',
    name: 'Mocktails',
    image: 'https://images.pexels.com/photos/452737/pexels-photo-452737.jpeg',
    description: 'Non-alcoholic alternatives',
    count: 15
  },
  {
    id: '4',
    name: 'Summer',
    image: 'https://images.pexels.com/photos/1189261/pexels-photo-1189261.jpeg',
    description: 'Refreshing summer drinks',
    count: 20
  },
  {
    id: '5',
    name: 'Tropical',
    image: 'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg',
    description: 'Exotic flavors from paradise',
    count: 12
  }
];

export type Ingredient = {
  id: string;
  name: string;
  amount: string;
  unit: string;
  estimatedPrice?: number; // Optional price in dollars
};

export type RecipeStep = {
  id: string;
  description: string;
  duration?: number; // Duration in seconds for this step
  action?: 'shake' | 'stir' | 'build' | 'garnish'; // Type of action
};

export type Cocktail = {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'free' | 'premium';
  category: 'Popular' | 'Classics' | 'Mocktails' | 'Summer' | 'Tropical';
  ingredients: Ingredient[];
  recipeSteps: RecipeStep[];
  difficulty: 'easy' | 'medium' | 'hard';
  preparationTime: string;
  price?: number; // For premium cocktails
  glassType?: string; // Type of glass to serve in
  shakeTime?: number; // Time to shake in seconds
};

export const cocktails: Cocktail[] = [
  {
    id: '1',
    name: 'Classic Mojito',
    description: 'A refreshing Cuban highball with rum, mint, and lime',
    image: 'https://images.pexels.com/photos/4051391/pexels-photo-4051391.jpeg',
    type: 'free',
    category: 'Popular',
    difficulty: 'easy',
    preparationTime: '5 min',
    glassType: 'Highball Glass',
    shakeTime: 12,
    ingredients: [
      { id: '1', name: 'White Rum', amount: '2', unit: 'oz' },
      { id: '2', name: 'Fresh Lime Juice', amount: '1', unit: 'oz' },
      { id: '3', name: 'Simple Syrup', amount: '0.75', unit: 'oz' },
      { id: '4', name: 'Fresh Mint Leaves', amount: '8-10', unit: 'leaves' },
      { id: '5', name: 'Club Soda', amount: '2', unit: 'oz' },
    ],
    recipeSteps: [
      {
        id: '1',
        description: 'Add mint leaves and simple syrup to the shaker',
        action: 'build'
      },
      {
        id: '2',
        description: 'Gently muddle the mint leaves to release oils',
        action: 'build'
      },
      {
        id: '3',
        description: 'Add lime juice and white rum to the shaker',
        action: 'build'
      },
      {
        id: '4',
        description: 'Fill shaker with ice and shake vigorously',
        action: 'shake',
        duration: 12
      },
      {
        id: '5',
        description: 'Strain into a highball glass filled with ice',
        action: 'build'
      },
      {
        id: '6',
        description: 'Top with club soda and garnish with mint sprig',
        action: 'garnish'
      }
    ]
  },
  {
    id: '2',
    name: 'Old Fashioned',
    description: 'A sophisticated whiskey cocktail with bitters',
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg',
    type: 'premium',
    category: 'Classics',
    difficulty: 'medium',
    preparationTime: '5 min',
    price: 4.99,
    glassType: 'Rocks Glass',
    ingredients: [
      { id: '6', name: 'Bourbon Whiskey', amount: '2', unit: 'oz' },
      { id: '7', name: 'Angostura Bitters', amount: '2-3', unit: 'dashes' },
      { id: '8', name: 'Sugar Cube', amount: '1', unit: 'piece' },
      { id: '9', name: 'Orange Peel', amount: '1', unit: 'piece' },
    ],
    recipeSteps: [
      {
        id: '1',
        description: 'Place sugar cube in rocks glass',
        action: 'build'
      },
      {
        id: '2',
        description: 'Add 2-3 dashes of Angostura bitters',
        action: 'build'
      },
      {
        id: '3',
        description: 'Add a splash of water and muddle until sugar dissolves',
        action: 'build'
      },
      {
        id: '4',
        description: 'Fill glass with ice cubes',
        action: 'build'
      },
      {
        id: '5',
        description: 'Pour bourbon whiskey over ice',
        action: 'build'
      },
      {
        id: '6',
        description: 'Stir gently for 30 seconds to chill',
        action: 'stir',
        duration: 30
      },
      {
        id: '7',
        description: 'Express orange peel over drink and garnish',
        action: 'garnish'
      }
    ]
  },
  {
    id: '3',
    name: 'Margarita',
    description: 'A classic tequila-based cocktail with lime and salt',
    image: 'https://images.pexels.com/photos/2480828/pexels-photo-2480828.jpeg',
    type: 'free',
    category: 'Popular',
    difficulty: 'easy',
    preparationTime: '5 min',
    glassType: 'Margarita Glass',
    shakeTime: 15,
    ingredients: [
      { id: '10', name: 'Tequila', amount: '2', unit: 'oz' },
      { id: '11', name: 'Triple Sec', amount: '1', unit: 'oz' },
      { id: '12', name: 'Fresh Lime Juice', amount: '1', unit: 'oz' },
      { id: '13', name: 'Salt', amount: '1', unit: 'pinch' },
    ],
    recipeSteps: [
      {
        id: '1',
        description: 'Rim the glass with salt (optional)',
        action: 'build'
      },
      {
        id: '2',
        description: 'Add tequila, triple sec, and lime juice to shaker',
        action: 'build'
      },
      {
        id: '3',
        description: 'Fill shaker with ice and shake vigorously',
        action: 'shake',
        duration: 15
      },
      {
        id: '4',
        description: 'Strain into salt-rimmed glass',
        action: 'build'
      },
      {
        id: '5',
        description: 'Garnish with lime wheel',
        action: 'garnish'
      }
    ]
  },
  {
    id: '4',
    name: 'Espresso Martini',
    description: 'A sophisticated coffee cocktail with vodka',
    image: 'https://images.pexels.com/photos/2789328/pexels-photo-2789328.jpeg',
    type: 'premium',
    category: 'Popular',
    difficulty: 'medium',
    preparationTime: '7 min',
    price: 5.99,
    glassType: 'Martini Glass',
    shakeTime: 20,
    ingredients: [
      { id: '14', name: 'Vodka', amount: '2', unit: 'oz' },
      { id: '15', name: 'Fresh Espresso', amount: '1', unit: 'oz' },
      { id: '16', name: 'Coffee Liqueur', amount: '0.5', unit: 'oz' },
      { id: '17', name: 'Simple Syrup', amount: '0.5', unit: 'oz' },
    ],
    recipeSteps: [
      {
        id: '1',
        description: 'Brew fresh espresso and let cool slightly',
        action: 'build'
      },
      {
        id: '2',
        description: 'Add vodka, coffee liqueur, and simple syrup to shaker',
        action: 'build'
      },
      {
        id: '3',
        description: 'Add cooled espresso to shaker',
        action: 'build'
      },
      {
        id: '4',
        description: 'Fill shaker with ice and shake vigorously',
        action: 'shake',
        duration: 20
      },
      {
        id: '5',
        description: 'Double strain into chilled martini glass',
        action: 'build'
      },
      {
        id: '6',
        description: 'Garnish with coffee beans',
        action: 'garnish'
      }
    ]
  },
  {
    id: '5',
    name: 'Gin & Tonic',
    description: 'A refreshing classic with gin and tonic water',
    image: 'https://images.pexels.com/photos/1170599/pexels-photo-1170599.jpeg',
    type: 'free',
    category: 'Classics',
    difficulty: 'easy',
    preparationTime: '3 min',
    glassType: 'Highball Glass',
    ingredients: [
      { id: '18', name: 'Gin', amount: '2', unit: 'oz' },
      { id: '19', name: 'Tonic Water', amount: '4', unit: 'oz' },
      { id: '20', name: 'Lime Wedge', amount: '1', unit: 'piece' },
    ],
    recipeSteps: [
      {
        id: '1',
        description: 'Fill highball glass with ice cubes',
        action: 'build'
      },
      {
        id: '2',
        description: 'Pour gin over ice',
        action: 'build'
      },
      {
        id: '3',
        description: 'Top with tonic water',
        action: 'build'
      },
      {
        id: '4',
        description: 'Gently stir to combine',
        action: 'stir',
        duration: 5
      },
      {
        id: '5',
        description: 'Garnish with lime wedge',
        action: 'garnish'
      }
    ]
  }
];