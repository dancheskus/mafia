import styled from 'styled-components';
import colors from '../../../colors';

export default styled.div`
  background: ${props =>
    !props.isAlive
      ? props.flipped
        ? '#232323'
        : colors.Day.deadPlayerCardBackground
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
    filter: blur(3px);
    background: ${props => props.opensTable && colors.Day.playerOpensTable};
    position: absolute;
    top: 7px;
    left: 7px;
  }

  .number {
    display: ${props => props.flipped && 'none'};
  }

  ${props =>
    props.flipped &&
    `
  ::after {
    content: '${props.role === 'МАФИЯ' ? 'М' : props.role === 'ДОН' ? 'Д' : props.role === 'МИРНЫЙ' ? 'Ж' : 'Ш'}';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    color: ${props.isAlive ? colors.Night.roleText : colors.Night.roleTextDead};
    width: 60px;
    height: 60px;
    background: ${
      !props.isAlive
        ? colors.Night.darkRoleBackgroundDead
        : props.darkSide
        ? colors.Night.darkRoleBackground
        : colors.Night.lightRoleBackground
    };
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  `}
`;
