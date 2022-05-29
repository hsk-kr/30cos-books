import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { MessageWithBookIcon } from '.';

export default {
  title: 'components/molecules/MessageWithBookIcon',
  component: MessageWithBookIcon,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
} as ComponentMeta<typeof MessageWithBookIcon>;

const Template: ComponentStory<typeof MessageWithBookIcon> = (args) => (
  <MessageWithBookIcon {...args} />
);

export const Example = Template.bind({});

Example.args = {
  message: 'text',
};
