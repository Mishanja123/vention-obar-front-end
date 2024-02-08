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
    <div className={styles.creditCardsContainer}>
      {creditCards.map((card) => (
        <div key={card.id} className={styles.creditCard}>
          {editingCard && editingCard.id === card.id ? (
            <ReusableForm
              initialValues={editingCard}
              onSubmit={(values) => handleSave(values)}
              formInputs={paymentFormInputs}
              submitButtonLabel="Save"
            />
          ) : (
            <>
              {/* Render credit card details */}
              <div>Address Title: {card.addressTitle}</div>
              <div>Card Number: {card.cardNumber}</div>
              <div>
                Expiration Date: {card.month}/{card.year}
              </div>
              <div>CVV Number: {card.cvvNumber}</div>
              <div>Card Holder: {card.cardHolder}</div>
              <button type="button" onClick={() => handleEdit(card)}>
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreditCardsList;
