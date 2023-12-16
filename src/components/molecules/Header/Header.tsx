import {SiIfood} from 'react-icons/si';
import {PiShoppingCartLight} from 'react-icons/pi';
import {GoPerson} from 'react-icons/go';
import {IconContext} from 'react-icons';
import styles from './Header.module.css'
import {SearchInput} from '../../atoms/SearchInput/SearchInput';

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <a href={'/main'} className={styles.logoWrapper}>
                OBar
                <IconContext.Provider value={{className: styles.logo}}>
                    <SiIfood/>
                </IconContext.Provider>
            </a>
            <SearchInput/>
            <a href={'/menu'} className={styles.menu}>Menu</a>
            <a href={'/cart'} className={styles.reserveTable}>Reserve a table</a>
            <a href={'/orders'} className={styles.orders}>Orders</a>
            <IconContext.Provider value={{className: styles.cart}}>
                <a href={'/cart'}><PiShoppingCartLight/></a>
            </IconContext.Provider>
            <IconContext.Provider value={{className: styles.profile}}>
                <a href={'/profile'}><GoPerson/></a>
            </IconContext.Provider>
        </div>
    )
}

export default Header;