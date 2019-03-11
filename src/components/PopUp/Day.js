import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { clearSelectedNumbers, closePopup, openPopup, changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';
import { PopUpLabel, PopUpButton, PopUpCircle } from './styled-components';
import Timer from '../Timer';
import { CylinderIcon } from 'icons/svgIcons';
import colors from 'colors.js';

const Day = props => {
  const killedPlayer =
    props.game.selectedNumbers[0] >= 0 ? props.game.selectedNumbers[0] : Number(localStorage.killedPlayer);

  useEffect(() => {
    props.clearSelectedNumbers();

    props.game.popupOpened && localStorage.setItem('killedPlayer', killedPlayer);

    props.game.gameState.dayNumber === 1 && props.closePopup();
  }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('killedPlayer');
      props.openPopup();
    };
  }, []);

  const closePopup = () => {
    props.closePopup();
    killedPlayer >= 0 && props.killPlayer(killedPlayer);
    if (killedPlayer === props.game.activePlayer)
      props.changeGameState({ phase: 'Day', dayNumber: props.game.gameState.dayNumber });
    // В данном случае changeGameState используется только для вызова смены активного и открывающего игроков на +1.
  };

  return (
    <>
      {killedPlayer >= 0 ? (
        <>
          <PopUpLabel className="h1">Убит</PopUpLabel>
          <PopUpCircle mini color="Night">
            {killedPlayer + 1}
          </PopUpCircle>
          <Timer killedOnLastMinute={!props.players[killedPlayer].isAlive} />
        </>
      ) : (
        <>
          <PopUpLabel className="h1">Несострел</PopUpLabel>
          <PopUpCircle>
            <CylinderIcon fill={colors.Day.popupNightResult} size="80%" />
          </PopUpCircle>
        </>
      )}
      <PopUpButton color="Day" onClick={closePopup}>
        Закрыть
      </PopUpButton>
    </>
  );
};

export default connect(
  ({ game, players }) => ({ game, players }),
  { clearSelectedNumbers, closePopup, openPopup, killPlayer, changeGameState }
)(Day);
