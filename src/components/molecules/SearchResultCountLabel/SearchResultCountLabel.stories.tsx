import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { SearchResultCountLabel } from '.';

export default {
  title: 'components/molecules/SearchResultCountLabel',
  component: SearchResultCountLabel,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof SearchResultCountLabel>;

const Template: ComponentStory<typeof SearchResultCountLabel> = (args) => (
  <SearchResultCountLabel {...args} />
);

export const Example = Template.bind({});

Example.args = {
  label: '도서 검색 결과',
  total: 21,
};
