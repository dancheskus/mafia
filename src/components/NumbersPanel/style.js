import styled, { css } from 'styled-components';

import colors from 'style/colors';

export const Panel = styled.div`
  ${({ itemsCentered, color, flash, skipVoting }) => css`
    position: relative;
    background: ${skipVoting ? colors[color].playerCardNumber : colors[color].numbersPanel};
    padding: 10px;
    border-radius: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: ${itemsCentered ? 'center' : 'space-evenly'};
    align-items: center;

    ${itemsCentered &&
    css`
      > div:not(:first-child) {
        margin-left: 10px;
      }
    `}

    ${flash && 'animation: flash 1.5s ease-in-out'}

    @keyframes flash {
      0% {
        transform: scale(1);
      }
      25% {
        transform: scale(1.05);
      }
      50% {
        transform: scale(1);
      }
    }
  `};
`;

export const PanelItem = styled.div`
  ${({ selected, color, isAlive, pointer, border }) => css`
    height: 30px;
    width: 30px;
    background: ${selected ? colors[color].numberSelected : colors[color].number};
    border-radius: 50%;
    color: white;
    ${color === 'EndOfGame' && !isAlive && 'filter: brightness(60%); color: grey'}
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    box-shadow: 0px 9px 35px -8px rgba(0, 0, 0, 0.49);
    cursor: ${pointer ? 'pointer' : 'default'};
    ${border && `border: 2px solid ${colors.Day.addSecondFoulBackground};`}

    @media (max-width: 404px) {
      height: 25px;
      width: 25px;
      font-size: 0.8rem;
    }

    @media (max-width: 350px) {
      height: 20px;
      width: 20px;
      font-size: 0.7rem;
    }
  `};
`;

export const PanelText = styled.div`
  color: white;
`;
