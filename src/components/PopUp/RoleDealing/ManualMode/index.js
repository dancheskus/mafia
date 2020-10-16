import React, { useEffect } from 'react';
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
import usePreviousState from 'helpers/usePreviousState';

import { Notification, RoleCard, RoleSelection, RoleSelectionWrapper } from './style';

const {
  RoleDealing: { popupIconLight, popupIcon },
} = colors;

export default ({ resetMode }) => {
  const dispatch = useDispatch();
  const {
    game: { selectedNumbers },
    players,
  } = useSelector(store => store);

  const prevSelectedNumbersLength = usePreviousState(selectedNumbers.length);

  useEffect(() => {
    // Возвращаемся на пред. страницу при "Новой игре", если выключена раздача номеров
    prevSelectedNumbersLength > 0 && selectedNumbers.length === 0 && resetMode();
  });

  useEffect(() => {
    dispatch(addToSelectedNumbers(0));
    dispatch(numbersPanelClickable());
  }, [dispatch]);

  const playerNumber = selectedNumbers[0];

  const changeSelection = (role, disabled) => {
    if (disabled) return;
    dispatch(addRole({ playerNumber, role }));
  };

  const startGameClicked = () => {
    dispatch(clearSelectedNumbers());
    dispatch(changeGameState({ phase: 'ZeroNight' }));
  };

  const currentPlayerRole = players[playerNumber]?.role || null;

  const { МАФИЯ, ШЕРИФ, ДОН } = countBy(players.map(({ role }) => role));
  const isButtonDisabled = МАФИЯ !== 2 || ШЕРИФ !== 1 || ДОН !== 1;
  const isDonDisabled = ДОН === 1 && currentPlayerRole !== 'ДОН';
  const isMafiaDisabled = МАФИЯ === 2 && currentPlayerRole !== 'МАФИЯ';
  const isSherifDisabled = ШЕРИФ === 1 && currentPlayerRole !== 'ШЕРИФ';

  return (
    <>
      <RoleSelectionWrapper className='role-selection-wrapper'>
        <RoleSelection>
          <RoleCard mirnij onClick={() => changeSelection('МИРНЫЙ')} selected={currentPlayerRole === 'МИРНЫЙ'}>
            <ThumbUpIcon size='60%' fill={popupIconLight} />
          </RoleCard>

          <RoleCard
            disabled={isDonDisabled}
            don
            onClick={() => changeSelection('ДОН', isDonDisabled)}
            selected={currentPlayerRole === 'ДОН'}
          >
            <DonRingIcon size='60%' fill={popupIcon} />
          </RoleCard>

          <RoleCard
            disabled={isMafiaDisabled}
            mafia
            onClick={() => changeSelection('МАФИЯ', isMafiaDisabled)}
            selected={currentPlayerRole === 'МАФИЯ'}
          >
            <ThumbDownIcon size='60%' fill={popupIcon} />
          </RoleCard>

          <RoleCard
            disabled={isSherifDisabled}
            sherif
            onClick={() => changeSelection('ШЕРИФ', isSherifDisabled)}
            selected={currentPlayerRole === 'ШЕРИФ'}
          >
            <SheriffOkIcon size='60%' fill={isSherifDisabled ? popupIcon : popupIconLight} />
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
