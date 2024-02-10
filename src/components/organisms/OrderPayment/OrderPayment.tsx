import { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { Payment } from '@/components/molecules';

import styles from './OrderPayment.module.css';

const OrderPayment = () => {
  const [method, setMethod] = useState('');

  const handleMethodChange = (e: SelectChangeEvent<string>) => {
    setMethod(e.target.value as string);
  };

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
        </div>
      </div>
    </div>
  );
};

export default OrderPayment;
