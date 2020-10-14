import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import checkForEnd from 'helpers/checkForEnd';
import { resetGameReducer, minimizeMaximaizePopup } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { PopUpButton } from './styled-components/PopUpButton';

const GameResult = styled.div`
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
`;

const KilledPlayer = styled.div`
  font-size: 1.3rem;
  color: red;
`;

class EndOfGame extends Component {
  componentDidMount = () => {
    this.props.game.popupMinimized && this.props.minimizeMaximaizePopup();
  };

  startNewGame = () => {
    this.props.resetGameReducer();
    this.props.resetPlayersReducer();
  };

  render = () => {
    const { black, red } = checkForEnd(this.props.players).allAlivePlayers;
    const justKilledPlayer = this.props.game.selectedNumbers[0];

    return (
      <GameResult>
        Победа {black >= red ? ' черных' : ' красных'}
        {justKilledPlayer >= 0 && <KilledPlayer>Ночью был убит {justKilledPlayer + 1} игрок.</KilledPlayer>}
        <PopUpButton onClick={this.startNewGame} color={this.props.game.gameState.phase}>
          Новая игра
        </PopUpButton>
      </GameResult>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }), {
  resetGameReducer,
  resetPlayersReducer,
  minimizeMaximaizePopup,
})(EndOfGame);
