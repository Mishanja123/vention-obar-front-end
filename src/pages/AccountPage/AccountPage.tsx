import { NavLink, Outlet } from "react-router-dom";
import styles from "./AccountPage.module.css";
import { PATHS } from "../../constants/paths";

const AccountPage = () => {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? "700" : "400",
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

export default AccountPage;
