import styled, { css } from 'styled-components';

import colors from 'style/colors';

export const PopUpButton = styled.button`
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
