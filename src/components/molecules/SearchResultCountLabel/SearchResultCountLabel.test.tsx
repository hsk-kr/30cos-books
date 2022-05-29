import { render, screen } from '@testing-library/react';
import { Example } from './SearchResultCountLabel.stories';
import { defaultTheme as theme } from '../../../styles/theme';
import { mountWithTheme } from '../../../jest';

test('should render number and emphasize number text', () => {
  render(mountWithTheme(<Example {...Example.args} />));

  const number = screen.getByTestId('number');
  expect(number).toHaveTextContent(/21/);
  expect(number).toHaveStyle(`color: ${theme.colors.common.blue}`);
});

test('should render label', () => {
  render(mountWithTheme(<Example {...Example.args} />));

  expect(screen.getByTestId('label')).toHaveTextContent(/도서 검색 결과/);
});

test('should have a style white-space nowrap', () => {
  render(mountWithTheme(<Example {...Example.args} />));

  expect(screen.getByTestId('wrapper')).toHaveStyle('white-space: nowrap');
});
