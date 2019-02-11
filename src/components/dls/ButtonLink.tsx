import styled from 'styled-components';

const ButtonLink = styled.button<{ active?: boolean }>`
  color: ${({ theme }) => theme.textMuted};
  text-decoration: none;
  border-color: transparent;
  background-color: transparent;
  box-shadow: none;
  display: block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  font-size: 0.75rem;
  line-height: 1.42857;
  border-radius: 4px;
  user-select: none;
  padding: 0.25rem 0rem;

  ${({ active, theme }) =>
    active ? `color: ${theme.brandPrimary}` : ''} &:hover {
    color: ${({ theme }) => theme.brandPrimary};
  }
`;

export default ButtonLink;
