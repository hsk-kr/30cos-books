import React from 'react';
import styled from 'styled-components';

export type VariantType = 'outlined' | 'contained';

export type ColorType = 'primary' | 'secondary' | 'tertiary';

export type SizeType = 'sm' | 'md';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: VariantType;
  color?: ColorType;
  size?: SizeType;
  /**
   * If you set width, default styles padding-left, padding-right would be ignored
   */
  width?: 'string' | number;
}

export const Button = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))<ButtonProps>`
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.25s;

  &:not(:disabled):hover {
    opacity: 0.6;
  }

  ${({ theme, size = 'md' }) => {
    if (size === 'sm') {
      return `
        ${theme.font.captionMedium}
        padding: 5px 10px;
      `;
    } else if (size === 'md') {
      return `
          ${theme.font.bodyMedium}
          padding: 12px 28px;
        `;
    }
  }}

  ${({ width }) =>
    width &&
    `
    padding-left: 0px;
    padding-right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${typeof width === 'string' ? width : `${width}px`};
  `}

  ${({ theme, variant = 'contained', color = 'primary' }) => {
    if (variant === 'contained') {
      return `
        background-color: ${theme.colors[color].main};
        color: ${theme.colors[color].contrast};
      `;
    } else if (variant === 'outlined') {
      return `
        border: 1px solid ${theme.colors[color].main};
        color: ${theme.colors[color].main};
        background-color: ${theme.colors[color].contrast};
      `;
    }
  }}
`;
