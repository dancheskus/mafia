import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';
import { MinimizeIcon, MaximizeIcon } from './../../img/svgIcons';
import { addFoul, removeFoul } from './../../redux/actions/playersActions';

const CardContainer = styled.div`
  width: 50%;
  display: flex;
  padding: 2px;
  height: 20%;
  order: ${props => props.order};
`;

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  flex-grow: 1;
  border: 4px solid ${props => (props.activePlayer ? colors.Day.activePlayer : 'transparent')};
  display: flex;
`;

const PlayerNumber = styled.div`
  background: ${props => (props.isAlive ? colors.Day.playerCardBackground : colors.Day.deadPlayerCardBackground)};
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  color: ${props => (props.isAlive ? colors.Day.playerCardNumber : colors.Day.deadPlayerCardNumber)};
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
`;

const FoulContainer = styled.div`
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

const RemoveFoul = styled.div`
  background: ${colors.Day.removeFoulBackground};
`;

const AddFoul = styled.div`
  background: ${props =>
    props.amount === 2
      ? colors.Day.addSecondFoulBackground
      : props.amount === 3
      ? colors.Day.addThirdFoulBackground
      : colors.Day.addFoulBackground};
`;

const FoulIcon = styled.div`
  border-radius: 50%;
  width: 25px;
  height: 25px;
  background: ${props => (props.remove ? colors.Day.addFoulBackground : colors.Day.removeFoulBackground)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SingleCard = props => {
  const addFoul = () => props.addFoul(props.number);
  const removeFoul = () => props.removeFoul(props.number);

  const isAlive = props.players[props.number - 1].isAlive;

  return (
    <CardContainer order={props.order}>
      <Card activePlayer={props.game.activePlayer === props.number}>
        <PlayerNumber isAlive={isAlive} opensTable={props.game.opensTable === props.number}>
          {props.number}
        </PlayerNumber>

        <FoulContainer isAlive={isAlive}>
          <RemoveFoul onClick={removeFoul}>
            <FoulIcon remove>
              <MinimizeIcon size={'50%'} />
            </FoulIcon>
          </RemoveFoul>
          <AddFoul amount={props.players[props.number - 1].fouls.amount} onClick={addFoul}>
            {props.players[props.number - 1].fouls.amount ? (
              '!'.repeat(props.players[props.number - 1].fouls.amount)
            ) : (
              <FoulIcon>
                <MaximizeIcon size={'50%'} />
              </FoulIcon>
            )}
          </AddFoul>
        </FoulContainer>
      </Card>
    </CardContainer>
  );
};

const mapStateToProps = ({ game, players }) => ({ game, players });

const mapDispatchToProps = dispatch => ({
  addFoul: playerNumber => dispatch(addFoul(playerNumber)),
  removeFoul: playerNumber => dispatch(removeFoul(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCard);
