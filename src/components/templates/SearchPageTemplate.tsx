import React from 'react';
import styled from 'styled-components';

interface SearchPageTemplateProps {
  searchField?: React.ReactNode;
  searchResultText?: React.ReactNode;
  searchResultContent?: React.ReactNode;
  pagination?: React.ReactNode;
}

export const SearchPageTemplate = ({
  searchField,
  searchResultText,
  searchResultContent,
  pagination,
}: SearchPageTemplateProps) => {
  return (
    <Container>
      <SearchField>{searchField}</SearchField>
      <SearchResultText>{searchResultText}</SearchResultText>
      <SearchResultContent>{searchResultContent}</SearchResultContent>
      <Pagination>{pagination}</Pagination>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
`;

const SearchField = styled.div`
  margin-bottom: 32px;
`;

const SearchResultText = styled.div`
  margin-bottom: 40px;
`;

const SearchResultContent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 56px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
`;
