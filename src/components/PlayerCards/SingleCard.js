import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MinimizeIcon, MaximizeIcon, NextIcon } from 'icons/svgIcons';
import { addFoul, removeFoul, returnPlayerToGame } from 'redux/actions/playersActions';
import { changeGameState, skipVotingInc, skipVotingDec } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';

import { FoulContainer, PlayerNumber, CardContainer, Card, RemoveFoul, AddFoul, FoulIcon, BackButton } from './style';

class SingleCard extends Component {
  state = { foulsAmount: this.props.players[this.props.playerNumber].fouls.amount, lastFoulDeath: false };

  timer;

  returnToLifeTimer;

  componentWillUnmount = () => {
    clearTimeout(this.timer);
    clearTimeout(this.returnToLifeTimer);
  };

  addFoul = () => {
    const {
      players,
      addFoul,
      skipVotingInc,
      playerNumber,
      changeGameState,
      game: {
        gameState: { phase },
      },
    } = this.props;
    const { foulsAmount } = this.state;

    if (foulsAmount === 4) return;

    this.setState({ foulsAmount: foulsAmount + 1 });

    if (foulsAmount !== 3) return addFoul(playerNumber);

    this.timer = setTimeout(() => {
      addFoul(playerNumber);

      if (checkForEnd(players).status) return changeGameState({ phase: 'EndOfGame' });

      if (phase === 'Day') {
        this.setState({ lastFoulDeath: true });

        this.returnToLifeTimer = setTimeout(() => {
          this.setState({ lastFoulDeath: false });
        }, 5000);
      }

      skipVotingInc();
    }, 2000);
  };

  removeFoul = () => {
    const { removeFoul, playerNumber } = this.props;
    const { foulsAmount } = this.state;

    if (foulsAmount === 0) return;
    this.setState({ foulsAmount: foulsAmount - 1 });
    if (foulsAmount === 4) {
      clearTimeout(this.timer);
    } else {
      removeFoul(playerNumber);
    }
  };

  backToLife = () => {
    const { returnPlayerToGame, playerNumber, skipVotingDec } = this.props;

    clearTimeout(this.returnToLifeTimer);
    returnPlayerToGame(playerNumber);
    skipVotingDec();
    this.setState({ foulsAmount: 3, lastFoulDeath: false });
  };

  render = () => {
    const { backToLife, removeFoul, addFoul } = this;
    const { lastFoulDeath, foulsAmount } = this.state;
    const {
      order,
      playerNumber,
      players,
      game: {
        activePlayer,
        opensTable,
        gameState: { phase },
      },
    } = this.props;

    const {
      isAlive,
      role,
      fouls: { muted },
    } = players[playerNumber];

    return (
      <CardContainer order={order}>
        <Card isAlive={isAlive} activePlayer={phase === 'Day' && activePlayer === playerNumber}>
          <PlayerNumber
            darkSide={role === 'МАФИЯ' || role === 'ДОН'}
            role={role}
            isMuted={muted}
            isAlive={isAlive}
            opensTable={phase === 'Day' && opensTable === playerNumber}
          >
            {lastFoulDeath && (
              <BackButton onClick={backToLife}>
                <NextIcon fill='lightgrey' />
              </BackButton>
            )}

            <div className='number'>{playerNumber + 1}</div>
          </PlayerNumber>

          <FoulContainer isAlive={isAlive}>
            <RemoveFoul onClick={removeFoul} className={playerNumber === 7 && 'remove-foul'}>
              <FoulIcon remove>
                <MinimizeIcon size='50%' />
              </FoulIcon>
            </RemoveFoul>

            <AddFoul amount={foulsAmount} onClick={addFoul} className={playerNumber === 7 && 'add-foul'}>
              {foulsAmount ? (
                '!'.repeat(foulsAmount)
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
