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
  updateCreditCardById: (creditCard: ICreditCard) => void;
  handlePaymentOrder: (type: string) => void;
  setDeliveryOrTakeOut: (type: string) => void;
  handleDeleteOrder: () => void;
  handlePaymentCardAdditing: (creditCardInfo: Omit<ICreditCard, 'id'>) => void;
  orderData: OrderDish;
  tableGuests: number;
  selectedPaymentId: boolean;
  setSelectedPaymentId: (selectedPaymentId: boolean) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //@ts-expect-error
  const [creditCardData, setCreditCardData] = useState<ICreditCard>();
  const [selectedPaymentId, setSelectedPaymentId] = useState<boolean>(false);

  const updateCreditCardById = async (creditCard: ICreditCard) => {
    try {
      const { data } = await axiosInstance.patch(
        `/payment/${creditCard.id}`,
        creditCard,
      );
      console.log('updateCreditCardById : data', data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentOrder = async (type: string) => {
    const dishId = localStorage.getItem('dishId');
    const paymentId = localStorage.getItem('paymentId');

    try {
      await axiosInstance.post('/payout', {
        type,
        orderId: dishId,
        paymentId,
      });
      localStorage.removeItem('dishId');
      localStorage.removeItem('paymentId');
    } catch (error) {
      console.log(error);
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
    localStorage.setItem('dishId', JSON.stringify(res.data.reservation.id));

    setOrderData(res.data.reservation);
  };

  const sendDeliveryOrTakeOut = async (date: string, time: string) => {
    const res = await axiosInstance.post('/orders', {
      date,
      type: deliveryOrTakeOut,
      time,
    });
    localStorage.setItem('dishId', JSON.stringify(res.data.order.id));
    setOrderData(res.data.order);
  };

  const handleDeleteOrder = async () => {
    const dishId = localStorage.getItem('dishId');
    if (dishId) {
      try {
        await axiosInstance.delete(`/order/${dishId}`);
        localStorage.setItem('dishId', '');
        setOrderData({} as OrderDish);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePaymentCardAdditing = async (
    creditCardInfo: Omit<ICreditCard, 'id'>,
  ) => {
    try {
      const res = await axiosInstance.post('/payment', {
        ...creditCardInfo,
      });
      localStorage.setItem('paymentId', JSON.stringify(res.data));
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
        const res = await axiosInstance.get(`/order/${id}`);
        setOrderData(res.data);
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
        updateCreditCardById,
        selectedPaymentId,
        setSelectedPaymentId,
      }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
