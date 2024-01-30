interface DishData {
  id: number;
  title: string;
  price: string;
  photoPath: string | null;
  ingredients: { title: string; is_required: boolean }[];
  category:
    | 'bar_bliss'
    | 'culinary_classics'
    | 'sunrise_specials'
    | 'chefs_pick';
  weight_grams: number;
  CartId: null | number;
  createdAt?: string;
  updatedAt?: string;
}

interface Dish {
  dishData: DishData;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  dishes: Dish[];
  subTotal: number;
  total: number;
  order_date: string;
  guests: number;
  payment_id: string;
  status: 'active' | 'paid' | 'will_be_paid' | 'completed' | 'canceled';
  type: 'reservation' | 'reservation_with_preorder' | 'take_away' | 'delivery';
  user_address_id: string | null;
}
