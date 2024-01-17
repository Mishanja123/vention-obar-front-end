import React, { createContext, useContext, useEffect, useState } from 'react';
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
  handlePaymentOrder: (type: string) => void;
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
  console.log('🚀 : orderData', orderData);

  const handlePaymentOrder = async (type: string) => {
    const dishId = localStorage.getItem('dishId');
    const paymentId = localStorage.getItem('paymentId');

    try {
      const res = await axiosInstance.post('/payout', {
        type,
        dishId,
        paymentId,
      });
      console.log('🚀 : res', res.data);
      localStorage.setItem('dishId', '');
      localStorage.setItem('paymentId', '');
    } catch (error) {
      console.log('🚀 : res', error);
    }
  };

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
    localStorage.setItem('dishId', JSON.stringify(res.data.message.id));

    setOrderData(res.data.message);
  };

  const sendDeliveryOrTakeOut = async (date: string, time: string) => {
    const res = await axiosInstance.post('/orders', {
      order_date: date,
      type: deliveryOrTakeOut,
      time,
    });
    localStorage.setItem('dishId', JSON.stringify(res.data.message.id));
    setOrderData(res.data.message);
  };

  const handleDeleteOrder = async () => {
    const dishId = localStorage.getItem('dishId');
    if (dishId) {
      try {
        await axiosInstance.delete(`/orders/${dishId}`);
        localStorage.setItem('dishId', '');
        setOrderData({} as OrderDish);
      } catch (error) {
        console.log(error);
      }
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

      localStorage.setItem('paymentId', JSON.stringify(res.data.id));
      setCreditCardData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const dishId = localStorage.getItem('dishId');
    const paymentId = localStorage.getItem('paymentId');

    const handleGetOrder = async (id: string) => {
      try {
        const res = await axiosInstance.get(`/orders/${id}`);
        setOrderData(res.data.message);
      } catch (error) {
        console.error(error);
      }
    };

    const handleGetOrderPaymentCard = async (id: string) => {
      try {
        const res = await axiosInstance.get(`/payment/${id}`);
        setCreditCardData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (paymentId) {
      setTimeout(() => {
        handleGetOrderPaymentCard(paymentId);
      }, 2000);
    }

    if (dishId) {
      setTimeout(() => {
        handleGetOrder(dishId);
      }, 1000);
    }
  }, []);

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
        handlePaymentOrder,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
