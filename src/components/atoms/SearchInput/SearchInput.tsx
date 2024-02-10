import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import axiosInstance from '@/services/restaurantAPI';
import { IDish } from '@/types/dish';

import styles from './SearchInput.module.css';

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
        //@ts-expect-error fo now
        onChange={(event, value) => navigateToDish(value)}
        className={styles.search_container}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            color="success"
            focused
            className={styles.search_bar}
            label="Searc dish"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              doDishMatch(e.target.value)
            }
            InputProps={{
              style: { color: '#f1e9d9', fontSize: '0.9rem' },
              ...params.InputProps,
            }}
          />
        )}
      />
    </div>
  );
};

export default SearchInput;
