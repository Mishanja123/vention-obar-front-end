import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchInput.module.css';

function SearchInput() {
  return (
    <TextField
      type="search"
      label="Search..."
      className={styles.search}
      InputProps={{
        endAdornment: <SearchIcon />,
      }}
    />
  );
}

<<<<<<< Updated upstream
=======
const SearchInput: React.FC = () => {
  const [matchedDishes, setMatchedDishes] = useState<Dish[]>([]);
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
        const response = await axiosInstance.post<{ dishes: Dish[] }>(
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
        navigate(`/menu/:id${selectedDish.id}`);
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

>>>>>>> Stashed changes
export default SearchInput;
