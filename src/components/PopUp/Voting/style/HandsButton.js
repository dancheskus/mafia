import styled from 'styled-components';
import colors from '../../../../colors';

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
  background: ${props =>
    props.selected
      ? colors.Voting.handsAmountSelectedBackground
      : props.disabled
      ? colors.Voting.handsAmountDisabledBackground
      : colors.Voting.handsAmountBackground};
  border-radius: 10px;
  margin: ${margin}px;
  color: ${props =>
    props.selected
      ? colors.Voting.popupTextInverse
      : props.disabled
      ? colors.Voting.handsAmountDisabledText
      : colors.Voting.popupText};
  font-size: 2rem;
  padding: 0;
  ${props => !props.disabled && 'cursor: pointer'};
  width: calc(20% - ${margin * 2}px);
  padding-top: calc(20% - ${margin * 2}px);
  height: 0;
`;
