import { SummaryPayment } from '@/components/molecules';
import { Button } from '@/components/atoms';

import styles from './CheckoutSummary.module.css';
import { PATHS } from '@/constants/paths';
import { Link } from 'react-router-dom';
import useSummaryButton from '@/hooks/useSummaryButton';
import { useCheckoutContext } from '@/context/checkoutContext';

const CheckoutSummary = ({ path }: { path: string }) => {
  const {
    firstButton,
    secondButton,
    firstButtonLink,
    secondButtonLink,
    onClick,
  } = useSummaryButton({ path });
  const { handlePaymentOrder } = useCheckoutContext();
  return (
    <div className={styles.summary_section}>
      <SummaryPayment quantity={20} subtotal={50} total={500}>
        <div className={styles.summary_btn_wrapper}>
          <Link
            to={firstButtonLink}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              onClick();
              handlePaymentOrder('online');
            }}>
            <Button variant="contained" type="button">
              {firstButton}
            </Button>
          </Link>
          <Link
            to={secondButtonLink}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              onClick();
              handlePaymentOrder('offline');
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
