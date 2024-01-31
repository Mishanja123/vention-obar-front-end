import { DISHCATEGORY } from '@/constants/categoryDish';

export type Ingredients = {
  title: string;
  is_required: boolean;
};

export type IDish = {
  id: number;
  title: string;
  price: string;
  photoPath: string;
  category: DISHCATEGORY;
  ingredients: Ingredients[];
  weight_grams: number;
};
