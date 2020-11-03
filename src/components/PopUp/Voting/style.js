import styled from 'styled-components';

import colors from 'style/colors';

export const ResultsNumbers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 10px;
  border-radius: 100px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    width: 50px;
    height: 50px;
    background: ${colors.Voting.popupBackground};
    border-radius: 50%;
    color: ${colors.Voting.popupTextInverse};
  }

  > div:not(:first-child) {
    margin-left: 10px;
  }
`;

export const BottomButtonGroup = styled.div`
  flex-direction: row;

  > :not(:last-child) {
    margin-right: 20px;
    background: ${({ buttonOncePressed }) => buttonOncePressed && 'darkred'};
  }
`;
