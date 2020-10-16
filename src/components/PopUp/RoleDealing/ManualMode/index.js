import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countBy } from 'lodash';

import { addRole } from 'redux/actions/playersActions';
import {
  changeGameState,
  numbersPanelClickable,
  addToSelectedNumbers,
  clearSelectedNumbers,
} from 'redux/actions/gameActions';
import colors from 'style/colors';
import { ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import { PopUpButton } from 'components/PopUp/styled-components';

import { Notification, RoleCard, RoleSelection, RoleSelectionWrapper } from './style';

export default ({ resetMode }) => {
  const dispatch = useDispatch();
  const { game, players } = useSelector(store => store);

  const prevSelectedNumbersLengthRef = useRef();
  useEffect(() => {
    prevSelectedNumbersLengthRef.current = game.selectedNumbers.length;
  });
  const prevSelectedNumbersLength = prevSelectedNumbersLengthRef.current;

  useEffect(() => {
    // Возвращаемся на пред. страницу при "Новой игре", если выключена раздача номеров
    prevSelectedNumbersLength > 0 && game.selectedNumbers.length === 0 && resetMode();
  });

  useEffect(() => {
    dispatch(addToSelectedNumbers(0));
    dispatch(numbersPanelClickable());
  }, [dispatch]);

  const changeSelection = (role, disabled) => {
    if (disabled) return;
    dispatch(addRole({ playerNumber: game.selectedNumbers[0], role }));
  };

  const startGameClicked = () => {
    dispatch(clearSelectedNumbers());
    dispatch(changeGameState({ phase: 'ZeroNight' }));
  };

  const currentPlayerRole = players[game.selectedNumbers[0]] ? players[game.selectedNumbers[0]].role : null;

  const { МАФИЯ, ШЕРИФ, ДОН } = countBy(players.map(player => player.role));
  const isButtonDisabled = МАФИЯ !== 2 || ШЕРИФ !== 1 || ДОН !== 1;
  const isDonDisabled = ДОН === 1 && currentPlayerRole !== 'ДОН';
  const isMafiaDisabled = МАФИЯ === 2 && currentPlayerRole !== 'МАФИЯ';
  const isSherifDisabled = ШЕРИФ === 1 && currentPlayerRole !== 'ШЕРИФ';

  return (
    <>
      <RoleSelectionWrapper className='role-selection-wrapper'>
        <RoleSelection>
          <RoleCard mirnij onClick={() => changeSelection('МИРНЫЙ')} selected={currentPlayerRole === 'МИРНЫЙ'}>
            <ThumbUpIcon size='60%' fill={colors.RoleDealing.popupIconLight} />
          </RoleCard>

          <RoleCard
            disabled={isDonDisabled}
            don
            onClick={() => changeSelection('ДОН', isDonDisabled)}
            selected={currentPlayerRole === 'ДОН'}
          >
            <DonRingIcon size='60%' fill={colors.RoleDealing.popupIcon} />
          </RoleCard>

          <RoleCard
            disabled={isMafiaDisabled}
            mafia
            onClick={() => changeSelection('МАФИЯ', isMafiaDisabled)}
            selected={currentPlayerRole === 'МАФИЯ'}
          >
            <ThumbDownIcon size='60%' fill={colors.RoleDealing.popupIcon} />
          </RoleCard>

          <RoleCard
            disabled={isSherifDisabled}
            sherif
            onClick={() => changeSelection('ШЕРИФ', isSherifDisabled)}
            selected={currentPlayerRole === 'ШЕРИФ'}
          >
            <SheriffOkIcon
              size='60%'
              fill={isSherifDisabled ? colors.RoleDealing.popupIcon : colors.RoleDealing.popupIconLight}
            />
          </RoleCard>
        </RoleSelection>
      </RoleSelectionWrapper>

      <Notification disabled={isButtonDisabled}>Выберите все функциональные роли (2 Мафии, Дон и Шериф)</Notification>

      <div className='flex-grow-1 d-flex align-items-center'>
        <PopUpButton onClick={startGameClicked} color='RoleDealing' disabled={isButtonDisabled}>
          Играть
        </PopUpButton>
      </div>
    </>
  );
};
