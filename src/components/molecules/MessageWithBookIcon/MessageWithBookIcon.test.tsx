import { render, screen } from '@testing-library/react';
import { Example } from './MessageWithBookIcon.stories';
import { mountWithTheme } from '../../../jest';

test('should have an icon', () => {
  render(mountWithTheme(<Example {...Example.args} />));

  screen.getByRole('img');
});

test('should show text', () => {
  render(mountWithTheme(<Example {...Example.args} />));

  screen.getByText(/text/i);
});
