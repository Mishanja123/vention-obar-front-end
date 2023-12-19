import { CartStatus } from '@/constants/cartStatus';

export type ICartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  type: number;
  status: CartStatus;
  createdAt: Date;
  reservationDate: Date;
  reservationTime: Date;
}