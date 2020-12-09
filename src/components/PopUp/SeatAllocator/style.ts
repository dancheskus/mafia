import styled, { css } from 'styled-components';

import colors from 'style/colors';

const { popupText, popupCircleBackground } = colors.SeatAllocator;

export default styled.button<{ disabled?: boolean; number?: boolean }>`
  ${({ number, disabled }) => css`
    width: 220px;
    height: 220px;
    border-radius: 50%;
    font-weight: 600;
    text-transform: uppercase;

    ${!disabled && 'cursor: pointer'};

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
