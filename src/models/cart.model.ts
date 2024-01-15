export interface Cart {
  items: Array<CartItem>;
}

export interface CartItem {
  imageURL: string;
  title: string;
  price: number;
  quantity: number;
  id: string;
}
