import styled from 'styled-components';

export const RemoveButton = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))`
  position: relative;
  width: 24px;
  height: 24px;
  border: 1px solid #d2d5d9;
  border-radius: 24px;
  background-color: white;
  cursor: pointer;
  transition: opacity 0.25s;

  &:hover {
    opacity: 0.6;
  }

  &:before {
    position: absolute;
    content: '';
    width: 13px;
    height: 1px;
    background-color: #6d7582;
    left: 50%;
    transform: translateX(-50%);
    display: block;
  }
`;
