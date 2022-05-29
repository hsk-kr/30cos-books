import { useMemo } from 'react';
import styled from 'styled-components';
import { BookCard, BookCardProps } from '../BookCard';

export type { BookCardProps };

interface BookSearchResultListProps {
  items?: BookCardProps[];
}

export const BookSearchResultList = ({
  items = [],
}: BookSearchResultListProps) => {
  const bookElements = useMemo(() => {
    return items.map(
      (item, itemIdx) => <BookCard key={itemIdx} {...item} />,
      []
    );
  }, [items]);

  return <List>{bookElements}</List>;
};

const List = styled.div`
  width: 100%;

  > div {
    padding-left: 48px;
    padding-right: 16px;
    border-bottom: 1px solid #d2d6da;
  }
`;
