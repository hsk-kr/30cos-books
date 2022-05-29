import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { Pagination } from '.';

export default {
  title: 'components/molecules/Pagination',
  component: Pagination,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const WithoutPreviousAndNextButtons = Template.bind({});

WithoutPreviousAndNextButtons.args = {
  startPage: 1,
  endPage: 5,
  currentPage: 2,
};

export const EnablePreviousButton = Template.bind({});

EnablePreviousButton.args = {
  startPage: 1,
  endPage: 5,
  currentPage: 2,
  prevActive: true,
};

export const EnableNextButton = Template.bind({});

EnableNextButton.args = {
  startPage: 1,
  endPage: 5,
  currentPage: 2,
  nextActive: true,
};
export const EnableBothButtons = Template.bind({});

EnableBothButtons.args = {
  startPage: 1,
  endPage: 5,
  currentPage: 2,
  prevActive: true,
  nextActive: true,
};
