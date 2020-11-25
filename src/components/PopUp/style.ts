import styled, { css } from 'styled-components';

import colors, { IColors } from 'style/colors';

interface IStyledPopUp {
  light?: boolean;
  color: keyof IColors;
  tutorialEnabled?: boolean;
  minimized?: boolean;
  opened?: boolean;
}
export const StyledPopUp = styled.div<IStyledPopUp>`
  ${({ light, color, tutorialEnabled, minimized, opened }) =>
    css`
      background: ${light ? colors[color].popupBackgroundLight : colors[color].popupBackground};

      border-radius: 10px;
      box-shadow: 3px 10px 9px -4px rgba(0, 0, 0, 0.31);
      position: absolute;
      height: calc(100% - 40px);
      width: calc(100% - 40px);
      bottom: 20px;
      left: 20px;
      ${!tutorialEnabled && 'z-index: 111'};
      transition: height 0.3s, width 0.3s;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      div:not(.minimize-button),
      h1,
      button {
        opacity: 1;
        transition: opacity 0.2s, transform 0.3s;
      }

      padding: 20px 0 20px 0;

      ${minimized &&
      css`
        width: 100px;
        height: 100px;

        div:not(.minimize-button),
        h1,
        button {
          opacity: 0;
          transform: translateX(-160%);
        }
      `};

      display: ${!opened && 'none'};
    `};
`;

interface IMinimizeButton {
  light?: boolean;
  color: keyof IColors;
  tutorialEnabled?: boolean;
}

export const MinimizeButton = styled.div<IMinimizeButton>`
  ${({ light, color, tutorialEnabled }) => css`
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${light ? colors[color].popupButtonLight : colors[color].popupButton};
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    transition: filter 0.3s;
    ${!tutorialEnabled && 'z-index: 222'};

    :hover {
      filter: brightness(110%);
    }
  `};
`;
