import { CARTSTATUS } from '@/constants/cartStatus';

export type ICartItem = {
  id: string;
  imageURL: string;
  title: string;
  quantity: number;
  price: number;
  type: number;
  status: CARTSTATUS;
  createdAt: Date;
  reservationDate: Date;
  reservationTime: Date;
};
