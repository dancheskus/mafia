import styled from 'styled-components';
import colors from 'style/colors';

const margin = 3;

export default styled.button`
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

  ${props =>
    props.shooting
      ? `
  background: ${
    props.selected
      ? colors.Night.handsAmountSelectedBackground
      : props.disabled
      ? colors.Night.handsAmountDisabledBackground
      : colors.Night.handsAmountBackground
  };
  color: ${
    props.selected
      ? colors.Night.buttonTextInverse
      : props.disabled
      ? colors.Night.handsAmountDisabledText
      : colors.Night.buttonText
  };
      `
      : `
  background: ${
    props.selected
      ? colors.Voting.handsAmountSelectedBackground
      : props.disabled
      ? colors.Voting.handsAmountDisabledBackground
      : colors.Voting.handsAmountBackground
  };
  color: ${
    props.selected
      ? colors.Voting.popupTextInverse
      : props.disabled
      ? colors.Voting.handsAmountDisabledText
      : colors.Voting.popupText
  };
  `}
  border-radius: 10px;
  margin: ${margin}px;
  font-size: 2rem;
  padding: 0;
  ${props => !props.disabled && 'cursor: pointer'};
  width: calc(20% - ${margin * 2}px);
  padding-top: calc(20% - ${margin * 2}px);
  height: 0;

  @media (max-width: 400px) {
    font-size: 1.6rem;
  }
`;
