import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import axiosInstance from '@/services/restaurantAPI';

import styles from './SearchInput.module.css';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { IDish } from '@/types/dish';
import axiosInstance from '@/services/restaurantAPI';
import Autocomplete from '@mui/material/Autocomplete';

<<<<<<< HEAD
interface Dish {
  id: string;
  title: string;
  // Add other properties as needed
}

=======
>>>>>>> b41b753 (ob108:fix-fixed all errors and configured dockerfile to build suitable for aws image)
const SearchInput: React.FC = () => {
  const [matchedDishes, setMatchedDishes] = useState<IDish[]>([]);
  const navigate = useNavigate();
  let filteredTimeout: NodeJS.Timeout | null = null;

  const doDishMatch = async (query: string) => {
    if (filteredTimeout) {
      clearTimeout(filteredTimeout);
    }

    if (!query) {
      setMatchedDishes([]);
      return;
    }

    filteredTimeout = setTimeout(async () => {
      try {
        const response = await axiosInstance.post<{ dishes: IDish[] }>(
          '/matched-dishes',
          {
            title: query,
          },
        );
        setMatchedDishes(response.data.dishes);
      } catch (error) {
        console.error(error);
      }
    }, 1);
  };

  const navigateToDish = (value: string | null) => {
    if (value) {
      const selectedDish = matchedDishes.find((dish) => dish.title === value);
      if (selectedDish) {
        navigate(`/menu/${selectedDish.id}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        freeSolo
        options={matchedDishes.map((dish) => dish.title)}
        //@ts-ignore
        onChange={(event, value) => navigateToDish(value)}
        className={styles.searchContainer}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            color="success"
            focused
            className={styles.searchBar}
            label="Search across all dishes..."
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              doDishMatch(e.target.value)
            }
            InputProps={{
              style: { color: '#fff', fontSize: '0.9rem' },
              ...params.InputProps,
            }}
          />
        )}
      />
      <SearchIcon sx={{ fontSize: '2rem' }} color="success" />
    </div>
  );
};

export default SearchInput;
