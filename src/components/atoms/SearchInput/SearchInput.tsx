import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchInput.module.css';

const SearchInput = () => {
    return <TextField
        type={"search"}
        label={'Search...'}
        className={styles.search}
        InputProps={{
            endAdornment:
                <SearchIcon/>
        }}
    />
}

export default SearchInput;