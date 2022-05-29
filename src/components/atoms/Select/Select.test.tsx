import { act, render, screen } from '@testing-library/react';
import {
  Default,
  SelectedItemIndex,
  ListItemInvisible,
  Width,
} from './Select.stories';
import { mountWithTheme } from '../../../jest';

test('should render without any props', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  screen.getByRole('combobox');
});

test('should have 100px width by default', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  expect(screen.getByRole('combobox')).toHaveStyle(`
    width: 100px;
  `);
});

test('should show selected text', () => {
  render(mountWithTheme(<SelectedItemIndex {...SelectedItemIndex.args} />));

  screen.getByText('제목');
});

test('should hide dropdown by default', () => {
  render(mountWithTheme(<SelectedItemIndex {...SelectedItemIndex.args} />));

  expect(screen.queryByTestId('dropdown')).toBeNull();
});

test('should show dropdown when click the tag', async () => {
  render(mountWithTheme(<SelectedItemIndex {...SelectedItemIndex.args} />));

  await act(async () => {
    screen.getByRole('combobox').click();
  });

  await screen.findByTestId('dropdown');
});

test('should show selected item even the item is not visible in the dropdown', () => {
  render(mountWithTheme(<ListItemInvisible {...ListItemInvisible.args} />));

  screen.getByText('저자명');
});

test('should change width', () => {
  render(mountWithTheme(<Width {...Width.args} />));

  expect(screen.getByRole('combobox')).toHaveStyle(`
    width: 150px;
  `);
});
