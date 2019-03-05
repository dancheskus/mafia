import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from 'colors.js';
import { MinimizeIcon, MaximizeIcon } from 'icons/svgIcons';
import { addFoul, removeFoul, returnPlayerToGame } from 'redux/actions/playersActions';
import { changeGameState, skipVotingInc, skipVotingDec } from 'redux/actions/gameActions';
import PlayerNumber from './styled-components/PlayerNumber';
import FoulContainer from './styled-components/FoulContainer';
import checkForEnd from 'helpers/checkForEnd';
import { Zombie } from '../../icons/svgIcons';

const CardContainer = styled.div`
  width: 50%;
  display: flex;
  padding: 2px;
  flex-basis: 20%;
  order: ${props => props.order};
`;

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  flex-grow: 1;
  border: 4px solid ${props => (props.activePlayer ? colors.Day.activePlayer : 'transparent')};
  display: flex;
  position: relative;
`;

const RemoveFoul = styled.div`
  background: ${colors.Day.removeFoulBackground};
`;

const AddFoul = styled.div`
  background: ${props =>
    props.amount === 2
      ? colors.Day.addSecondFoulBackground
      : props.amount === 3 || props.amount === 4
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

const ZombieIconWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    width: 30px;
    height: 30px;

    @media (max-height: 670px) {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 340px) {
      width: 20px;
      height: 20px;
    }
  }
`;

class SingleCard extends Component {
  state = { foulsAmount: this.props.players[this.props.number].fouls.amount, lastFoulDeath: false };

  timer;
  returnToLifeTimer;

  componentWillUnmount = () => {
    clearTimeout(this.timer);
    clearTimeout(this.returnToLifeTimer);
  };

  addFoul = () => {
    if (this.state.foulsAmount === 4) return;

    this.setState({ foulsAmount: this.state.foulsAmount + 1 });

    if (this.state.foulsAmount !== 3) return this.props.addFoul(this.props.number);

    this.timer = setTimeout(() => {
      this.props.addFoul(this.props.number);

      if (checkForEnd(this.props.players).status) return this.props.changeGameState({ phase: 'EndOfGame' });

      this.setState({ lastFoulDeath: true });

      this.returnToLifeTimer = setTimeout(() => {
        this.setState({ lastFoulDeath: false });
      }, 5000);

      this.props.skipVotingInc();
    }, 2000);
  };

  removeFoul = () => {
    if (this.state.foulsAmount === 0) return;
    this.setState({ foulsAmount: this.state.foulsAmount - 1 });
    if (this.state.foulsAmount === 4) {
      clearTimeout(this.timer);
    } else {
      this.props.removeFoul(this.props.number);
    }
  };

  backToLife = () => {
    clearTimeout(this.returnToLifeTimer);
    this.props.returnPlayerToGame(this.props.number);
    this.props.skipVotingDec();
    this.setState({ foulsAmount: 3, lastFoulDeath: false });
  };

  render = () => {
    const isMuted = this.props.players[this.props.number].fouls.muted;
    const isAlive = this.props.players[this.props.number].isAlive;
    const phase = this.props.game.gameState.phase;
    const role = this.props.players[this.props.number].role;

    return (
      <CardContainer order={this.props.order}>
        <Card isAlive={isAlive} activePlayer={phase === 'Day' && this.props.game.activePlayer === this.props.number}>
          <PlayerNumber
            darkSide={role === 'МАФИЯ' || role === 'ДОН'}
            role={role}
            isMuted={isMuted}
            isAlive={isAlive}
            opensTable={phase === 'Day' && this.props.game.opensTable === this.props.number}
          >
            {this.state.lastFoulDeath && phase === 'Day' && (
              <ZombieIconWrapper onClick={this.backToLife}>
                <Zombie />
              </ZombieIconWrapper>
            )}

            <div className="number">{this.props.number + 1}</div>
          </PlayerNumber>

          <FoulContainer isAlive={isAlive}>
            <RemoveFoul onClick={this.removeFoul} className={this.props.number === 7 && 'remove-foul'}>
              <FoulIcon remove>
                <MinimizeIcon size={'50%'} />
              </FoulIcon>
            </RemoveFoul>

            <AddFoul
              amount={this.state.foulsAmount}
              onClick={this.addFoul}
              className={this.props.number === 7 && 'add-foul'}
            >
              {this.state.foulsAmount ? (
                '!'.repeat(this.state.foulsAmount)
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
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { addFoul, removeFoul, changeGameState, skipVotingInc, skipVotingDec, returnPlayerToGame }
)(SingleCard);
