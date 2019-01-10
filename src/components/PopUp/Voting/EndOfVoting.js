import React, { Component } from 'react';
import { connect } from 'react-redux';

import { killPlayer } from 'redux/actions/playersActions';
import { clearSelectedNumbers, changeGameState, skipVotingDec } from './../../../redux/actions/gameActions';
import { ResultsNumbers } from './styled-components/Results';
import { PopUpLabel, PopUpButton } from '../styled-components';
import TimerForPlayer from './TimerForPlayer';

class EndOfVoting extends Component {
  state = { notification: true, alivePlayers: this.props.players.filter(player => player.isAlive).length };

  componentDidUpdate = () => {
    const newDeadPlayer = this.state.alivePlayers !== this.props.players.filter(player => player.isAlive).length;
    newDeadPlayer && this.newDeadPlayer();
  };

  killedOnLastMinute = Array(this.props.lastMinuteFor.length).fill(false);

  newDeadPlayer = () => {
    const { lastMinuteFor, players, skipVotingDec } = this.props;

    lastMinuteFor.forEach((plNum, i) => {
      if (!players[plNum].isAlive && !this.killedOnLastMinute[i]) {
        skipVotingDec();
        this.killedOnLastMinute[i] = true;
      }
    });

    this.setState({ alivePlayers: players.filter(player => player.isAlive).length });
  };

  closeNotification = () => this.setState({ notification: false });

  goToNight = () => {
    this.props.clearSelectedNumbers();
    this.props.lastMinuteFor.length === 0 && this.props.skipVotingDec();
    this.props.changeGameState({ phase: 'Night' });

    this.props.lastMinuteFor.map(plNum => this.props.killPlayer(plNum));
  };

  render = () => {
    const {
      lastMinuteFor,
      game: { gameState, selectedNumbers, skipVoting },
    } = this.props;

    if ((gameState.dayNumber === 1 && selectedNumbers.length === 1) || (skipVoting && lastMinuteFor.length === 0))
      return (
        <>
          <PopUpLabel className="h2">Голосование не проводится</PopUpLabel>
          {skipVoting > 0 && <PopUpLabel className="h3">Игрок получил 4-й фол</PopUpLabel>}

          <PopUpButton color="Voting" onClick={this.goToNight}>
            Ночь
          </PopUpButton>
        </>
      );

    if (this.state.notification)
      return (
        <>
          {lastMinuteFor.length > 0 ? (
            <>
              <PopUpLabel className="h1">Игру покидает</PopUpLabel>
              <ResultsNumbers>
                {lastMinuteFor.map(num => (
                  <div key={num}>{num + 1}</div>
                ))}
              </ResultsNumbers>

              <PopUpButton color="Voting" onClick={this.closeNotification}>
                ОК
              </PopUpButton>
            </>
          ) : (
            <>
              <PopUpLabel className="h1">Никто не уходит</PopUpLabel>
              <PopUpButton color="Voting" onClick={this.goToNight}>
                Ночь
              </PopUpButton>
            </>
          )}
        </>
      );

    return <TimerForPlayer listOfPlayers={lastMinuteFor} goToNight={this.goToNight} />;
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { killPlayer, clearSelectedNumbers, changeGameState, skipVotingDec }
)(EndOfVoting);
