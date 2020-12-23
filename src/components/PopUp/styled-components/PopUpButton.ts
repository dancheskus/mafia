/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import colors, { IColors } from 'style/colors';

interface IPopUpButton {
  light?: boolean;
  color: keyof IColors;
  disabled?: boolean;
  small?: boolean;
}

export const PopUpButton = styled.button<IPopUpButton>`
  ${({ light, color, disabled, small }) => css`
    background: ${light ? colors[color].popupButtonLight : colors[color].popupButton};
    color: white;
    border-radius: 30px;
    ${small
      ? css`
          padding: 8px 15px;
          font-size: 0.9rem;
        `
      : css`
          padding: 10px 25px;
          font-size: 1.1rem;
        `}

    text-transform: uppercase;
    transition: filter 0.2s !important;

    ${disabled
      ? css`
          filter: brightness(60%);
          cursor: default;
        `
      : css`
          cursor: pointer;

          &:hover {
            filter: brightness(110%);
          }
        `}
  `};
`;
