import styled from 'styled-components';

interface FlexProps {
  flex?: number;
  direction?: 'column' | 'row';
  columnGap?: number;
  rowGap?: number;
  mb?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({
    flex,
    columnGap,
    direction,
    rowGap,
    mb,
    alignItems,
    justifyContent,
  }) => {
    return `
      ${flex ? `flex: ${flex};` : ''}
      ${columnGap ? `column-gap: ${columnGap}px;` : ''}
      ${rowGap ? `row-gap: ${rowGap}px;` : ''}
      ${direction ? `flex-direction: ${direction};` : ''}
      ${mb ? `margin-bottom: ${mb}px;` : ''}
      ${alignItems ? `align-items: ${alignItems};` : ''}
      ${justifyContent ? `justify-content: ${justifyContent};` : ''}
    `;
  }}
`;
