import { useEffect, useState } from 'react';
import styles from './CreditCardsList.module.css';
import axiosInstance from '@/services/restaurantAPI';
import { ICreditCard } from '@/types/creditCard';
import { useCheckoutContext } from '@/context/checkoutContext';
import { paymentFormInputs } from '@/content/accountForms/paymentFormInputs';
import ReusableForm from '../ReuseableForm/ReuseableForm';

const CreditCardsList = () => {
  const [editingCard, setEditingCard] = useState<ICreditCard | null>(null);
  const [creditCards, setCreditCards] = useState<ICreditCard[]>([]);
  const { updateCreditCardById } = useCheckoutContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get('/payments');
        setCreditCards(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (card: ICreditCard) => {
    setEditingCard(card);
  };

  const handleSave = async (editedCard: ICreditCard) => {
    try {
      const { data } = await axiosInstance.patch(
        `/payment/${editedCard.id}`,
        editedCard,
      );
      setCreditCards((prevCards) =>
        prevCards.map((card) => (card.id === editedCard.id ? data : card)),
      );
      setEditingCard(null);
      // Call updateCreditCardById with the edited card
      updateCreditCardById(editedCard);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.credit_cards_container}>
      {creditCards.map((card) => (
        <div key={card.id} className={styles.credit_card_wrapper}>
          {editingCard && editingCard.id === card.id ? (
            <ReusableForm
              initialValues={editingCard}
              onSubmit={(values: ICreditCard) => handleSave(values)}
              formInputs={paymentFormInputs}
              submitButtonLabel="Save"
            />
          ) : (
            <ul className={styles.payment_address_list}>
              <li className={styles.payment_address_list_item}>
                Address Title: {card.addressTitle}
              </li>
              <li className={styles.payment_address_list_item}>
                Card Number: {card.cardNumber}
              </li>
              <li className={styles.payment_address_list_item}>
                Expiration Date: {card.month}/{card.year}
              </li>
              <li className={styles.payment_address_list_item}>
                CVV Number: {card.cvvNumber}
              </li>
              <li className={styles.payment_address_list_item}>
                Card Holder: {card.cardHolder}
              </li>
              <li className={styles.payment_address_list_item}>
                <button
                  className={styles.add_payment_button}
                  type="button"
                  onClick={() => handleEdit(card)}>
                  Edit
                </button>
              </li>
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreditCardsList;
