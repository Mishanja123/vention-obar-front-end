import { Link } from 'react-router-dom';

import { PATHS } from '@/constants/paths';
import { useCheckoutContext } from '@/context/checkoutContext';
import { useCartContext } from '@/context/cartContext';
import useSummaryButton from '@/hooks/useSummaryButton';

import { Button } from '@/components/atoms';
import { SummaryPayment } from '@/components/molecules';

import styles from './CheckoutSummary.module.css';

const CheckoutSummary = ({ path }: { path: string }) => {
  const {
    firstButton,
    secondButton,
    firstButtonLink,
    secondButtonLink,
    onClickFirstButton,
    onClickSecondButton,
    disabled,
  } = useSummaryButton({ path });
  const { orderData } = useCheckoutContext();
  const { cartItems, allDishesQuantity } = useCartContext();

  const forbidProceeding =
    (firstButton === 'Proceed' && typeof orderData === 'string') ||
    Object.keys(orderData).length === 0;

  return (
    <div className={styles.summary_section}>
      <SummaryPayment
        quantity={allDishesQuantity}
        subtotal={cartItems?.subTotal}
        total={cartItems?.total}>
        <div className={styles.summary_btn_wrapper}>
          <Link
            className={forbidProceeding || disabled ? styles.inactive : ''}
            to={firstButtonLink}
            onClick={onClickFirstButton}>
            <Button variant="contained" type="button">
              {firstButton}
            </Button>
          </Link>
          <Link
            onClick={onClickSecondButton}
            to={secondButton === 'Change order type' ? '#' : secondButtonLink}>
            <Button variant="text" type="button">
              {secondButton}
            </Button>
          </Link>
          {path.includes(PATHS.ORDER_PAYMENT) && (
            <Link to={PATHS.ORDER_CONFIRMATION}>
              <Button variant="text" type="button">
                Back to confirmation
              </Button>
            </Link>
          )}
        </div>
      </SummaryPayment>
    </div>
  );
};

export default CheckoutSummary;
