import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { AccordionButton } from '.';

export default {
  title: 'components/molecules/AccordionButton',
  component: AccordionButton,
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
    width: undefined,
    folded: false,
  },
} as ComponentMeta<typeof AccordionButton>;

const Template: ComponentStory<typeof AccordionButton> = (args) => (
  <AccordionButton {...args} />
);

export const Default = Template.bind({});
