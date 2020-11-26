import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import useOnMount from 'helpers/useOnMount';
import checkForEnd from 'helpers/checkForEnd';
import { resetGameReducer, minimizeMaximaizePopup } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { gameSelector, playersSelector } from 'redux/selectors';

import { PopUpButton } from '../styled-components';
import { GameResult, KilledPlayer } from './style';

export default function EndOfGame() {
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);
  const {
    popupMinimized,
    selectedNumbers,
    gameState: { phase },
  } = useSelector(gameSelector);

  useOnMount(() => {
    popupMinimized && dispatch(minimizeMaximaizePopup());
  });

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
}