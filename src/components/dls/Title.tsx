import React from 'react';
import styled from 'styled-components';

type StyledProps = {
  white?: boolean;
};

type Props = {
  level: number;
};

const LEVELS_TO_TAGS: $TsFixMe = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

const StyledTitle = styled.h1<StyledProps>`
  color: ${({ theme }: $TsFixMe) => theme.textColor};
  color: ${({ white, theme }: $TsFixMe) => white && theme.colors.white};
`;

const Title: React.SFC<Props & StyledProps> = ({
  level,
  ...props
}: Props & StyledProps) => {
  const Component = StyledTitle.withComponent(LEVELS_TO_TAGS[level]);

  return <Component {...props} />;
};

export default Title;
