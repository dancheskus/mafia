import React, { useState } from 'react';
import { shuffle, concat, fill } from 'lodash';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useTimer } from 'use-timer';

import { lightModeOff, lightModeOn, replaceSelectedNumbersWith } from 'redux/actions/gameActions';
import { addRole } from 'redux/actions/playersActions';
import colors from 'style/colors';
import { EyeIcon, ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import useOnMount from 'helpers/useOnMount';
import { gameSelector, playersSelector } from 'redux/selectors';
import useOnUnmount from 'helpers/useOnUnmount';
import { playerIsRed, useGetAlivePlayersAmountByColor } from 'helpers/roleHelpers';
import getFromLocalStorage from 'helpers/getFromLocalStorage';

import { PressText, RoleName, ScaledPopUpButton, Card } from './style';
import useResetMode from '../useResetMode';
import startGame from '../startGame';

const { popupIcon, popupIconLight } = colors.RoleDealing;

const roleIcons = {
  МАФИЯ: <ThumbDownIcon size='30%' fill={popupIcon} />,
  ДОН: <DonRingIcon size='30%' fill={popupIcon} />,
  МИРНЫЙ: <ThumbUpIcon size='30%' fill={popupIconLight} />,
  ШЕРИФ: <SheriffOkIcon size='30%' fill={popupIconLight} />,
};

export default ({ resetMode }) => {
  const dispatch = useDispatch();
  const { selectedNumbers, lightMode } = useSelector(gameSelector);
  const players = useSelector(playersSelector);
  const [showRoleOnCard, setShowRoleOnCard] = useState(null);

  const lastCardRevealed = getFromLocalStorage('lastCardRevealed') ?? false;
  const allAliveRedPlayers = useGetAlivePlayersAmountByColor('red');

  const [playerNumber] = selectedNumbers;

  const { start: startCardBlockingTimer, status: timerStatus } = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 1800,
    onTimeOver: () => {
      playerNumber === players.length - 1 && localStorage.setItem('lastCardRevealed', true);
      const nextPlayerNumber = playerNumber + 1;
      setShowRoleOnCard(null);
      batch(() => {
        dispatch(lightModeOff());
        dispatch(replaceSelectedNumbersWith(nextPlayerNumber <= 9 ? nextPlayerNumber : 9));
      });
    },
  });

  useResetMode(resetMode);

  useOnMount(() => {
    batch(() => {
      if (allAliveRedPlayers === 10) {
        const shuffledRoles = shuffle(concat(fill(Array(6), 'МИРНЫЙ'), 'ШЕРИФ', 'МАФИЯ', 'МАФИЯ', 'ДОН'));
        shuffledRoles.forEach((role, playerNumber) => dispatch(addRole({ playerNumber, role })));
      }
      dispatch(replaceSelectedNumbersWith(selectedNumbers[0] ?? 0));
    });
  });

  useOnUnmount(() => {
    localStorage.removeItem('lastCardRevealed');
    dispatch(lightModeOff());
  });

  const showRole = () => {
    if (timerStatus === 'RUNNING' || lastCardRevealed) return;

    const { role } = players[playerNumber];
    setShowRoleOnCard(role);
    playerIsRed(role) && dispatch(lightModeOn());

    startCardBlockingTimer();
  };

  return (
    <Card onClick={showRole}>
      {!showRoleOnCard && !lastCardRevealed && (
        <>
          <EyeIcon size='40%' fill={popupIcon} />

          <PressText>Нажми</PressText>
        </>
      )}

      {!showRoleOnCard && lastCardRevealed && (
        <ScaledPopUpButton onClick={() => startGame(dispatch)} color='RoleDealing'>
          Играть
        </ScaledPopUpButton>
      )}

      {showRoleOnCard && (
        <>
          {roleIcons[showRoleOnCard]}

          <RoleName light={lightMode}>{showRoleOnCard}</RoleName>
        </>
      )}
    </Card>
  );
};
