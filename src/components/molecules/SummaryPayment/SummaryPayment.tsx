import { ReactNode } from 'react';

import styles from './SummaryPayment.module.css';

type SummaryPaymentProp = {
  quantity: number;
  subtotal: number;
  total: number;
  children: ReactNode;
};

const SummaryPayment = ({
  quantity,
  subtotal,
  total,
  children,
}: SummaryPaymentProp) => {
  return (
    <div className={styles.summary_section}>
      <h3 className={styles.summary_title}>Summary</h3>
      <ul className={styles.summary_list}>
        <li className={styles.summary_item}>
          <p>Quantity:</p>
          <span className={styles.summary_item_accent}>{quantity}</span>
        </li>
        <li className={styles.summary_item}>
          <p>Subtotal:</p>
          <span className={styles.summary_item_accent}>
            {subtotal?.toFixed(2)}
          </span>
        </li>
        <li className={styles.summary_total}>
          <p>Total:</p>
          <span className={styles.summary_item_accent}>
            {total?.toFixed(2)}
          </span>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default SummaryPayment;
