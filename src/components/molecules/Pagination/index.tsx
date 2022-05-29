import { useMemo } from 'react';
import styled from 'styled-components';
import { Flex } from '../../atoms/Flex';

import LeftArrowIcon from '../../../res/left_arrow.svg';

interface PaginationProps {
  startPage: number;
  endPage: number;
  currentPage: number;
  onPage?: (page: number) => void;
  prevActive?: boolean;
  onPrev?: VoidFunction;
  nextActive?: boolean;
  onNext?: VoidFunction;
}

export const Pagination = ({
  startPage,
  endPage,
  currentPage,
  onPage,
  onPrev,
  prevActive = false,
  onNext,
  nextActive = false,
}: PaginationProps) => {
  const pageElements = useMemo(() => {
    const elements: React.ReactNode[] = [];

    for (let p = startPage; p <= endPage; p++) {
      elements.push(
        <Page
          key={p}
          active={currentPage === p}
          onClick={() => onPage && onPage(p)}
        >
          {p}
        </Page>
      );
    }

    return elements;
  }, [startPage, endPage, currentPage, onPage]);

  return (
    <Flex columnGap={8}>
      {prevActive && (
        <Page data-testid="previousButton">
          <img
            alt="move to previous page"
            src={LeftArrowIcon}
            onClick={onPrev}
          />
        </Page>
      )}
      {pageElements}
      {nextActive && (
        <NextPage data-testid="nextButton">
          <img alt="move to next page" src={LeftArrowIcon} onClick={onNext} />
        </NextPage>
      )}
    </Flex>
  );
};

const Page = styled.div<{
  active?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid #dadada;
  border-radius: 4px;
  background-color: white;

  transition: opacity 0.25s;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }

  ${({ theme }) => `
    ${theme.font.captionMedium}
    color: ${theme.colors.text.caption};
  `};

  ${({ active, theme }) =>
    active && `background-color: ${theme.colors.primary.main}; color: white;`}
  }
`;

const NextPage = styled(Page)`
  transform: rotate(180deg);
`;
