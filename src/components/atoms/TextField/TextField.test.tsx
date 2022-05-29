import { render, screen } from '@testing-library/react';
import { Default, Placeholder } from './TextField.stories';
import { defaultTheme as theme } from '../../../styles/theme';
import { mountWithTheme } from '../../../jest';

test('should have default css styles', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  expect(screen.getByRole('textbox')).toHaveStyle(`
    display: flex;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    box-sizing: border-box;
    height: 36px;
    background-color: white;

    border-bottom: 1px solid ${theme.colors.primary.main};
    color: ${theme.colors.common.black};
    width: 176px;
    ${theme.font.captionMedium}
  `);
});

test('should render placeholder', () => {
  render(mountWithTheme(<Placeholder {...Placeholder.args} />));

  screen.getByPlaceholderText(/검색어 입력/);
});
