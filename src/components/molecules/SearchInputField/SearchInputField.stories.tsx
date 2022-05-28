import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { SearchInputField } from '.';

export default {
  title: 'components/molecules/SearchInputField',
  component: SearchInputField,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof SearchInputField>;

const Template: ComponentStory<typeof SearchInputField> = (args) => (
  <SearchInputField {...args} />
);

export const Default = Template.bind({});

export const Placeholder = Template.bind({});

Placeholder.args = {
  placeholder: 'placeholder',
};
