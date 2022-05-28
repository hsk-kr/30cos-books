import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { hideArgs } from '../../../storybook';

import { BookCard } from '.';

export default {
  title: 'components/organisms/BookCard',
  component: BookCard,
  argTypes: {
    ...hideArgs('ref', 'theme', 'as', 'forwardedAs'),
  },
  args: {},
} as ComponentMeta<typeof BookCard>;

const Template: ComponentStory<typeof BookCard> = (args) => (
  <BookCard {...args} />
);

const ExampleTemplate: ComponentStory<typeof BookCard> = (args) => {
  const [folded, setFolded] = useState(false);

  const toggle = () => setFolded(!folded);

  return <BookCard {...args} folded={folded} onToggle={toggle} />;
};

export const Open = Template.bind({});

Open.args = {
  image:
    'https://bookthumb-phinf.pstatic.net/cover/189/260/18926010.jpg?type=m140&udate=20220311',
  title: '불편한 편의점',
  author: '김호연',
  description:
    '잘못된 <b>주식</b>투자 습관을 버리고, 절대로 지지 않는 투자법을 체득하다!불곰<b>주식</b>연구소 대표 ‘불곰’이 알려 주는 세상에서 가장 쉬운 ‘<b>주식</b>투자 불패공식’ 『불곰의 <b>주식</b>투자 불패공식』. 불곰은 전업투자자가 아니다. 불곰<b>주식</b>연구소는 태평스럽게도 한 달에 한 종목 정도만 추천할 따름이다. 그럼에도...',
  price: 16000,
  discount: 13500,
  folded: false,
};

export const Folded = Template.bind({});

Folded.args = {
  image:
    'https://bookthumb-phinf.pstatic.net/cover/189/260/18926010.jpg?type=m140&udate=20220311',
  title: '불편한 편의점',
  author: '김호연',
  description:
    '잘못된 <b>주식</b>투자 습관을 버리고, 절대로 지지 않는 투자법을 체득하다!불곰<b>주식</b>연구소 대표 ‘불곰’이 알려 주는 세상에서 가장 쉬운 ‘<b>주식</b>투자 불패공식’ 『불곰의 <b>주식</b>투자 불패공식』. 불곰은 전업투자자가 아니다. 불곰<b>주식</b>연구소는 태평스럽게도 한 달에 한 종목 정도만 추천할 따름이다. 그럼에도...',
  price: 16000,
  discount: 13500,
  folded: true,
};

export const FoldExample = ExampleTemplate.bind({});

FoldExample.args = {
  image:
    'https://bookthumb-phinf.pstatic.net/cover/189/260/18926010.jpg?type=m140&udate=20220311',
  title: '불편한 편의점',
  author: '김호연',
  description:
    '잘못된 <b>주식</b>투자 습관을 버리고, 절대로 지지 않는 투자법을 체득하다!불곰<b>주식</b>연구소 대표 ‘불곰’이 알려 주는 세상에서 가장 쉬운 ‘<b>주식</b>투자 불패공식’ 『불곰의 <b>주식</b>투자 불패공식』. 불곰은 전업투자자가 아니다. 불곰<b>주식</b>연구소는 태평스럽게도 한 달에 한 종목 정도만 추천할 따름이다. 그럼에도...',
  price: 16000,
  discount: 13500,
  folded: false,
};
