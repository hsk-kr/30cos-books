import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { AccordionButton } from '../../molecules/AccordionButton';

interface BookCardProps {
  image?: string;
  title?: string;
  author?: string;
  description?: string;
  price?: number;
  discount?: number;
  folded?: boolean;
  onToggle?: VoidFunction;
  onPurchase?: VoidFunction;
}

export const BookCard = ({
  image = '',
  title,
  author,
  description,
  price,
  discount,
  folded = false,
  onToggle,
  onPurchase,
}: BookCardProps) => {
  return (
    <BookCardWrapper folded={folded} data-testid="bookCard">
      <FirstPart folded={folded}>
        <Thumbnail src={image} data-testid="image" />
      </FirstPart>
      <SecondPart folded={folded}>
        <Flex columnGap={16} mb={!folded ? 16 : undefined} alignItems="center">
          <Title data-testid="title">{title}</Title>
          <Author data-testid="author">{author}</Author>
        </Flex>
        {!folded && (
          <BookDescriptionWrapper direction="column">
            <DescriptionIntro>책소개</DescriptionIntro>
            <Description data-testid="description">
              {description?.replace(/<\/?[^>]+(>|$)/g, '')}
            </Description>
          </BookDescriptionWrapper>
        )}
      </SecondPart>
      <ThirdPart folded={folded}>
        <ThirdPartOne folded={folded}>
          <Button onClick={onPurchase}>구매하기</Button>
        </ThirdPartOne>
        <ThirdPartTwo folded={folded}>
          {folded ? (
            discount && (
              <Discount data-testid="discount">
                {discount.toLocaleString()}원
              </Discount>
            )
          ) : (
            <Flex direction="column" alignItems="flex-end">
              {price && (
                <Flex columnGap={8} alignItems="flex-end" data-testid="price">
                  <PriceLabel>원가</PriceLabel>
                  <Price>{price.toLocaleString()}원</Price>
                </Flex>
              )}
              {discount && (
                <Flex
                  columnGap={8}
                  alignItems="flex-end"
                  data-testid="discount"
                >
                  <PriceLabel>할인가</PriceLabel>
                  <Discount>{discount.toLocaleString()}원</Discount>
                </Flex>
              )}
            </Flex>
          )}
        </ThirdPartTwo>
        <ThirdPartThree folded={folded}>
          <AccordionButton
            folded={folded}
            color="secondary"
            width={115}
            onClick={onToggle}
            data-testid="toggle"
          >
            상세보기
          </AccordionButton>
        </ThirdPartThree>
      </ThirdPart>
    </BookCardWrapper>
  );
};

export const BookCardWrapper = styled.div<{
  folded: boolean;
}>`
  transition: all 0.25s;
  display: flex;
  column-gap: 48px;

  ${({ folded }) => {
    if (folded) {
      return `
      height: 68px;
      max-height: 68px;
      padding: 16px 0px;
      `;
    } else {
      return `
      height: 264px;
      max-height: 264px;
      padding: 40px 0px;
      `;
    }
  }}
`;

const Thumbnail = styled.img.attrs(() => ({
  alt: 'book thumbnail',
}))`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const Title = styled.span`
  ${({ theme }) => theme.font.h3}
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

const Description = styled.p`
  ${({ theme }) => theme.font.p}
  overflow-y: auto;
`;

const DescriptionIntro = styled.span`
  ${({ theme }) => theme.font.h4}
  margin-bottom: 12px;
`;

const Author = styled.span`
  ${({ theme }) => `
    ${theme.font.captionMedium}
    color: ${theme.colors.text.caption};
  `}
  white-space: nowrap;
`;

const PriceLabel = styled.span`
  ${({ theme }) => `
    ${theme.font.tinyMedium}
    color: ${theme.colors.text.caption};
  `}
`;

const Flex = styled.div<{
  flex?: number;
  direction?: 'column' | 'row';
  columnGap?: number;
  rowGap?: number;
  mb?: number;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  justifyContent?: 'flex-start' | 'center' | 'flex-end';
}>`
  display: flex;
  ${({
    flex,
    columnGap,
    direction,
    rowGap,
    mb,
    alignItems,
    justifyContent,
  }) => {
    return `
      ${flex ? `flex: ${flex};` : ''}
      ${columnGap ? `column-gap: ${columnGap}px;` : ''}
      ${rowGap ? `row-gap: ${rowGap}px;` : ''}
      ${direction ? `flex-direction: ${direction};` : ''}
      ${mb ? `margin-bottom: ${mb}px;` : ''}
      ${alignItems ? `align-items: ${alignItems};` : ''}
      ${justifyContent ? `justify-content: ${justifyContent};` : ''}
    `;
  }}
`;

const BookDescriptionWrapper = styled(Flex)`
  height: calc(100% - 40px);
  overflow-y: hidden;
`;

const Price = styled.span`
  ${({ theme }) => theme.font.h3}
  font-weight: 350;
  text-decoration-line: line-through;
`;

const Discount = styled.span`
  ${({ theme }) => theme.font.h3}
`;

const FirstPart = styled.div<{
  folded: boolean;
}>`
  height: 100%;
  ${({ folded }) => `
    width: ${folded ? 48 : 200}px;
    min-width: ${folded ? 48 : 200}px;
  `}
`;

const SecondPart = styled.div<{
  folded: boolean;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 264px;
  overflow-x: hidden;

  ${({ folded }) =>
    folded &&
    `
    flex: 1;
    height: 100%;
    justify-content: center;
  `}
`;

const ThirdPart = styled.div<{
  folded: boolean;
}>`
  display: grid;

  ${({ folded }) =>
    folded
      ? `
  grid-template-areas: 
    "two one three";
  `
      : `
  grid-template-areas: 
    "three"
    "two"
    "two"
    "one";
    width: 240px;
    min-width: 240px;
  `}
`;

const ThirdPartOne = styled.div<{
  folded: boolean;
}>`
  grid-area: one;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  ${({ folded }) =>
    folded &&
    `
      align-self: center;
      margin-right: 8px;
    `}
`;

const ThirdPartTwo = styled.div<{
  folded: boolean;
}>`
  grid-area: two;
  align-self: flex-end;

  ${({ folded }) =>
    folded &&
    `
    align-self: center;
    margin-right: 56px;
  `}
`;

const ThirdPartThree = styled.div<{
  folded: boolean;
}>`
  grid-area: three;
  justify-self: flex-end;

  ${({ folded }) =>
    folded &&
    `
    align-self: center;
  `}
`;
