import { css } from 'styled-components';

export const buttonMixin = css`
  font-family: ${(props) => props.theme.general.font.family},
    ${(props) => props.theme.general.font.fallbackFamily};
  font-size: 16px;
`;
