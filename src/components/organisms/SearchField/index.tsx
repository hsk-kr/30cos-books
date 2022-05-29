import styled from 'styled-components';
import { Flex } from '../../atoms/Flex';
import { Button } from '../../atoms/Button';
import { SearchInputField } from '../../molecules/SearchInputField';

interface SearchFieldProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: VoidFunction;
  onDetailSearch?: VoidFunction;
  detailSearchForm?: React.ReactNode;
}

export const SearchField = ({
  value,
  onChange,
  onSearch,
  onDetailSearch,
  detailSearchForm,
}: SearchFieldProps) => {
  return (
    <Flex direction="column" rowGap={16}>
      <div>
        <ResultText data-testid="resultText">도서 검색</ResultText>
      </div>
      <Flex columnGap={16} alignItems="center">
        <SearchInputFieldEnhance
          value={value}
          onChange={onChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') onSearch && onSearch();
          }}
          placeholder="검색어를 입력"
          data-testid="searchInput"
        />
        <SearchButtonWrapper alignItems="center">
          <Button
            variant="outlined"
            size="sm"
            color="tertiary"
            data-testid="detailButton"
            onClick={onDetailSearch}
          >
            상세검색
          </Button>
          {detailSearchForm && (
            <DetailSearchForm data-testid="detailSearchForm">
              {detailSearchForm}
            </DetailSearchForm>
          )}
        </SearchButtonWrapper>
      </Flex>
    </Flex>
  );
};

const SearchInputFieldEnhance = styled(SearchInputField)`
  width: 480px;
`;

const SearchButtonWrapper = styled(Flex)`
  position: relative;
`;

const DetailSearchForm = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 110%;
  opacity: 1;
`;

const ResultText = styled.h2`
  ${({ theme }) => `
    color: ${theme.colors.text.title};
    ${theme.font.h2}
  `}
`;
