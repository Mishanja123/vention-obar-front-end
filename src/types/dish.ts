import { DishCategory } from '@/constants/categoryDish';

type Ingredients = {
  title: string;
  is_required: boolean;
};

export type IDish = {
  id: string;
  title: string;
  photoURL: string;
  category: DishCategory;
  ingredients: Ingredients[];
  weightGrams: number;
  dateCreated: Date;
}
