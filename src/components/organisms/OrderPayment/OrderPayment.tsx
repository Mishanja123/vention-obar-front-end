import { Payment } from '@/components/molecules';
import { FaCreditCard } from 'react-icons/fa';
import styles from './OrderPayment.module.css';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useCheckoutContext } from '@/context/checkoutContext';
import axiosInstance from '@/services/restaurantAPI';
import { ICreditCard } from '@/types/creditCard';
import { FcCheckmark, FcCancel } from 'react-icons/fc';

const OrderPayment = () => {
  const [method, setMethod] = useState('');
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const { setSelectedPaymentId } = useCheckoutContext();

  const handleMethodChange = (e: SelectChangeEvent<string>) => {
    setMethod(e.target.value as string);
    setSelectedCardId(null);
  };

  const handleCreditCard = async (id: number) => {
    setSelectedCardId(id);
    setSelectedPaymentId(true);
    localStorage.setItem('paymentId', JSON.stringify(id));
  };

  useEffect(() => {
    const getAllCreditCards = async () => {
      try {
        const { data } = await axiosInstance.get('/payments');
        setCreditCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    getAllCreditCards();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.payment_container}>
        <div className={styles.card_icon_container}>
          <FaCreditCard className={styles.card_icon} />
        </div>
        <div className={styles.paymentMethod_container}>
          <FormControl>
            <InputLabel id="deliveryAddress_selection">
              Select a payment method
            </InputLabel>
            <Select
              labelId="deliveryAddress_selection"
              id="deliveryAddress_selection"
              label="Delivery Address"
              value={method}
              onChange={handleMethodChange}>
              <MenuItem value="New">Add new card</MenuItem>
              <MenuItem value="Existing">Existing card</MenuItem>
            </Select>
          </FormControl>
          {method === 'New' && <Payment />}
          {method === 'Existing' && (
            <div>
              <ul className={styles.card_list}>
                {creditCards.map((card) => (
                  <li key={card.id} className={styles.card_item}>
                    <p>{card.cardNumber}</p>
                    <p>{card.cardHolder}</p>
                    <button
                      className={styles.add_btn}
                      onClick={() => handleCreditCard(card.id)}>
                      {selectedCardId === card.id ? (
                        <FcCheckmark />
                      ) : (
                        <FcCancel />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
