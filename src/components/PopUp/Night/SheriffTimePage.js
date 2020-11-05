import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TargetIcon, NextIcon } from 'icons/svgIcons';
import { killPlayer } from 'redux/actions/playersActions';
import { changeGameState, addToSelectedNumbers } from 'redux/actions/gameActions';
import checkForEnd from 'helpers/checkForEnd';
import { gameSelector, playersSelector } from 'redux/selectors';

import { BackButton, BlackTeamPlayers, Target } from './style';
import { PopUpButton, PopUpLabel } from '../styled-components';

export default ({ setSheriffTime, playerToKill }) => {
  const dispatch = useDispatch();
  const { dayNumber } = useSelector(gameSelector).gameState;
  const players = useSelector(playersSelector);

  const goToDayPressed = () => {
    const gameEnded = checkForEnd(players, [playerToKill]).status;

    playerToKill >= 0 && dispatch(addToSelectedNumbers(playerToKill));

    if (gameEnded) {
      // Если мы сейчас перейдем на окончание игры, то убиваем игрока перед последним экраном
      playerToKill >= 0 && dispatch(killPlayer(playerToKill));

      dispatch(changeGameState({ phase: 'EndOfGame' }));
    } else {
      // Если переходим в день то убъем игрока после его последней минуты в дневном экране
      dispatch(changeGameState({ phase: 'Day', dayNumber: dayNumber + 1 }));
    }
  };

  const allBlackPlayerNumbers = players.flatMap(({ role }, i) => (role === 'МАФИЯ' || role === 'ДОН' ? i : []));

  return (
    <>
      <BackButton onClick={() => setSheriffTime(false)}>
        <NextIcon />
      </BackButton>

      <PopUpLabel color='Night' className='h2'>
        Шериф ищет черных игроков
      </PopUpLabel>

      <BlackTeamPlayers>
        {allBlackPlayerNumbers.map(plNum => (
          <Target key={plNum}>
            <TargetIcon size='100%' />

            <span>{plNum + 1}</span>
          </Target>
        ))}
      </BlackTeamPlayers>

      <PopUpButton onClick={goToDayPressed} color='Night'>
        День
      </PopUpButton>
    </>
  );
};
