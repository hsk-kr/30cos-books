import { Flex } from '../../atoms/Flex';
import styled from 'styled-components';

import BookIcon from '../../../res/book_icon.svg';

interface MessageWithBookIconProps {
  message?: string;
}

export const MessageWithBookIcon = ({ message }: MessageWithBookIconProps) => {
  return (
    <Flex direction="column" alignItems="center" rowGap={24}>
      <img alt="book icon" src={BookIcon} />
      <Text>{message}</Text>
    </Flex>
  );
};

const Text = styled.span`
  ${({ theme }) => `
    color: ${theme.colors.text.unselected};
    ${theme.font.bodyRegular}
  `};
`;
