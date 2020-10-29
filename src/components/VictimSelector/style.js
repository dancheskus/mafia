import styled, { css } from 'styled-components';

import colors from 'style/colors';

const margin = 3;

export const VotingSingleElement = styled.button`
  ${({ shooting, selected, disabled }) => css`
    :hover,
    :focus,
    :active {
      outline: none;
    }

    position: relative;

    .number {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    border: none;

    ${shooting
      ? css`
          background: ${selected
            ? colors.Night.handsAmountSelectedBackground
            : disabled
            ? colors.Night.handsAmountDisabledBackground
            : colors.Night.handsAmountBackground};
          color: ${selected
            ? colors.Night.buttonTextInverse
            : disabled
            ? colors.Night.handsAmountDisabledText
            : colors.Night.buttonText};
        `
      : css`
          background: ${selected
            ? colors.Voting.handsAmountSelectedBackground
            : disabled
            ? colors.Voting.handsAmountDisabledBackground
            : colors.Voting.handsAmountBackground};
          color: ${selected
            ? colors.Voting.popupTextInverse
            : disabled
            ? colors.Voting.handsAmountDisabledText
            : colors.Voting.popupText};
        `}

    border-radius: 10px;
    margin: ${margin}px;
    font-size: 2rem;
    padding: 0;
    ${!disabled && 'cursor: pointer'};
    width: calc(20% - ${margin * 2}px);
    padding-top: calc(20% - ${margin * 2}px);
    height: 0;

    @media (max-width: 400px) {
      font-size: 1.6rem;
    }
  `};
`;

export const VotingBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-basis: auto;
`;
