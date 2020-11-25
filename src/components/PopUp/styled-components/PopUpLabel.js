import styled, { css } from 'styled-components';

import colors from 'style/colors';

export const PopUpLabel = styled.div`
  ${({ color, light }) => css`
    text-transform: uppercase;
    text-align: center;
    color: ${color ? colors[color].popupLabel : '#fff'};
    width: 80%;

    ${light && 'font-weight: 300'};

    @media (max-width: 450px) {
      font-size: 1.8rem;
    }

    @media (max-width: 400px) {
      font-size: 1.5rem;
    }
  `}
`;
