import styled, { css } from 'styled-components';
import themeConfig from '../../theme';

const brandToTheme: { [key: string]: string | undefined } = {
  primary: themeConfig.brandPrimary,
};

// eslint-disable-next-line
export type ColorStyleProps = {
  brand?: string;
};
// eslint-disable-next-line
export type AlignStyleProps = {
  align?: string;
};

export const colorStyle = css<ColorStyleProps>`
  ${({ brand }) =>
    brand && brandToTheme[brand] ? `color: ${[brandToTheme[brand]]};` : ''};
`;

export const alignStyle = css<AlignStyleProps>`
  ${({ align }) => (align ? `text-align: ${align};` : '')};
`;

const Text = styled.p<ColorStyleProps & AlignStyleProps>`
  color: ${({ theme }) => theme.textColor};
  font-family: ${({ theme }) => theme.fonts.sourceSans};
  font-size: 1rem;
  ${colorStyle};
  ${alignStyle};
`;

export default Text;
