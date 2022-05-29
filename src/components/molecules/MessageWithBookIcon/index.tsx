import { Flex } from '../../atoms/Flex';
import styled from 'styled-components';

import BookIcon from '../../../res/book_icon.svg';

interface MessageWithBookIconProps {
  message?: string;
  mt?: number;
}

export const MessageWithBookIcon = ({
  message,
  mt,
}: MessageWithBookIconProps) => {
  return (
    <Container
      direction="column"
      alignItems="center"
      rowGap={24}
      mt={mt}
      data-testid="messageWithBookIcon"
    >
      <img alt="book icon" src={BookIcon} />
      <Text>{message}</Text>
    </Container>
  );
};

const Container = styled(Flex)<{
  mt?: number;
}>`
  ${({ mt }) => mt && `margin-top: ${mt}px;`}
`;

const Text = styled.span`
  ${({ theme }) => `
    color: ${theme.colors.text.unselected};
    ${theme.font.bodyRegular}
  `};
`;
