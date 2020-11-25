import styled, { css } from 'styled-components';

import colors from 'style/colors';

export const TimeAndPlayWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1;

  ${({ mini, time }) =>
    mini
      ? css`
          width: 45px;
          min-height: 45px;
          cursor: pointer;
          background: ${colors.Day.deadPlayerCardNumber};
          border-radius: 5px;
        `
      : css`
          font-size: 400%;
          color: ${time > 10 ? 'white' : '#FB6F6F'};

          @media (max-height: 630px) {
            font-size: 300%;
          }
        `};
`;

export const StartStopButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ mini }) =>
    mini
      ? css`
          height: 20px;
          width: 20px;
        `
      : css`
          height: 40px;
          width: 40px;

          @media (max-height: 630px) {
            height: 35px;
            width: 35px;
          }
        `}
`;

export const MutedWrapper = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
