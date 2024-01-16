import { DeliveryAddressForm } from '@/components/molecules';
import DateAndTimePicker from '@/components/molecules/DateAndTimePicker/DateAndTimePicker';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Button } from '@/components/atoms';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './OrderDelivery.module.css';

const OrderDelivery = () => {
  const [deliveryAdress, setDeliveryAdress] = useState('');

  const handleDeliveryAdressChange = (e: SelectChangeEvent<string>) => {
    setDeliveryAdress(e.target.value as string);
  };

  const mySwal = withReactContent(Swal);

  const modalCall = () =>
    mySwal.fire({
      title: <p>Add your delivery adress</p>,
      html: <DeliveryAddressForm />,
      confirmButtonText: 'Close',
    });

  return (
    <div className={styles.main_container}>
      <FormControl>
        <InputLabel id="method_selection">Select Delivery Adress</InputLabel>
        <Select
          labelId="method_selection"
          id="method_selection"
          label="Method"
          value={deliveryAdress}
          onChange={handleDeliveryAdressChange}>
          <MenuItem value={'existing'}>Existing Adress</MenuItem>
          <MenuItem value={'new'}>New Delivery Adress</MenuItem>
        </Select>
      </FormControl>
      {deliveryAdress === 'new' && (
        <>
          <Button variant="contained" onClick={modalCall}>
            Add new adress
          </Button>
        </>
      )}
      <DateAndTimePicker />
    </div>
  );
};

export default OrderDelivery;
