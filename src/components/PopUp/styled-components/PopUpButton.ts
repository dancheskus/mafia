/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import colors, { IColors } from 'style/colors';

export const PopUpButton = styled.button<{ light?: boolean; color: keyof IColors; disabled?: boolean }>`
  ${({ light, color, disabled }) => css`
    background: ${light ? colors[color].popupButtonLight : colors[color].popupButton};
    padding: 10px 25px;
    border: none;
    color: white;
    border-radius: 30px;
    font-size: 1.1rem;
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

    &:focus {
      outline: none;
    }
  `};
`;
