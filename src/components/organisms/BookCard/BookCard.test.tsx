import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Open, FoldExample, Folded } from './BookCard.stories';
import { defaultTheme as theme } from '../../../styles/theme';
import { mountWithTheme } from '../../../jest';

test('should render all book info', () => {
  render(mountWithTheme(<Open {...Open.args} />));

  screen.getByTestId('bookCard');
  screen.getByTestId('image');
  screen.getByTestId('title');
  screen.getByTestId('author');
  screen.getByTestId('price');
  screen.getByTestId('discount');
  screen.getByTestId('description');
});

test('should render props image, title, author, discount', () => {
  render(mountWithTheme(<Folded {...Folded.args} />));

  screen.getByTestId('bookCard');
  screen.getByTestId('image');
  screen.getByTestId('title');
  screen.getByTestId('author');
  screen.getByTestId('discount');
  expect(screen.queryByTestId('price')).toBeNull();
  expect(screen.queryByTestId('description')).toBeNull();
});

test('should change folded when click the toggle button', () => {
  render(mountWithTheme(<FoldExample {...FoldExample.args} />));

  screen.getByTestId('price');

  userEvent.click(screen.getByTestId('toggle'));

  // After click the toggle button, the price must not be visible
  expect(screen.queryByTestId('price')).toBeNull();
});
