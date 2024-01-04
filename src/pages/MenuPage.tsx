import { MenuProvider } from '@/context/menuContext';
import MenuSection from '../components/organisms/MenuSection/MenuSection';

const MenuPage = () => {
  return (
    <MenuProvider>
      <MenuSection />
    </MenuProvider>
  );
};

export default MenuPage;
