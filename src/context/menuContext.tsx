import React, { createContext, useState, useEffect, useContext } from 'react';
import { IDish } from '@/types/dish';
import { DISHCATEGORY } from '@/constants/categoryDish';

interface MenuContextProps {
  category: DISHCATEGORY;
  items: IDish[];
  setCategory: (category: DISHCATEGORY) => void;
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);

export const useMenuContext = () => useContext(MenuContext);
export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<DISHCATEGORY>(
    DISHCATEGORY.BAR_BLISS,
  );
  const [allItems, setAllItems] = useState<IDish[]>([]);
  const [filteredItems, setFilteredItems] = useState<IDish[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, _] = useState<number>(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/dishes');
        const { dishes } = await response.json();
        setAllItems(dishes);
        setFilteredItems(dishes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredItems(allItems.filter((item) => item.category === category));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredItems.slice(indexOfFirstPost, indexOfLastPost);
  let totalPosts = filteredItems.length;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <MenuContext.Provider
      value={{
        category,
        items: currentPosts,
        setCategory,
        postsPerPage,
        totalPosts,
        paginate,
        currentPage,
      }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
