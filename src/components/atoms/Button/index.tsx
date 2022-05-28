import React from 'react';
import styled from 'styled-components';

export type VariantType = 'outlined' | 'contained';

export type ColorType = 'primary' | 'secondary' | 'tertiary';

export type SizeType = 'sm' | 'md';

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
  variant?: VariantType;
  color?: ColorType;
  size?: SizeType;
}

export const Button = styled.button<IButton>`
  border-radius: 8px;

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
