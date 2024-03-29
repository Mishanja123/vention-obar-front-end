import { useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

import { useCheckoutContext } from '@/context/checkoutContext';
import { PATHS } from '@/constants/paths';
import { ORDERTYPE } from '@/constants/orderType';

import styles from './OrderMethodSelection.module.css';

const OrderMethodSelection: React.FC = () => {
  const [method, setMethod] = useState<string>('');
  const { setDeliveryOrTakeOut } = useCheckoutContext();
  const handleMethodChange = (e: SelectChangeEvent<string>) => {
    setMethod(e.target.value as string);
    setDeliveryOrTakeOut(e.target.value as string);
  };

  return (
    <div className={styles.main_container}>
      <FormControl>
        <Select
          data-testid="deliveryAdress_selection"
          id="deliveryAdress_selection"
          displayEmpty
          label="Delivery Adress"
          value={method}
          inputProps={{ 'aria-label': 'Without label' }}
          onChange={handleMethodChange}>
          <MenuItem disabled value="">
            <em>Select a reservation method</em>
          </MenuItem>
          <MenuItem value={ORDERTYPE.REVERVATION_WITH_PREORDER}>
            <NavLink to={PATHS.BOOK_TABLE} style={{ width: '100%' }}>
              Reserve a table
            </NavLink>
          </MenuItem>
          <MenuItem value={ORDERTYPE.DELIVERY}>
            <NavLink to={PATHS.DELIVERY} style={{ width: '100%' }}>
              Delivery
            </NavLink>
          </MenuItem>
          <MenuItem value={ORDERTYPE.TAKEAWAY}>
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
