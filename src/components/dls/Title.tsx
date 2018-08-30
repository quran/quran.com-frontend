import React, { ReactNode } from 'react';
import styled from 'styled-components';
import {
  colorStyle,
  alignStyle,
  // eslint-disable-next-line
  ColorStyleProps,
  // eslint-disable-next-line
  AlignStyleProps,
} from './Text';

type StyledProps = {
  white?: boolean;
};

type Props = {
  level: number;
  children: ReactNode;
};

const LEVELS_TO_TAGS: $TsFixMe = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
};

const StyledTitle = styled.h1<StyledProps & ColorStyleProps & AlignStyleProps>`
  color: ${({ theme }: $TsFixMe) => theme.textColor};
  color: ${({ white, theme }: $TsFixMe) => white && theme.colors.white};
  ${colorStyle};
  ${alignStyle};
`;

const Title: React.SFC<
  Props & StyledProps & ColorStyleProps & AlignStyleProps
> = ({ level, ...props }: Props & StyledProps) => {
  const Component = StyledTitle.withComponent(LEVELS_TO_TAGS[level]);

  return <Component {...props} />;
};

export default Title;
