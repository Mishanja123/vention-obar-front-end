import { useParams } from 'react-router-dom';

const MenuItemInfo = () => {
  const { id } = useParams();
  console.log(id);
  return <div>MenuItemInfo</div>;
};

export default MenuItemInfo;
