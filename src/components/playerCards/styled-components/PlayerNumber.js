import styled from 'styled-components';
import colors from '../../../colors';

export default styled.div`
  background: ${props =>
    !props.isAlive
      ? colors.Day.deadPlayerCardBackground
      : props.isMuted
      ? colors.Day.warningPlayerCardBackground
      : colors.Day.playerCardBackground};
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: ${props =>
    !props.isAlive
      ? colors.Day.deadPlayerCardNumber
      : props.isMuted
      ? colors.Day.deadPlayerCardNumber
      : colors.Day.playerCardNumber};
  position: relative;

  ::before {
    content: '';
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${props => props.opensTable && colors.Day.playerOpensTable};
    opacity: 0.7;
    position: absolute;
    top: 7px;
    left: 7px;
  }
`;
