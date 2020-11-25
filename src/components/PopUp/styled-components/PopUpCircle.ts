/* eslint-disable import/prefer-default-export */
import styled, { css } from 'styled-components';

import colors from 'style/colors';

export const PopUpCircle = styled.div<{ color?: string; mini?: boolean }>`
  ${({ color, mini }) => css`
    width: 180px;
    height: 180px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    color: ${color === 'Night' ? colors.Night.popupLabel : colors.Voting.popupText};

    span {
      font-size: 4rem;
    }

    ${mini
      ? css`
          @media (max-height: 670px) {
            width: 140px;
            height: 140px;
            font-size: 4.7rem;
          }
          @media (max-height: 630px) {
            width: 110px;
            height: 110px;
            font-size: 4rem;
          }
          @media (max-height: 630px) {
            width: 90px;
            height: 90px;
            font-size: 3rem;
          }
        `
      : css`
          @media (max-height: 630px) {
            width: 150px;
            height: 150px;
            font-size: 5rem;
          }
          @media (max-height: 550px) {
            width: 130px;
            height: 130px;
            font-size: 4rem;
          }
        `}
  `}
`;
