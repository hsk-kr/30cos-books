import { render, screen } from '@testing-library/react';
import {
  Default,
  Secondary,
  Outlined,
  SmallSize,
  Width,
} from './Button.stories';
import { defaultTheme as theme } from '../../../styles/theme';
import { mountWithTheme } from '../../../jest';

test('should have default css styles', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  expect(screen.getByRole('button')).toHaveStyle(`
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.primary.contrast};
    padding: 12px 28px;
    ${theme.font.bodyMedium}
  `);
});

test('should change background-color and color depending on color prop', () => {
  render(mountWithTheme(<Secondary {...Secondary.args} />));

  expect(screen.getByRole('button')).toHaveStyle(`
    background-color: ${theme.colors.secondary.main};
    color: ${theme.colors.secondary.contrast};
  `);
});

test('should change border and color styles depending on variant prop', () => {
  render(mountWithTheme(<Outlined {...Outlined.args} />));

  expect(screen.getByRole('button')).toHaveStyle(`
    border: 1px solid ${theme.colors.primary.main};
    background-color: ${theme.colors.primary.contrast};
    color: ${theme.colors.primary.main};
  `);
});

test('should change font and padding depending on size prop', () => {
  render(mountWithTheme(<SmallSize {...SmallSize.args} />));

  expect(screen.getByRole('button')).toHaveStyle(`
    ${theme.font.captionMedium}
    padding: 5px 10px;
  `);
});

test('should padding-left, padding-right are zero and set width', () => {
  render(mountWithTheme(<Width {...Width.args} />));

  expect(screen.getByRole('button')).toHaveStyle(`
    width: 110px;
    padding-left: 0px;
    padding-right: 0px;
  `);
});
