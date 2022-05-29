import React, { useState, useMemo, useEffect } from 'react';
import { SearchPageTemplate } from '../templates/SearchPageTemplate';
import { SearchResultCountLabel } from '../molecules/SearchResultCountLabel';
import { Pagination } from '../molecules/Pagination';
import { MessageWithBookIcon } from '../molecules/MessageWithBookIcon';
import {
  BookSearchResultList,
  BookCardProps,
} from '../organisms/BookSearchResultList';
import { SearchField } from '../organisms/SearchField';
import {
  DetailSearchForm,
  useDetailSearchForm,
  TITLE,
  AUTHOR,
  PUBLISHER,
} from '../organisms/DetailSearchForm';
import { useBooks, DetailSearchParams } from '../../hooks/useBooks';
import { usePagination } from '../../hooks/usePagination';

export const SearchPage = () => {
  const [detailSearchFormVisible, setDetailSearchFormVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [searchWord, setSearchWord] = useState('');
  const [selectedBookIndex, setSelectedBookIndex] = useState(-1);

  const {
    searchOptionDropdownList,
    searchOptions,
    addDisabled: searchOptionAddDisabled,
    handleReset,
    handleSearchOptionAdd,
  } = useDetailSearchForm();

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

  const toggleDetailForm = () => {
    setDetailSearchFormVisible((visible) => !visible);
  };

  const handleDetailSearch = () => {
    const params: DetailSearchParams = {
      page: 1,
    };

    // make books api params
    for (const option of searchOptions) {
      const value = option.value?.trim();
      if (!value?.length) continue;

      switch (option.selectedItemIndex) {
        case TITLE:
          params.d_titl = value;
          break;
        case AUTHOR:
          params.d_auth = value;
          break;
        case PUBLISHER:
          params.d_publ = value;
          break;
      }
    }

    // if use doesn't enter any input values
    if (Object.keys(params).length < 2) {
      alert('검색어를 입력해주세요.');
      return;
    }

    fetchBooks(params);
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
          onDetailSearch={toggleDetailForm}
          detailSearchForm={
            detailSearchFormVisible && (
              <DetailSearchForm
                addDisabled={searchOptionAddDisabled}
                items={searchOptionDropdownList}
                options={searchOptions}
                onClose={toggleDetailForm}
                onReset={handleReset}
                onSearch={handleDetailSearch}
                onSearchOptionAdd={handleSearchOptionAdd}
              />
            )
          }
        />
      }
      searchResultText={
        <SearchResultCountLabel label="도서 검색 결과" total={total} />
      }
      searchResultContent={
        !bookList.length ? (
          <MessageWithBookIcon message="검색된 결과가 없습니다" mt={64} />
        ) : (
          <BookSearchResultList items={bookList} />
        )
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
