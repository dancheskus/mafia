import styled, { css } from 'styled-components';

import colors from 'style/colors';

const { popupText, popupCircleBackground } = colors.SeatAllocator;

export const BigCircle = styled.div`
  ${({ enabled, number }) => css`
    width: 220px;
    height: 220px;
    border-radius: 50%;
    font-weight: 600;
    text-transform: uppercase;

    ${enabled && 'cursor: pointer'};

    ${number
      ? css`
          font-size: 9rem;
          color: ${popupText};
          background: white;
        `
      : css`
          font-size: 2.3rem;
          color: white;
          background: ${popupCircleBackground};
        `}
  `};
`;
