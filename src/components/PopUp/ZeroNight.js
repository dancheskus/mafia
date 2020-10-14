import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeGameState } from 'redux/actions/gameActions';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';
import { PopUpButton, PopUpLabel } from './styled-components';
import Timer from '../Timer';

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 2rem;
    position: absolute;
  }

  .label {
    color: white;
    position: absolute;
    bottom: -30%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 170%;
  }
`;

const TwoIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;

  @media (max-width: 767px) {
    width: 80%;
  }
`;

export default () => {
  const dispatch = useDispatch();
  const {
    players,
    settings: { mafiaTimer, tutorialEnabled },
  } = useSelector(store => store);

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
