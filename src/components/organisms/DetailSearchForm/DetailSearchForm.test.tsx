import { render, screen } from '@testing-library/react';
import { Example } from './DetailSearchForm.stories';
import { mountWithTheme } from '../../../jest';

test('should not render a remove button in the first list item', () => {
  render(mountWithTheme(<Example {...Example.args} />));

  expect(screen.getAllByTestId('removeButton')[0]).toHaveStyle(
    'visibility: hidden'
  );

  expect(screen.getAllByTestId('removeButton')[1]).not.toHaveStyle(
    'visibility: hidden'
  );
});

test('should fire click events correctly', () => {
  let reset = false,
    search = false,
    addOption = false,
    remove = false;

  render(
    mountWithTheme(
      <Example
        {...Example.args}
        onReset={() => {
          reset = true;
        }}
        onSearch={() => {
          search = true;
        }}
        onAddSearchOption={() => {
          addOption = true;
        }}
        options={
          Example.args?.options?.map((option) => ({
            ...option,
            onRemove: () => {
              remove = true;
            },
          })) || []
        }
      />
    )
  );

  screen.getByTestId('searchButton').click();
  expect(search).toBe(true);

  screen.getByTestId('resetButton').click();
  expect(reset).toBe(true);

  screen.getByTestId('addSearchOptionButton').click();
  expect(addOption).toBe(true);

  screen.getAllByTestId('removeButton')[1].click();
  expect(remove).toBe(true);
});
