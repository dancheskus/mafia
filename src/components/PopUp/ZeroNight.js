import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PopUpButton, PopUpLabel } from './styled-components';
import Timer from '../Timer';
import { changeGameState } from 'redux/actions/gameActions';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';

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

const ZeroNight = props => {
  const [dogovorka, setDogovorka] = useState(true);

  const { mafiaTimer, tutorialEnabled } = props.settings;

  const startGame = () => props.changeGameState({ phase: 'Day', dayNumber: 1 });

  return (
    <>
      {dogovorka ? (
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
              <span>{props.players.findIndex(player => player.role === 'ШЕРИФ') + 1}</span>
              <div className='label'>ШЕРИФ</div>
            </Icon>
            <Icon>
              <TargetIcon />
              <span>{props.players.findIndex(player => player.role === 'ДОН') + 1}</span>
              <div className='label'>ДОН</div>
            </Icon>
          </TwoIcons>
          <PopUpButton onClick={startGame} color='ZeroNight'>
            День
          </PopUpButton>
        </>
      )}
    </>
  );
};

export default connect(
  ({ game, players, settings }) => ({ game, players, settings }),
  { changeGameState }
)(ZeroNight);
