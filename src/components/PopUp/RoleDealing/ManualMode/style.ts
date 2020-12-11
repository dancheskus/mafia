import styled, { css } from 'styled-components';

import colors from 'style/colors';

export const RoleSelectionWrapper = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RoleSelection = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 80%;
  }
`;

interface IRoleCard {
  disabled?: boolean;
  selected: boolean;
}

const { popupButton, popupBackgroundLight } = colors.RoleDealing;

export const RoleCard = styled.button<IRoleCard>`
  ${({ selected, disabled }) => css`
    width: 50%;
    height: 50%;

    > svg {
      transition: all 0.1s;

      ${selected &&
      css`
        margin-top: -20px;
        filter: drop-shadow(0 30px 7px rgba(0, 0, 0, 0.3));
      `}
    }

    :nth-child(1) {
      border-radius: 10px 0 0 0;
    }

    :nth-child(2) {
      border-radius: 0 10px 0 0;
    }

    :nth-child(3) {
      border-radius: 0 0 0 10px;
    }

    :nth-child(4) {
      border-radius: 0 0 10px 0;
    }

    ${disabled
      ? css`
          background: #525252;

          path {
            fill: rgba(0, 0, 0, 0.1);
          }
        `
      : css`
          background: ${popupButton};

          :nth-child(3n + 1) {
            background: ${popupBackgroundLight};
          }
        `}
  `}
`;

export const Notification = styled.div<{ disabled: boolean }>`
  text-align: center;
  line-height: 1;
  margin: 20px;

  ${({ disabled }) => (!disabled ? 'color: transparent' : 'animation: blinkingText 6s infinite')};

  @keyframes blinkingText {
    0% {
      color: transparent;
    }

    50% {
      color: white;
    }

    100% {
      color: transparent;
    }
  }
`;
