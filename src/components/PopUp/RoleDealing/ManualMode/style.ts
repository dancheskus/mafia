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

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    transition: border 0.1s;
    width: 50%;
    height: 50%;
  }

  @media (max-width: 991px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 80%;
  }
`;

interface IRoleCard {
  mafia?: boolean;
  don?: boolean;
  sherif?: boolean;
  mirnij?: boolean;
  disabled?: boolean;
  selected: boolean;
}

export const RoleCard = styled.div<IRoleCard>`
  ${({ mafia, don, sherif, mirnij, selected, disabled }) => css`
    border: ${selected ? '2px solid white' : null} !important;

    ${() => {
      const { popupButton, popupBackgroundLight } = colors.RoleDealing;

      if (mafia)
        return css`
          border-radius: 0 0 0 10px;
          background: ${popupButton};
        `;
      if (don)
        return css`
          border-radius: 0 10px 0 0;
          background: ${popupButton};
        `;
      if (sherif)
        return css`
          background: ${popupBackgroundLight};
          border-radius: 0 0 10px 0;
        `;
      if (mirnij)
        return css`
          background: ${popupBackgroundLight};
          border-radius: 10px 0 0 0;
        `;
    }}

    ${disabled &&
    css`
      background: grey;
      filter: brightness(25%) grayscale(100%);
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
