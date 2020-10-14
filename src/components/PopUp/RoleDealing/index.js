import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from 'colors.js';
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

const RoleDealing = props => {
  const [randomModeSelected, setRandomModeSelected] = useState(true);
  const [manualModeSelected, setManualModeSelected] = useState(false);
  const [modeApproved, setModeApproved] = useState(false);

  useEffect(() => {
    props.clearSelectedNumbers();
    props.lightModeOff();
    props.numbersPanelNotClickable();

    if (props.settings.tutorialEnabled && modeApproved === false) {
      setRandomModeSelected(false);
      setManualModeSelected(true);
      setModeApproved(true);
    }
  }, []);

  const resetMode = () => setModeApproved(false);

  const buttonClicked = () => setModeApproved(true);

  const { lightMode } = props.game;

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
            <PopUpButton color={props.game.gameState.phase} light={lightMode} onClick={buttonClicked}>
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

export default connect(({ game, settings }) => ({ game, settings }), {
  clearSelectedNumbers,
  lightModeOff,
  numbersPanelNotClickable,
})(RoleDealing);
