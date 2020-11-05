import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { changeGameState } from 'redux/actions/gameActions';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';
import Timer from 'components/Timer';
import { playersSelector, settingsSelector } from 'redux/selectors';

import { PopUpButton, PopUpLabel } from '../styled-components';
import { Icon, TwoIcons } from './style';

export default () => {
  const dispatch = useDispatch();
  const { mafiaTimer, tutorialEnabled } = useSelector(settingsSelector);
  const players = useSelector(playersSelector);

  const [dogovorka, setDogovorka] = useState(true);

  const startGame = () => dispatch(changeGameState({ phase: 'Day', dayNumber: 1 }));

  const findPlayerNumber = role => players.findIndex(player => player.role === role) + 1;

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

          <span>{findPlayerNumber('ШЕРИФ')}</span>

          <div className='label'>ШЕРИФ</div>
        </Icon>

        <Icon>
          <TargetIcon />

          <span>{findPlayerNumber('ДОН')}</span>

          <div className='label'>ДОН</div>
        </Icon>
      </TwoIcons>

      <PopUpButton onClick={startGame} color='ZeroNight'>
        День
      </PopUpButton>
    </>
  );
};
