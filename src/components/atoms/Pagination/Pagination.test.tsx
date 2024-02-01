import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('pagination tests', () => {
  it('should render a navigation bar with page numbers', () => {
    const postsPerPage = 10;
    const totalPosts = 50;
    const paginate = jest.fn();
    const currentPage = 1;

    const { getAllByRole } = render(
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('should highlight the current page number', () => {
    const postsPerPage = 10;
    const totalPosts = 50;
    const paginate = jest.fn();
    const currentPage = 3;

    const { getByText } = render(
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const activeButton = getByText(currentPage.toString());
    expect(activeButton).toHaveClass('page_link');
  });

  it('should call the paginate function when a page number button is clicked', () => {
    const postsPerPage = 10;
    const totalPosts = 50;
    const paginate = jest.fn();
    const currentPage = 1;

    const { getAllByRole } = render(
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const buttons = getAllByRole('button');
    fireEvent.click(buttons[2]);
    expect(paginate).toHaveBeenCalledWith(3);
  });

  it('should render an empty navigation bar when totalPosts is 0', () => {
    const postsPerPage = 10;
    const totalPosts = 0;
    const paginate = jest.fn();
    const currentPage = 1;

    const { queryByRole } = render(
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const buttons = queryByRole('button');
    expect(buttons).toBeNull();
  });

  it('should render a navigation bar with only one page number button when totalPosts is less than postsPerPage', () => {
    const postsPerPage = 10;
    const totalPosts = 5;
    const paginate = jest.fn();
    const currentPage = 1;

    const { getAllByRole } = render(
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('should set currentPage to the last page number when currentPage is greater than the total number of pages', () => {
    const postsPerPage = 10;
    const totalPosts = 50;
    const paginate = jest.fn();
    const currentPage = 6;

    const { getByText } = render(
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        currentPage={currentPage}
      />,
    );

    const activeButton = getByText('5');
    expect(activeButton).toHaveClass('page_link');
  });
});
