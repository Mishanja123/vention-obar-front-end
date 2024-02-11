import { DeliveryAddressForm } from '@/components/molecules';
import DateAndTimePicker from '@/components/molecules/DateAndTimePicker/DateAndTimePicker';
import {
  FormControl,
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
      confirmButtonColor: '#182715',
      background: '#fff5e1',
    });

  return (
    <div className={styles.main_container}>
      <FormControl>
        <Select
          id="method_selection"
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          label="Method"
          value={deliveryAdress}
          onChange={handleDeliveryAdressChange}>
          <MenuItem disabled value="">
            <em>Select Delivery Adress</em>
          </MenuItem>
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
