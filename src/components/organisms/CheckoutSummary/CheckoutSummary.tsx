import { SummaryPayment } from '@/components/molecules';
import { Button } from '@/components/atoms';

import styles from './CheckoutSummary.module.css';
import { PATHS } from '@/constants/paths';

const CheckoutSummary = ({ path }: { path: string }) => {
  const firstButton = path.includes(PATHS.ORDER_CONFIRMATION)
    ? 'Confirm'
    : path.includes(PATHS.ORDER_PAYMENT)
      ? 'Pay  $ 200 online'
      : 'Procced';

  const secondButton = path.includes(PATHS.ORDER_CONFIRMATION)
    ? 'Change order type'
    : path.includes(`${PATHS.ORDER_PAYMENT}`)
      ? 'I’ll pay on the spot'
      : 'Cancel';

  return (
    <div className={styles.summary_section}>
      <SummaryPayment quantity={20} subtotal={50} total={500}>
        <div className={styles.summary_btn_wrapper}>
          <Button variant="contained" type="button">
            {firstButton}
          </Button>
          <Button variant="text" type="button">
            {secondButton}
          </Button>

          {path.includes(PATHS.ORDER_PAYMENT) && (
            <Button variant="text" type="button">
              Back to confirmation
            </Button>
          )}
        </div>
      </SummaryPayment>
    </div>
  );
};
export default CheckoutSummary;
