import styles from './Pagination.module.css';

interface PaginationProps {
  postsPerPage: number;
  totalPosts: number;
  paginate: (number: number) => void;
  currentPage: number;
}

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.page_item}>
            <button
              onClick={() => paginate(number)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Spacebar') {
                  paginate(number);
                }
              }}
              className={`${styles.page_link} ${
                number === currentPage ? styles.active : ''
              }`}
              tabIndex={0}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
