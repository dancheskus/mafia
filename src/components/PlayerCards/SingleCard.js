import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MinimizeIcon, MaximizeIcon, NextIcon } from 'icons/svgIcons';
import { addFoul, removeFoul, returnPlayerToGame } from 'redux/actions/playersActions';
import { changeGameState, skipVotingInc, skipVotingDec } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';

import { FoulContainer, PlayerNumber, CardContainer, Card, RemoveFoul, AddFoul, FoulIcon, BackButton } from './style';

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

      if (this.props.game.gameState.phase === 'Day') {
        this.setState({ lastFoulDeath: true });

        this.returnToLifeTimer = setTimeout(() => {
          this.setState({ lastFoulDeath: false });
        }, 5000);
      }

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
    const { isAlive } = this.props.players[this.props.number];
    const { phase } = this.props.game.gameState;
    const { role } = this.props.players[this.props.number];

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
            {this.state.lastFoulDeath && (
              <BackButton onClick={this.backToLife}>
                <NextIcon fill='lightgrey' />
              </BackButton>
            )}

            <div className='number'>{this.props.number + 1}</div>
          </PlayerNumber>

          <FoulContainer isAlive={isAlive}>
            <RemoveFoul onClick={this.removeFoul} className={this.props.number === 7 && 'remove-foul'}>
              <FoulIcon remove>
                <MinimizeIcon size='50%' />
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
                  <MaximizeIcon size='50%' />
                </FoulIcon>
              )}
            </AddFoul>
          </FoulContainer>
        </Card>
      </CardContainer>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }), {
  addFoul,
  removeFoul,
  changeGameState,
  skipVotingInc,
  skipVotingDec,
  returnPlayerToGame,
})(SingleCard);
