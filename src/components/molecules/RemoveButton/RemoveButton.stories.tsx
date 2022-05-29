import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { RemoveButton } from '.';

export default {
  title: 'components/molecules/RemoveButton',
  component: RemoveButton,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof RemoveButton>;

const Template: ComponentStory<typeof RemoveButton> = (args) => (
  <RemoveButton {...args} />
);

export const Default = Template.bind({});
