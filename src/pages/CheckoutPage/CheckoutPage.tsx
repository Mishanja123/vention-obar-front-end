import { FormControl } from '@mui/base';
import { InputLabel, Select } from '@mui/material';

import { Outlet } from 'react-router-dom';

const CheckoutPage = () => {
  return (
    <>
      <h1>CheckoutPage</h1>
      <FormControl>
        <InputLabel id="method_selection">
          Select a reservation method
        </InputLabel>
        <Select labelId="method_selection" id="method_selection"></Select>
      </FormControl>
      <Outlet />
    </>
  );
};

export default CheckoutPage;
