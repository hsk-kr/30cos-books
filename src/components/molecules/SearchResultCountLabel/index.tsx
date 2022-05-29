import styled from 'styled-components';

interface SearchResultCountLabelProps {
  label?: string;
  total?: number;
  unit?: string;
}

export const SearchResultCountLabel = ({
  label,
  total,
  unit = '건',
}: SearchResultCountLabelProps) => {
  return (
    <Wrapper data-testid="wrapper">
      <Label data-testid="label">{label}</Label>
      <Label>
        총&nbsp;<Number data-testid="number">{total}</Number>&nbsp;{unit}
      </Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  column-gap: 16px;
  white-space: nowrap;
  ${({ theme }) => theme.font.bodyMedium}
`;

const Label = styled.label`
  display: flex;
`;

const Number = styled.div`
  color: ${({ theme }) => theme.colors.common.blue};
`;
