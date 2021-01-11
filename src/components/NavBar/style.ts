import styled, { css } from 'styled-components';

import colors, { IColors } from 'style/colors';
import { NextIcon } from 'icons/svgIcons';

export const BackIcon = styled(NextIcon)`
  transform: rotate(180deg);
`;

interface IStyledNavigation {
  tutorialEnabled?: boolean;
  color: keyof IColors;
}
export const StyledNavigation = styled.div<IStyledNavigation>`
  ${({ tutorialEnabled, color }) => css`
    background: #46494e;
    ${!tutorialEnabled && 'z-index: 300'};

    .container > * {
      padding: 10px;
      color: ${colors[color].navBarText};
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;

      &:not(:last-child) {
        border-right: 2px solid #8f8f8f;
        flex-grow: 1;
      }
    }
  `}
`;

export const NavStateName = styled.h2<{ tutorialEnabled: boolean }>`
  margin: 0;
  font-weight: 300;
  font-size: 2rem;
  text-transform: uppercase;

  span {
    ${({ tutorialEnabled }) => tutorialEnabled && 'animation: zoom 1s alternate ease-in 2'};
  }

  @keyframes zoom {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 520px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

export const ButtonsWrapper = styled.div`
  > :not(:first-child) {
    margin-left: 15px;
  }
`;
