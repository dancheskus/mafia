import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import checkForEnd from '../../helpers/checkForEnd';

const GameResult = styled.div`
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
`;

class EndOfGame extends Component {
  render = () => {
    const { black, red } = checkForEnd(this.props.players).allAlivePlayers;
    return (
      <>
        <GameResult>{black === red ? 'Победа черных' : 'Победа красных'}</GameResult>
      </>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }))(EndOfGame);
