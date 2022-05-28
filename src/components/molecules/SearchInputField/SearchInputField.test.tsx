import { render, screen } from '@testing-library/react';
import { Default, Placeholder } from './SearchInputField.stories';
import { defaultTheme as theme } from '../../../styles/theme';
import { mountWithTheme } from '../../../jest';

test('should have default css styles', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  expect(screen.getByRole('textbox')).toHaveStyle(`
    position: relative;
    color: ${theme.colors.common.black};
    background-color: ${theme.colors.secondary.main};
    height: 50px;
    padding: 13px 15px 13px 51px;
    box-sizing: border-box;
    border-radius: 100px;
    ${theme.font.bodyRegular}
    background-repeat: no-repeat;
    background-position: 15px 10px;
  `);
});

test('should have placeholder', () => {
  render(mountWithTheme(<Placeholder {...Placeholder.args} />));

  screen.getByPlaceholderText(/placeholder/i);
});
