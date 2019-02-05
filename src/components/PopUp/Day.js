import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearSelectedNumbers, closePopup, openPopup, changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';
import Timer from '../Timer';
import { CylinderIcon } from 'icons/svgIcons';
import colors from 'colors.js';

class Day extends Component {
  state = { killedPlayer: this.props.game.selectedNumbers[0] };

  componentWillUnmount = () => this.props.openPopup();

  componentDidMount = () => {
    this.props.clearSelectedNumbers();
    this.props.game.gameState.dayNumber === 1 && this.props.closePopup();
  };

  closePopup = () => {
    this.props.closePopup();
    this.state.killedPlayer >= 0 && this.props.killPlayer(this.state.killedPlayer);
    if (this.state.killedPlayer === this.props.game.activePlayer)
      this.props.changeGameState({ phase: 'Day', dayNumber: this.props.game.gameState.dayNumber });
    // В данном случае changeGameState используется только для вызова смены активного и открывающего игроков на +1.
  };

  render = () => (
    <>
      {this.state.killedPlayer >= 0 ? (
        <>
          <PopUpLabel className="h1">Убит</PopUpLabel>
          <PopUpCircle color="Night">{this.state.killedPlayer + 1}</PopUpCircle>
          <Timer />
        </>
      ) : (
        <>
          <PopUpLabel className="h1">Несострел</PopUpLabel>
          <PopUpCircle>
            <CylinderIcon fill={colors.Day.popupNightResult} size="80%" />
          </PopUpCircle>
        </>
      )}
      <PopUpButton color="Day" onClick={this.closePopup}>
        Закрыть
      </PopUpButton>
    </>
  );
}

export default connect(
  ({ game }) => ({ game }),
  { clearSelectedNumbers, closePopup, openPopup, killPlayer, changeGameState }
)(Day);
