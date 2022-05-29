import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { DetailSearchForm } from '.';

export default {
  title: 'components/organisms/DetailSearchForm',
  component: DetailSearchForm,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof DetailSearchForm>;

const Template: ComponentStory<typeof DetailSearchForm> = (args) => {
  return <DetailSearchForm {...args} />;
};

const items = [
  {
    value: '제목',
    visible: true,
  },
  {
    value: '저자명',
    visible: true,
  },
  {
    value: '출판사',
    visible: true,
  },
];

const options = [
  { selectedItemIndex: 0, removeDisabled: true },
  { selectedItemIndex: 1 },
];

export const Example = Template.bind({});

Example.args = {
  items,
  options,
};
