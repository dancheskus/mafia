import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import checkForEnd from 'helpers/checkForEnd';
import { resetGameReducer, minimizeMaximaizePopup } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';

import { PopUpButton } from '../styled-components';
import { GameResult, KilledPlayer } from './style';

export default () => {
  const dispatch = useDispatch();
  const {
    game: {
      popupMinimized,
      selectedNumbers,
      gameState: { phase },
    },
    players,
  } = useSelector(store => store);

  useEffect(() => {
    popupMinimized && dispatch(minimizeMaximaizePopup());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startNewGame = () => {
    batch(() => {
      dispatch(resetGameReducer());
      dispatch(resetPlayersReducer());
    });
  };

  const { black, red } = checkForEnd(players).allAlivePlayers;
  const [justKilledPlayer] = selectedNumbers;

  return (
    <GameResult>
      Победа {black >= red ? ' черных' : ' красных'}
      {justKilledPlayer >= 0 && <KilledPlayer>Ночью был убит {justKilledPlayer + 1} игрок.</KilledPlayer>}
      <PopUpButton onClick={startNewGame} color={phase}>
        Новая игра
      </PopUpButton>
    </GameResult>
  );
};
