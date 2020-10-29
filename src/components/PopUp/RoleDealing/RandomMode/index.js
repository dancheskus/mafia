import React, { useEffect, useRef, useState } from 'react';
import { shuffle, concat, fill } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useTimer } from 'use-timer';

import {
  lightModeOff,
  lightModeOn,
  clearSelectedNumbers,
  changeGameState,
  replaceSelectedNumbersWith,
} from 'redux/actions/gameActions';
import { addRole } from 'redux/actions/playersActions';
import colors from 'style/colors';
import { EyeIcon, ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import usePreviousState from 'helpers/usePreviousState';

import { PressText, RoleName, ScaledPopUpButton, Card } from './style';

const { popupIcon, popupIconLight } = colors.RoleDealing;

const roleIcons = {
  МАФИЯ: <ThumbDownIcon size='30%' fill={popupIcon} />,
  ДОН: <DonRingIcon size='30%' fill={popupIcon} />,
  МИРНЫЙ: <ThumbUpIcon size='30%' fill={popupIconLight} />,
  ШЕРИФ: <SheriffOkIcon size='30%' fill={popupIconLight} />,
};

export default ({ resetMode }) => {
  const dispatch = useDispatch();
  const {
    game: { selectedNumbers, lightMode },
  } = useSelector(store => store);
  const [role, setRole] = useState(null);

  const playerNumber = selectedNumbers[0];

  const { start: startCardBlockingTimer, status: timerStatus } = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 1800,
    onTimeOver: () => {
      setRole(null);
      dispatch(lightModeOff());
      dispatch(replaceSelectedNumbersWith(playerNumber + 1 <= 9 ? playerNumber + 1 : 9));
    },
  });

  const { current: allRoles } = useRef(shuffle(concat(fill(Array(6), 'МИРНЫЙ'), 'ШЕРИФ', 'МАФИЯ', 'МАФИЯ', 'ДОН')));

  useEffect(() => {
    dispatch(replaceSelectedNumbersWith(0));
  }, [dispatch]);

  const prevSelectedNumbersLength = usePreviousState(selectedNumbers.length);

  useEffect(() => {
    // Возвращаемся на пред. страницу при "Новой игре", если выключена раздача номеров
    prevSelectedNumbersLength > 0 && !selectedNumbers.length && resetMode();
  });

  const showRole = () => {
    if (timerStatus === 'RUNNING' || !allRoles.length) return;

    const newRole = allRoles.pop();
    dispatch(addRole({ playerNumber, role: newRole }));
    setRole(newRole);
    if (newRole === 'МИРНЫЙ' || newRole === 'ШЕРИФ') dispatch(lightModeOn());

    startCardBlockingTimer();
  };

  const startGame = () => {
    dispatch(clearSelectedNumbers());
    dispatch(changeGameState({ phase: 'ZeroNight' }));
  };

  return (
    <Card onClick={showRole}>
      {!role && !!allRoles.length && (
        <>
          <EyeIcon size='40%' fill={popupIcon} />

          <PressText>Нажми</PressText>
        </>
      )}

      {!role && !allRoles.length && (
        <ScaledPopUpButton onClick={startGame} color='RoleDealing'>
          Играть
        </ScaledPopUpButton>
      )}

      {role && (
        <>
          {roleIcons[role]}
          <RoleName light={lightMode}>{role}</RoleName>
        </>
      )}
    </Card>
  );
};
