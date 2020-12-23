import { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';

import { changeGameState, closePopup } from 'redux/actions/gameActions';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';
import Timer from 'components/Timer';
import { playersSelector, settingsSelector } from 'redux/selectors';
import ROLE from 'common/playerEnums';
import PHASE from 'common/phaseEnums';

import { PopUpButton, PopUpLabel } from '../styled-components';
import { Icon, TwoIcons } from './style';

export default function ZeroNight() {
  const dispatch = useDispatch();
  const { mafiaTimer, tutorialEnabled } = useSelector(settingsSelector);
  const players = useSelector(playersSelector);

  const [dogovorka, setDogovorka] = useState(true);

  const startGame = () => {
    batch(() => {
      dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 1 }));
      dispatch(closePopup());
    });
  };

  const findPlayerNumber = (role: ROLE) => players.findIndex(player => player.role === role) + 1;

  return dogovorka ? (
    <>
      <PopUpLabel color='ZeroNight' className='h1'>
        Договорка
      </PopUpLabel>

      {mafiaTimer && <Timer />}

      <PopUpButton onClick={() => !tutorialEnabled && setDogovorka(false)} color='ZeroNight'>
        Далее
      </PopUpButton>
    </>
  ) : (
    <>
      <TwoIcons>
        <Icon>
          <SheriffStarIcon size='86%' />

          <span data-testid='shariffPlayerNumber'>{findPlayerNumber(ROLE.SHERIF)}</span>

          <div className='label'>ШЕРИФ</div>
        </Icon>

        <Icon>
          <TargetIcon />

          <span data-testid='donPlayerNumber'>{findPlayerNumber(ROLE.DON)}</span>

          <div className='label'>ДОН</div>
        </Icon>
      </TwoIcons>

      <PopUpButton onClick={startGame} color='ZeroNight'>
        День
      </PopUpButton>
    </>
  );
}
