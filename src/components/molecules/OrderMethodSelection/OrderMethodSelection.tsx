import { PATHS } from '@/constants/paths';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './OrderMethodSelection.module.css';

const OrderMethodSelection: React.FC = () => {
  const [method, setMethod] = useState<string>('');

  const handleMethodChange = (e: SelectChangeEvent<string>) => {
    setMethod(e.target.value as string);
  };

  return (
    <div className={styles.main_container}>
      <FormControl>
        <InputLabel id="deliveryAdress_selection">
          Select a reservation method
        </InputLabel>
        <Select
          labelId="deliveryAdress_selection"
          id="deliveryAdress_selection"
          label="Delivery Adress"
          value={method}
          onChange={handleMethodChange}>
          <MenuItem value={'Reservation'}>
            <NavLink to={PATHS.BOOK_TABLE} style={{ width: '100%' }}>
              Reserve a table
            </NavLink>
          </MenuItem>
          <MenuItem value={'Delivery'}>
            <NavLink to={PATHS.DELIVERY} style={{ width: '100%' }}>
              Delivery
            </NavLink>
          </MenuItem>
          <MenuItem value={'Takeout'}>
            <NavLink to={PATHS.TAKEOUT} style={{ width: '100%' }}>
              Takeout
            </NavLink>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default OrderMethodSelection;
