import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import DownArrow from '../../../res/down_arrow.svg';

export interface Item {
  visible?: boolean;
  value?: string;
}

interface SelectProps {
  width?: string | number;
  selectedItemIndex?: number;
  items?: Item[];
  onChange?: (index: number) => void;
}

export const Select = ({
  width = 100,
  selectedItemIndex = -1,
  items = [],
  onChange,
}: SelectProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const selectedItemName =
    selectedItemIndex !== -1 ? items[selectedItemIndex].value : '';

  const dropdownItems = useMemo(() => {
    return items.map((item, itemIdx) => (
      <DropdownItem
        key={item.value}
        visible={item.visible || false}
        onChange={() => onChange && onChange(itemIdx)}
      >
        {item.value}
      </DropdownItem>
    ));
  }, [items, onChange]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownVisible(false);
    };

    window.addEventListener('click', closeDropdown);

    return () => {
      window.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <Wrapper role="combobox" onClick={handleToggle} width={width}>
      <SelectedItemText>{selectedItemName}</SelectedItemText>
      <Icon alt="down_arrow" src={DownArrow} />
      {dropdownVisible && dropdownItems.length > 0 && (
        <Dropdown data-testid="dropdown">{dropdownItems}</Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  width: string | number;
}>`
  position: relative;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: 36px;
  border-bottom: 1px solid #d2d6da;
`;

const SelectedItemText = styled.span`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  padding-left: 8px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  transition: opacity 0.25s;

  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const Icon = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
`;

const Dropdown = styled.ul`
  z-index: 1;
  background-color: white;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 110%;

  ${({ theme }) => `
    color: ${theme.colors.text.caption};
    ${theme.font.captionMedium}
  `};

  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const DropdownItem = styled.li<{
  visible: boolean;
}>`
  display: flex;
  padding: 4px 8px;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  cursor: pointer;

  transitio: opacity: 0.25s;
  &:hover {
    opacity: 0.6;
  }

  ${({ visible }) => !visible && `display: none;`}
`;
