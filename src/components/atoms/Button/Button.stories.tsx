import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { Button } from '.';

export default {
  title: 'components/atoms/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {
    size: 'md',
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});

export const Secondary = Template.bind({});

Secondary.args = {
  color: 'secondary',
};

export const Outlined = Template.bind({});

Outlined.args = {
  variant: 'outlined',
};

export const SmallSize = Template.bind({});

SmallSize.args = {
  size: 'sm',
};
