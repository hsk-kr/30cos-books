import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../../res/search_icon.svg';

type SearchInputFieldProps = React.ComponentPropsWithoutRef<'input'>;

export const SearchInputField = styled.input.attrs(
  (props: SearchInputFieldProps) => ({
    type: props.type || 'text',
  })
)<SearchInputFieldProps>`
  ${({ theme }) => `
    position: relative;
    color: ${theme.colors.common.black};
    background-color: ${theme.colors.secondary.main};
    height: 50px;
    padding: 13px 15px 13px 51px;
    box-sizing: border-box;
    border-radius: 100px;
    ${theme.font.bodyRegular}
    background-image: url('${SearchIcon}');
    background-repeat: no-repeat;
    background-position: 15px 10px;

    &::placeholder {
      color: ${theme.colors.text.caption};
    }
  `}
`;
