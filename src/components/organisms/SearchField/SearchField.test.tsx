import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Default, DetailSearchForm } from './SearchField.stories';
import { mountWithTheme } from '../../../jest';

test('should have default text', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  expect(screen.getByTestId('resultText')).toHaveTextContent(/도서 검색/);
  screen.getByPlaceholderText(/검색어를 입력/);
  expect(screen.getByTestId('detailButton')).toHaveTextContent(/상세검색/);
  expect(screen.queryByTestId('detailSearchForm')).toBeNull();
});

test('should make DetailSearchForm visible', () => {
  render(mountWithTheme(<DetailSearchForm {...DetailSearchForm.args} />));
  screen.getByTestId('detailSearchForm');
});

test('should fire onSearch event when press the enter in the inputbox', () => {
  let fire = false;

  render(
    mountWithTheme(
      <Default
        {...Default.args}
        onSearch={() => {
          fire = true;
        }}
      />
    )
  );

  screen.getByTestId('searchInput').focus();
  userEvent.keyboard('{enter}');

  expect(fire).toBe(true);
});

test('should fire onDetailSearch event when click 상세검색 button', () => {
  let fire = false;

  render(
    mountWithTheme(
      <Default
        {...Default.args}
        onDetailSearch={() => {
          fire = true;
        }}
      />
    )
  );

  screen.getByTestId('detailButton').click();

  expect(fire).toBe(true);
});
