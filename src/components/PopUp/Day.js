import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearSelectedNumbers, closePopup, openPopup, changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { CylinderIcon } from 'icons/svgIcons';
import colors from 'style/colors';

import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';
import Timer from '../Timer';

class Day extends Component {
  killedPlayer =
    this.props.game.selectedNumbers[0] >= 0 ? this.props.game.selectedNumbers[0] : Number(localStorage.killedPlayer);

  componentWillUnmount = () => {
    localStorage.removeItem('killedPlayer');
    this.props.openPopup();
  };

  componentDidMount = () => {
    const {
      closePopup,
      game: {
        popupOpened,
        gameState: { dayNumber },
      },
      clearSelectedNumbers,
    } = this.props;

    clearSelectedNumbers();

    popupOpened && localStorage.setItem('killedPlayer', this.killedPlayer);

    dayNumber === 1 && closePopup();
  };

  _closePopup = () => {
    const { killedPlayer } = this;
    const { closePopup, killPlayer, game, changeGameState } = this.props;

    closePopup();
    killedPlayer >= 0 && killPlayer(killedPlayer);
    if (killedPlayer === game.activePlayer) changeGameState({ phase: 'Day', dayNumber: game.gameState.dayNumber });
    // В данном случае changeGameState используется только для вызова смены активного и открывающего игроков на +1.
  };

  render = () => {
    const {
      killedPlayer,
      _closePopup,
      props: {
        game: { popupOpened },
        players,
      },
    } = this;

    return (
      <>
        {killedPlayer >= 0 ? (
          <>
            <PopUpLabel className='h1'>Убит</PopUpLabel>

            <PopUpCircle mini color='Night'>
              {killedPlayer + 1}
            </PopUpCircle>

            <Timer killedOnLastMinute={!players[killedPlayer].isAlive} key={popupOpened} />
          </>
        ) : (
          <>
            <PopUpLabel className='h1'>Несострел</PopUpLabel>

            <PopUpCircle>
              <CylinderIcon fill={colors.Day.popupNightResult} size='80%' />
            </PopUpCircle>
          </>
        )}

        <PopUpButton color='Day' onClick={_closePopup}>
          Закрыть
        </PopUpButton>
      </>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }), {
  clearSelectedNumbers,
  closePopup,
  openPopup,
  killPlayer,
  changeGameState,
})(Day);
