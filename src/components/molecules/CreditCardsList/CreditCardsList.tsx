import { useEffect, useState } from 'react';
import styles from './CreditCardsList.module.css';
import axiosInstance from '@/services/restaurantAPI';
import { ICreditCard } from '@/types/creditCard';
import { useCheckoutContext } from '@/context/checkoutContext';

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
            <form
              key={card.id}
              className={styles.payment_address_form}
              onSubmit={(e) => {
                e.preventDefault();
                // You might want to validate form fields before saving
                handleSave(editingCard);
              }}>
              {/* Render input fields for editing */}
              <input
                label="Address Title"
                value={editingCard.addressTitle}
                onChange={(e) =>
                  setEditingCard({
                    ...editingCard,
                    addressTitle: e.target.value,
                  })
                }
              />
              <input
                label="Card Number"
                value={editingCard.cardNumber}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, cardNumber: e.target.value })
                }
              />
              <div className={styles.expiration}>
                <input
                  label="Month"
                  value={editingCard.month}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      month: e.target.value,
                    })
                  }
                />
                <input
                  label="Year"
                  value={editingCard.year}
                  onChange={(e) =>
                    setEditingCard({
                      ...editingCard,
                      year: e.target.value,
                    })
                  }
                />
              </div>
              <input
                label="CVV Number"
                value={editingCard.cvvNumber}
                onChange={(e) =>
                  setEditingCard({
                    ...editingCard,
                    cvvNumber: e.target.value,
                  })
                }
              />
              <input
                label="Card Holder"
                value={editingCard.cardHolder}
                onChange={(e) =>
                  setEditingCard({ ...editingCard, cardHolder: e.target.value })
                }
              />
              {/* Render other input fields for credit card details */}
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
            </form>
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
