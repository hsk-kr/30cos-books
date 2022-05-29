import React, { useState, useMemo, useEffect } from 'react';
import { SearchPageTemplate } from '../templates/SearchPageTemplate';
import {
  BookSearchResultList,
  BookCardProps,
} from '../organisms/BookSearchResultList';
import { SearchField } from '../organisms/SearchField';
import { SearchResultCountLabel } from '../molecules/SearchResultCountLabel';
import { Pagination } from '../molecules/Pagination';
import { useBooks } from '../../hooks/useBooks';
import { usePagination } from '../../hooks/usePagination';

export const SearchPage = () => {
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);

  const {
    page,
    setPage,
    handlePageChange,
    handlePrevPage,
    handleNextPage,
    prevActive,
    nextActive,
    startPage,
    endPage,
  } = usePagination({
    total,
  });

  const {
    useQueryResult: { data },
    dispatch: fetchBooks,
  } = useBooks();

  const handleSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  // fetch when click the search button
  const handleSearch = () => {
    if (!searchWord.length) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setPage(1);
    fetchBooks({
      query: searchWord,
      page: 1,
    });
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    setSelectedBookIndex(-1);
    setTotal(data.total);
    setBooks(
      data.items.map(
        (
          { title, image, author, description, price, discount, link },
          itemIndex
        ) => ({
          title,
          image,
          author,
          description,
          price: price ? Number(price) : undefined,
          discount: discount ? Number(discount) : undefined,
          onPurchase: () => {
            const newTab = window.open(link);
            newTab?.focus();
          },
          onToggle: () => {
            setSelectedBookIndex((index) =>
              index === itemIndex ? -1 : itemIndex
            );
          },
        })
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const bookList = useMemo(() => {
    return books.map((book, bookIndex) => ({
      ...book,
      folded: !(selectedBookIndex === bookIndex),
    }));
  }, [books, selectedBookIndex]);

  // fetch when page is changed
  useEffect(() => {
    if (page === -1) return;
    fetchBooks(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <SearchPageTemplate
      searchField={
        <SearchField
          value={searchWord}
          onChange={handleSearchWord}
          onSearch={handleSearch}
        />
      }
      searchResultText={
        <SearchResultCountLabel label="도서 검색 결과" total={total} />
      }
      searchResultContent={
        !bookList.length ? null : <BookSearchResultList items={bookList} />
      }
      pagination={
        !bookList.length ? null : (
          <Pagination
            startPage={startPage}
            endPage={endPage}
            currentPage={page}
            onPage={handlePageChange}
            onPrev={handlePrevPage}
            onNext={handleNextPage}
            prevActive={prevActive}
            nextActive={nextActive}
          />
        )
      }
    />
  );
};
