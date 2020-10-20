import styled from 'styled-components';

import colors from 'style/colors';

export const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  min-height: 0;
  flex-direction: column-reverse;
`;

export const PlayerNumber = styled.div`
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

export const FoulContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  display: ${props => !props.isAlive && 'none'};

  > div {
    width: 100%;
    height: 50%;
    color: white;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CardContainer = styled.div`
  width: 50%;
  display: flex;
  padding: 2px;
  flex-basis: 20%;
  order: ${props => props.order};
`;

export const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  flex-grow: 1;
  border: 4px solid ${props => (props.activePlayer ? colors.Day.activePlayer : 'transparent')};
  display: flex;
  position: relative;
`;

export const RemoveFoul = styled.div`
  background: ${colors.Day.removeFoulBackground};
`;

export const AddFoul = styled.div`
  background: ${props =>
    props.amount === 2
      ? colors.Day.addSecondFoulBackground
      : props.amount === 3 || props.amount === 4
      ? colors.Day.addThirdFoulBackground
      : colors.Day.addFoulBackground};
`;

export const FoulIcon = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: ${props => (props.remove ? colors.Day.addFoulBackground : colors.Day.removeFoulBackground)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${colors.Night.popupButton};
  display: flex;
  flex-direction: center;
  justify-content: center;
  padding: 7px;
  transform: rotate(180deg);
  cursor: pointer;
  transition: filter 0.2s !important;
  position: absolute;
  bottom: 10px;
  left: 10px;

  :hover {
    filter: brightness(120%);
  }

  @media (max-height: 860px) {
    width: 25px;
    height: 25px;
    bottom: 5px;
    left: 5px;
    padding: 5px;
  }
`;
