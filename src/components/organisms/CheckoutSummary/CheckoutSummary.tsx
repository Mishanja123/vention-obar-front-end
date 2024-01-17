import { SummaryPayment } from '@/components/molecules';
import { Button } from '@/components/atoms';

import styles from './CheckoutSummary.module.css';
import { PATHS } from '@/constants/paths';
import { Link } from 'react-router-dom';
import useSummaryButton from '@/hooks/useSummaryButton';
import { useCheckoutContext } from '@/context/checkoutContext';
import { useCartContext } from '@/context/cartContext';

const CheckoutSummary = ({ path }: { path: string }) => {
  const {
    firstButton,
    secondButton,
    firstButtonLink,
    secondButtonLink,
    onClick,
    disabled,
  } = useSummaryButton({ path });
  const { handlePaymentOrder, orderData, handleDeleteOrder } =
    useCheckoutContext();
  console.log('🚀 : paymentCardExist', disabled);

  const { cartItems, allDishesQuantity } = useCartContext();

  const forbidProceeing =
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
            className={forbidProceeing || !disabled ? styles.inactive : ''}
            to={firstButtonLink}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              onClick();
              if (firstButton === 'Pay $200 online') {
                handlePaymentOrder('online');
              }
            }}>
            <Button variant="contained" type="button">
              {firstButton}
            </Button>
          </Link>
          <Link
            className={!disabled ? styles.inactive : ''}
            to={secondButtonLink}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              onClick();
              if (secondButton === 'I’ll pay on the spot') {
                handlePaymentOrder('offline');
              }
              if (secondButton === 'Change order type') {
                handleDeleteOrder();
              }
            }}>
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
