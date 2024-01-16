import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './AccountPageSection.module.css';
import { PATHS } from '@/constants/paths';
import { useEffect } from 'react';

const AccountPageSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === PATHS.ACCOUNT) {
      navigate(PATHS.USER_INFO);
    }
  }, [location.pathname, navigate]);

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    backgroundColor: isActive ? '#182715' : '',
    color: isActive ? '#daa520' : '',
  });

  return (
    <section className={styles.account_section}>
      <ul className={styles.account_list}>
        <li className={styles.account_item}>
          <NavLink to={PATHS.USER_INFO} style={navLinkStyle}>
            Personal Data
          </NavLink>
        </li>
        <li className={styles.account_item}>
          <NavLink to={PATHS.DELIVERY_ADDRESS} style={navLinkStyle}>
            Delivery address
          </NavLink>
        </li>
        <li className={styles.account_item}>
          <NavLink to={PATHS.PAYMENT} style={navLinkStyle}>
            Payments
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </section>
  );
};

export default AccountPageSection;
