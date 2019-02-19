import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import checkForEnd from 'helpers/checkForEnd';
import { PopUpButton } from './styled-components/PopUpButton';
import { resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';

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

class EndOfGame extends Component {
  startNewGame = () => {
    this.props.resetGameReducer();
    this.props.resetPlayersReducer();
  };

  render = () => {
    const { black, red } = checkForEnd(this.props.players).allAlivePlayers;
    return (
      <GameResult>
        {black >= red ? 'Победа черных' : 'Победа красных'}
        <PopUpButton onClick={this.startNewGame} color={this.props.game.gameState.phase}>
          Новая игра
        </PopUpButton>
      </GameResult>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { resetGameReducer, resetPlayersReducer }
)(EndOfGame);
