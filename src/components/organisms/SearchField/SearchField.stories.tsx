import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { SearchField } from '.';

export default {
  title: 'components/organisms/SearchField',
  component: SearchField,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof SearchField>;

const Template: ComponentStory<typeof SearchField> = (args) => {
  const [text, setText] = useState('');

  return (
    <SearchField
      {...args}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export const Default = Template.bind({});

export const DetailSearchForm = Template.bind({});

DetailSearchForm.args = {
  detailSearchForm: (
    <div
      style={{
        width: 360,
        height: 210,
        border: '1px solid black',
        backgroundColor: '#ececec',
      }}
    >
      DetailSearchForm
    </div>
  ),
};
