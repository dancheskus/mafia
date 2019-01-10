// КОМПОНЕНТ ДОЛЖЕН ПРИНИМАТЬ:
// 1. список уходящих игроков
// 2. коллбэк уводящий в ночь

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PopUpCircle, PopUpButton } from '../styled-components';
import Timer from 'components/Timer';

class PlayersLastMinute extends Component {
  state = { currentPlayer: 0, listOfPlayers: this.props.listOfPlayers };

  nextPlayer = () => this.setState({ currentPlayer: this.state.currentPlayer + 1 });

  render = () => {
    const { currentPlayer, listOfPlayers } = this.state;
    const lastPlayer = listOfPlayers.length - 1 - currentPlayer === 0;

    return (
      <>
        <PopUpCircle>{listOfPlayers[currentPlayer] + 1}</PopUpCircle>

        <Timer key={currentPlayer} killedOnLastMinute={this.props.killedOnLastMinute[currentPlayer]} />

        <PopUpButton color="Voting" onClick={lastPlayer ? this.props.goToNight : this.nextPlayer}>
          {lastPlayer ? 'Ночь' : 'Далее'}
        </PopUpButton>
      </>
    );
  };
}

export default connect(({ game }) => ({ game }))(PlayersLastMinute);
