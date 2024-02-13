import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import { PATHS } from '@/constants/paths';

import styles from './AccountPageSection.module.css';

const AccountPageSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (location.pathname === PATHS.ACCOUNT) {
      navigate(PATHS.USER_INFO);
    }
  }, [location.pathname, navigate]);

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    backgroundColor: isActive ? '#182715' : '',
    color: isActive ? '#daa520' : '',
  });

  setTimeout(() => {
    setIsLoading(false);
  }, 500);

  return (
    <section className={styles.account_section}>
      {isLoading ? (
        <div className={styles.skeleton_container}>
          <div className={styles.account_navigation}>
            <Skeleton
              animation="wave"
              variant="rounded"
              width={210}
              className={styles.skeleton_navigation_tab}
              height={80}
            />
            <Skeleton
              animation="wave"
              className={styles.skeleton_navigation_tab}
              variant="rounded"
              width={210}
              height={80}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              className={styles.skeleton_navigation_tab}
              width={210}
              height={80}
            />
          </div>
          <div className={styles.user_profilePhoto}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={150}
              height={150}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={150}
              height={50}
            />
          </div>
          <div className={styles.user_profile_form}>
            <Skeleton
              animation="wave"
              variant="rounded"
              className={styles.skeleton_profile_form}
              width={300}
              height={400}
            />
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

export default AccountPageSection;
