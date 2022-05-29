import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { Select } from '.';

export default {
  title: 'components/atoms/Select',
  component: Select,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {
    items: [],
    selectedItemIndex: -1,
    width: 100,
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

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

export const Default = Template.bind({});

export const SelectedItemIndex = Template.bind({});

SelectedItemIndex.args = {
  items,
  selectedItemIndex: 0,
};

export const ListItemInvisible = Template.bind({});

ListItemInvisible.args = {
  items: items.map((item, itemIdx) => {
    if (itemIdx === 1) {
      return {
        ...item,
        visible: false,
      };
    }

    return item;
  }),
  selectedItemIndex: 1,
};

export const Width = Template.bind({});

Width.args = {
  items,
  width: 150,
};
