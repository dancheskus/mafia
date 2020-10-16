import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import colors from 'style/colors';
import { RandomCubeIcon, ListIcon } from 'icons/svgIcons';
import { clearSelectedNumbers, lightModeOff, numbersPanelNotClickable } from 'redux/actions/gameActions';

import { PopUpButton } from '../styled-components';
import RandomMode from './RandomMode';
import ManualMode from './ManualMode';

const SvgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 40%;
  flex-grow: 3;

  div:not(:last-child) {
    border-bottom: 2px solid ${colors.RoleDealing.dealingMode};
  }

  path {
    fill: ${props => (props.selected ? colors.RoleDealing.dealingModeSelected : colors.RoleDealing.dealingMode)};
    transition: fill 0.3s;
  }
  div:hover path,
  .selected path {
    fill: ${colors.RoleDealing.dealingModeSelected};
  }
`;

export default () => {
  const {
    settings: { tutorialEnabled },
    game: {
      lightMode,
      gameState: { phase },
    },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const [randomModeSelected, setRandomModeSelected] = useState(true);
  const [manualModeSelected, setManualModeSelected] = useState(false);
  const [modeApproved, setModeApproved] = useState(false);

  useEffect(() => {
    dispatch(clearSelectedNumbers());
    dispatch(lightModeOff());
    dispatch(numbersPanelNotClickable());

    if (tutorialEnabled && modeApproved === false) {
      setRandomModeSelected(false);
      setManualModeSelected(true);
      setModeApproved(true);
    }
  }, []);

  const resetMode = () => setModeApproved(false);

  const buttonClicked = () => setModeApproved(true);

  return (
    <>
      {!modeApproved ? (
        <>
          <SvgWrapper>
            <div
              className='flex-grow-1 d-flex align-items-center justify-content-center'
              onClick={() => {
                setRandomModeSelected(true);
                setManualModeSelected(false);
              }}
            >
              <RandomCubeIcon className={randomModeSelected ? 'selected' : null} size='100px' />
            </div>
            <div
              className='flex-grow-1 d-flex align-items-center justify-content-center'
              onClick={() => {
                setManualModeSelected(true);
                setRandomModeSelected(false);
              }}
            >
              <ListIcon className={manualModeSelected ? 'selected' : null} size='100px' />
            </div>
          </SvgWrapper>
          <div className='flex-grow-1 d-flex align-items-center'>
            <PopUpButton color={phase} light={lightMode} onClick={buttonClicked}>
              {randomModeSelected ? 'автоматически' : 'вручную'}
            </PopUpButton>
          </div>
        </>
      ) : randomModeSelected ? (
        <RandomMode resetMode={resetMode} />
      ) : (
        <ManualMode resetMode={resetMode} />
      )}
    </>
  );
};
