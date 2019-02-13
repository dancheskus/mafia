import React, { Component } from 'react';
import { connect } from 'react-redux';

import CarCrashNotification from './CarCrashNotification';
import { PopUpButton, PopUpCircle, PopUpLabel } from '../styled-components/';
import Timer from 'components/Timer';
import VictimSelector from 'components/common/VictimSelector';

class CarCrash extends Component {
  state = { notification: true, currentPlayer: 0, selectedNumber: null };

  closeNotification = () => this.setState({ notification: false });

  nextPlayer = () => this.setState({ currentPlayer: this.state.currentPlayer + 1 });

  onNumberSelected = num => {
    this.setState({ selectedNumber: num + 1 === this.state.selectedNumber ? null : num + 1 });
  };

  stopVoting = () => {
    const alivePlayers = this.props.players.filter(player => player.isAlive).length;

    this.props.votingFinishedClicked(this.state.selectedNumber > alivePlayers / 2);
  };

  render = () => {
    const { selectedNumbers } = this.props.game;
    const { currentPlayer } = this.state;
    const lastPlayer = currentPlayer === selectedNumbers.length - 1;
    const deadPlayers = this.props.players.filter(player => !player.isAlive).length;

    if (this.props.secondTime)
      return (
        <>
          <PopUpLabel className="h2">Выгнать всех выставленных?</PopUpLabel>

          <VictimSelector onNumberSelected={this.onNumberSelected} votesLeft={9 - deadPlayers} />

          <PopUpButton color="Voting" onClick={this.stopVoting}>
            Завершить
          </PopUpButton>
        </>
      );

    if (this.state.notification) return <CarCrashNotification closeNotification={this.closeNotification} />;

    return (
      <>
        <PopUpCircle>{selectedNumbers[currentPlayer] + 1}</PopUpCircle>

        <Timer time={30} key={currentPlayer} />

        <PopUpButton color="Voting" onClick={lastPlayer ? this.props.closeCarCrash : this.nextPlayer}>
          {lastPlayer ? 'Завершить' : 'Далее'}
        </PopUpButton>
      </>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }))(CarCrash);
