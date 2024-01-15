import React, { createContext, useContext, useState } from 'react';
import axiosInstance from '../services/restaurantAPI';
import { OrderDish } from '@/types/orderItem';
import { ICreditCard } from '@/types/creditCard';

interface CheckoutContextProps {
  sendReservation: (
    date: string,
    time: string,
    guests: number,
    withPreorder: boolean,
  ) => void;
  sendDeliveryOrTakeOut: (date: string, time: string) => void;
  setDeliveryOrTakeOut: (type: string) => void;
  handleDeleteOrder: () => void;
  handlePaymentCardAdditing: (
    addressTitle: string,
    cardNumber: string,
    cardholder: string,
    cvvNumber: number,
    month: number,
    year: number,
  ) => void;
  orderData: OrderDish;
  tableGuests: number;
}

const CheckoutContext = createContext<CheckoutContextProps>(
  {} as CheckoutContextProps,
);

export const useCheckoutContext = () => useContext(CheckoutContext);

export const CheckoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [deliveryOrTakeOut, setDeliveryOrTakeOut] = useState<string>('');
  const [orderData, setOrderData] = useState({} as OrderDish);
  const [tableGuests, setTableGuests] = useState(0);
  const [creditCardData, setCreditCardData] = useState<ICreditCard>();
  console.log('🚀 : creditCardData', creditCardData);

  const sendReservation = async (
    date: string,
    time: string,
    guests: number,
    withPreorder: boolean,
  ) => {
    const res = await axiosInstance.post('/orders/table-reservation', {
      date,
      time,
      guests,
      withPreorder,
    });
    setTableGuests(guests);

    setOrderData(res.data.message);
  };

  const sendDeliveryOrTakeOut = async (date: string, time: string) => {
    const res = await axiosInstance.post('/orders', {
      order_date: date,
      type: deliveryOrTakeOut,
      time,
    });
    setOrderData(res.data.message);
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await axiosInstance.delete('/orders');
      console.log('🚀 : res', res);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentCardAdditing = async (
    addressTitle: string,
    cardNumber: string,
    cardholder: string,
    cvvNumber: number,
    month: number,
    year: number,
  ) => {
    try {
      const res = await axiosInstance.post('/payment', {
        addressTitle,
        cardNumber,
        cardholder,
        cvvNumber,
        month,
        year,
      });
      setCreditCardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        sendReservation,
        sendDeliveryOrTakeOut,
        setDeliveryOrTakeOut,
        orderData,
        handleDeleteOrder,
        tableGuests,
        handlePaymentCardAdditing,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
