import React from 'react';
import styled from 'styled-components';

export interface TextFieldProps
  extends React.ComponentPropsWithoutRef<'input'> {
  width?: string | number;
}

export const TextField = styled.input.attrs((props) => ({
  type: props.type || 'text',
}))<TextFieldProps>`
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  height: 36px;
  background-color: white;

  ${({ theme, width = 176 }) => `
    border-bottom: 1px solid ${theme.colors.primary.main};
    color: ${theme.colors.common.black};
    width: ${typeof width === 'string' ? width : `${width}px`};
    ${theme.font.captionMedium}
  `}

  &::placeholder {
    ${({ theme }) => `
      color: ${theme.colors.text.caption};
      ${theme.font.captionMedium}
    `}
  }
`;
