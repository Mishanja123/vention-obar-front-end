// interface DishData {
//   id: number;
//   title: string;
//   price: string;
//   photoPath: string | null;
//   ingredients: { title: string; is_required: boolean }[];
//   category:
//     | 'bar_bliss'
//     | 'culinary_classics'
//     | 'sunrise_specials'
//     | 'chefs_pick';
//   weight_grams: number;
//   CartId: null | number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface Dish {
//   dishData: DishData;
//   quantity: number;
//   subtotal: number;
// }

// export interface Order {
//   id: number;
//   userId: number;
//   createdAt: string;
//   updatedAt: string;
//   dishes: Dish[];
//   subTotal: number;
//   total: number;
//   orderDate: string;
//   guests: number;
//   payment_id: string;
//   status: 'active' | 'paid' | 'will_be_paid' | 'completed' | 'canceled';
//   type: 'reservation' | 'reservation_with_preorder' | 'take_away' | 'delivery';
//   user_address_id: string | null;
// }

export enum OrderStatus {
  ACTIVE = 'active',
  PAID = 'paid',
  WILL_BE_PAID = 'will_be_paid',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum OrderType {
  RESERVATION = 'reservation',
  RESERVATION_WITH_PREORDER = 'reservation_with_preorder',
  TAKE_AWAY = 'take_away',
  DELIVERY = 'delivery',
}

export interface IDish {
  dishData: {
    title: string;
    photoPath: string;
    id: number;
    subtotal: number;
  };
  subtotal: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  UserId: number;
  createdAt: string;
  updatedAt: string;
  dishes: IDish[];
  guests: number;
  orderDate: string;
  paymentId: string;
  status: OrderStatus | string;
  type: OrderType | string;
  userAddressId: number;
}
