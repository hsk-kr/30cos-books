import { render, screen } from '@testing-library/react';
import { Default } from './AccordionButton.stories';
import { mountWithTheme } from '../../../jest';

test('should have an icon', () => {
  render(mountWithTheme(<Default {...Default.args} />));

  screen.getByRole('img');
});
