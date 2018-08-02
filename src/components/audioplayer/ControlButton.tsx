import styled, { css } from 'styled-components';

const playingButtonStyle = css`
  background: ${({ theme }) => theme.brandPrimary};
  color: #fff;
  height: 32px;
  width: 32px;
  padding: 8px;
  padding-left: 9px;
  border-radius: 50%;
  position: relative;
  vertical-align: middle;
  &:hover {
    opacity: 0.75;
  }
`;

const disabledStyle = css`
  opacity: 0.5;
  cursor: not-allowed !important;
  pointer-events: none;
`;

const isDisabledCss = ({ disabled }: { disabled?: boolean }) =>
  disabled && disabledStyle;
const isPlayingCss = ({ playingButton }: { playingButton?: boolean }) =>
  playingButton && playingButtonStyle;
const colorCss = ({ theme, active }: { theme: $TsFixMe; active?: boolean }) =>
  active ? theme.brandPrimary : theme.textColor;

export const ControlButton = styled.button<{
  playingButton?: boolean;
  active?: boolean;
}>`
  width: 100%;
  display: inline-block;
  cursor: pointer;
  padding: 0 10px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: ${colorCss};
  outline: none;
  &:focus,
  &:active {
    outline: none;
  }

  ${isPlayingCss} ${isDisabledCss}
  i.fa {
    color: inherit;
    font-size: 100%;
  }
`;

export default ControlButton;
