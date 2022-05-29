import { render, screen } from '@testing-library/react';
import {
  WithoutPreviousAndNextButtons,
  EnablePreviousButton,
  EnableNextButton,
  EnableBothButtons,
} from './Pagination.stories';
import { defaultTheme as theme } from '../../../styles/theme';
import { mountWithTheme } from '../../../jest';

test('should render page numbers', () => {
  render(
    mountWithTheme(
      <WithoutPreviousAndNextButtons
        startPage={0}
        endPage={0}
        currentPage={0}
        {...WithoutPreviousAndNextButtons.args}
      />
    )
  );

  for (let i = 1; i <= 5; i++) {
    screen.getByText(i);
  }
});

test('should emphasize curernt page text', () => {
  render(
    mountWithTheme(
      <WithoutPreviousAndNextButtons
        startPage={0}
        endPage={0}
        currentPage={0}
        {...WithoutPreviousAndNextButtons.args}
      />
    )
  );

  expect(screen.getByText(2)).toHaveStyle(`
      background-color: ${theme.colors.primary.main};
      color: white;
  `);
});

test('should not render the previous button and the next button', () => {
  render(
    mountWithTheme(
      <WithoutPreviousAndNextButtons
        startPage={0}
        endPage={0}
        currentPage={0}
        {...WithoutPreviousAndNextButtons.args}
      />
    )
  );

  expect(screen.queryByTestId('previousButton')).toBeNull();
  expect(screen.queryByTestId('nextButton')).toBeNull();
});

test('should render the previous button and not render the next button', () => {
  render(
    mountWithTheme(
      <EnablePreviousButton
        startPage={0}
        endPage={0}
        currentPage={0}
        {...EnablePreviousButton.args}
      />
    )
  );

  screen.queryByTestId('previousButton');
  expect(screen.queryByTestId('nextButton')).toBeNull();
});

test('should not render the previous button and render the next button', () => {
  render(
    mountWithTheme(
      <EnableNextButton
        startPage={0}
        endPage={0}
        currentPage={0}
        {...EnableNextButton.args}
      />
    )
  );

  expect(screen.queryByTestId('previousButton')).toBeNull();
  screen.queryByTestId('nextButton');
});

test('should render the previous button and render the next button', () => {
  render(
    mountWithTheme(
      <EnableBothButtons
        startPage={0}
        endPage={0}
        currentPage={0}
        {...EnableBothButtons.args}
      />
    )
  );

  screen.queryByTestId('previousButton');
  screen.queryByTestId('nextButton');
});
