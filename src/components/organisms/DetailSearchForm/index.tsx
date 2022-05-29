import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Flex } from '../../atoms/Flex';
import { Button } from '../../atoms/Button';
import { TextField } from '../../atoms/TextField';
import { Select, Item as SelectItem } from '../../atoms/Select';
import { RemoveButton } from '../../molecules/RemoveButton';
import CloseIcon from '../../../res/close_icon.svg';

interface DetailSearchFormProps {
  addDisabled?: boolean;
  onClose?: VoidFunction;
  onReset?: VoidFunction;
  onSearchOptionAdd?: VoidFunction;
  onSearch?: VoidFunction;
  items?: SelectItem[];
  options?: Omit<SearchOptionProps, 'items'>[];
}

interface SearchOptionProps {
  items?: SelectItem[];
  selectedItemIndex?: number;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onTypeChange?: (index: number) => void;
  onRemove?: VoidFunction;
  removeDisabled?: boolean;
}

export const TITLE = 0;
export const AUTHOR = 1;
export const PUBLISHER = 2;

export const DetailSearchForm = ({
  addDisabled,
  onClose,
  items = [],
  options = [],
  onReset,
  onSearchOptionAdd,
  onSearch,
}: DetailSearchFormProps) => {
  const optionElements = useMemo(() => {
    return options.map((option) => (
      <SearchOption key={option.selectedItemIndex} items={items} {...option} />
    ));
  }, [items, options]);

  return (
    <Form>
      <CloseButton alt="close" src={CloseIcon} onClick={onClose} />
      <Flex direction="column" rowGap={8}>
        {optionElements}
        {!addDisabled && (
          <Flex justifyContent="flex-end">
            <AppendOptionButton
              onClick={onSearchOptionAdd}
              data-testid="addSearchOptionButton"
            >
              +&nbsp; 검색 조건 추가
            </AppendOptionButton>
          </Flex>
        )}
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
  onTypeChange,
}: SearchOptionProps) => {
  return (
    <Flex columnGap={8} alignItems="center" data-testid="searchOption">
      <Select
        items={items}
        selectedItemIndex={selectedItemIndex}
        onChange={onTypeChange}
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

interface SearchOptionState {
  selectedItemIndex: number;
  value: string;
}

const searchOptionTypes = ['제목', '저자명', '출판사'];

const initialSearchState = (): SearchOptionState[] => [
  {
    selectedItemIndex: 0,
    value: '',
  },
];

export const useDetailSearchForm = () => {
  const [searchOptionState, setSearchOptionState] = useState<
    SearchOptionState[]
  >(initialSearchState());

  const handleSearchOptionValue = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptionState((state) => {
        const newState = [...state];
        newState[index].value = e.target.value;

        return newState;
      });
    },
    []
  );

  const handleSearchTypeChange = useCallback(
    (stateIndex: number) => (typeIndex: number) => {
      setSearchOptionState((state) => {
        const newState = [...state];
        newState[stateIndex].selectedItemIndex = typeIndex;

        return newState;
      });
    },
    []
  );

  const handleSearchOptionRemove = useCallback(
    (index: number) => () => {
      setSearchOptionState((state) => {
        const newState = [...state];
        newState.splice(index, 1);
        return newState;
      });
    },
    []
  );

  const handleReset = useCallback(() => {
    setSearchOptionState(initialSearchState());
  }, []);

  const handleSearchOptionAdd = useCallback(() => {
    setSearchOptionState((prevState) => {
      // Find unselected item index
      const availableIndex = searchOptionTypes.findIndex(
        (_, oIdx) => !prevState.find((s) => s.selectedItemIndex === oIdx)
      );

      return [
        ...prevState,
        {
          selectedItemIndex: availableIndex,
          value: '',
        },
      ];
    });
  }, []);

  const searchOptions = useMemo<Omit<SearchOptionProps, 'items'>[]>(() => {
    return searchOptionState.map((state, index) => ({
      ...state,
      onChange: handleSearchOptionValue(index),
      onTypeChange: handleSearchTypeChange(index),
      onRemove: handleSearchOptionRemove(index),
      removeDisabled: index === 0,
    }));
  }, [
    handleSearchOptionRemove,
    handleSearchOptionValue,
    handleSearchTypeChange,
    searchOptionState,
  ]);

  // remove selected search options
  const searchOptionDropdownList = useMemo(() => {
    return searchOptionTypes.map((o, idx) => ({
      value: o,
      visible: !searchOptionState.find((o) => o.selectedItemIndex === idx),
    }));
  }, [searchOptionState]);

  return {
    searchOptionDropdownList,
    searchOptions,
    addDisabled: searchOptionState.length >= 3,
    handleReset,
    handleSearchOptionAdd,
  };
};
