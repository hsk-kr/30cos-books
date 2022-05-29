import { useMemo } from 'react';
import styled from 'styled-components';
import { Flex } from '../../atoms/Flex';
import { Button } from '../../atoms/Button';
import { TextField } from '../../atoms/TextField';
import { Select, Item as SelectItem } from '../../atoms/Select';
import { RemoveButton } from '../../molecules/RemoveButton';
import CloseIcon from '../../../res/close_icon.svg';

interface DetailSearchFormProps {
  onClose?: VoidFunction;
  onReset?: VoidFunction;
  onAddSearchOption?: VoidFunction;
  onSearch?: VoidFunction;
  items?: SelectItem[];
  options?: Omit<SearchOptionProps, 'items'>[];
}

interface SearchOptionProps {
  items?: SelectItem[];
  selectedItemIndex?: number;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onRemove?: VoidFunction;
  removeDisabled?: boolean;
}

export const DetailSearchForm = ({
  onClose,
  items = [],
  options = [],
  onReset,
  onAddSearchOption,
  onSearch,
}: DetailSearchFormProps) => {
  const optionElements = useMemo(() => {
    return options.map((option, optionIdx) => (
      <SearchOption key={option.selectedItemIndex} items={items} {...option} />
    ));
  }, [items, options]);

  return (
    <Form>
      <CloseButton alt="close" src={CloseIcon} onClick={onClose} />
      <Flex direction="column" rowGap={8}>
        {optionElements}
        <Flex justifyContent="flex-end">
          <AppendOptionButton
            onClick={onAddSearchOption}
            data-testid="addSearchOptionButton"
          >
            +&nbsp; 검색 조건 추가
          </AppendOptionButton>
        </Flex>
      </Flex>
      <Flex columnGap={8} justifyContent="center">
        <Button
          size="sm"
          color="secondary"
          onClick={onReset}
          data-testid="resetButton"
        >
          초기화
        </Button>
        <Button size="sm" onClick={onSearch} data-testid="searchButton">
          검색하기
        </Button>
      </Flex>
    </Form>
  );
};

const SearchOption = ({
  items,
  selectedItemIndex = -1,
  value,
  onChange,
  onRemove,
  removeDisabled,
}: SearchOptionProps) => {
  return (
    <Flex columnGap={8} alignItems="center" data-testid="searchOption">
      <Select
        items={items}
        selectedItemIndex={selectedItemIndex}
        data-testid="select"
      />
      <TextField value={value} onChange={onChange} placeholder="검색어 입력" />
      {removeDisabled ? (
        <EmptyButtonSpace data-testid="removeButton" />
      ) : (
        <RemoveButton onClick={onRemove} data-testid="removeButton" />
      )}
    </Flex>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  position: relative;
  width: 360px;
  box-sizing: border-box;
  padding: 24px;
  padding-top: 38px;
  background: #ffffff;
  box-shadow: 0px 4px 14px 6px rgba(151, 151, 151, 0.15);
  border-radius: 8px;
`;

const EmptyButtonSpace = styled(RemoveButton)`
  visibility: hidden;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;

  transition: opacity 0.25s;
  &:hover {
    opacity: 0.6;
  }
`;

const AppendOptionButton = styled(Button)`
  border-radius: 4px;
  width: 176px;
  padding-top: 6px;
  padding-bottom: 6px;
  margin-right: 32px;

  ${({ theme }) => `
    color: ${theme.colors.common.blue};
    background-color: ${theme.colors.common.lightBlue};
    ${theme.font.captionMedium}
  `}
`;
