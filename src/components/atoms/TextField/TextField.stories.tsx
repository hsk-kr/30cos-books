import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { TextField } from '.';

export default {
  title: 'components/atoms/TextField',
  component: TextField,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Default = Template.bind({});

export const Placeholder = Template.bind({});

Placeholder.args = {
  placeholder: '검색어 입력',
};
