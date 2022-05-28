import { Button, ButtonProps } from '../../atoms/Button';
import styled from 'styled-components';
import DownArrowIcon from '../../../res/down_arrow.svg';

interface AccordionButtonProps extends ButtonProps {
  folded?: boolean;
}

export const AccordionButton = ({
  folded = false,
  children,
  ...props
}: AccordionButtonProps) => {
  return (
    <Button {...props}>
      {children}
      <Icon src={DownArrowIcon} folded={folded} />
    </Button>
  );
};

const Icon = styled.img.attrs((props) => ({
  alt: props.alt || 'accordion button icon',
}))<{
  folded: boolean;
}>`
  margin-left: 5px;
  -webkit-transition: transform 0.25s;
  -moz-transition: transform 0.25s;
  transition: transform 0.25s;
  ${({ folded }) => `
    transform: rotate(${folded ? '0' : '180'}deg);
  `}
`;
