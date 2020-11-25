/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RandomCubeIcon, ListIcon } from 'icons/svgIcons';
import { gameSelector, settingsSelector } from 'redux/selectors';
import getFromLocalStorage from 'helpers/getFromLocalStorage';
import useOnUnmount from 'helpers/useOnUnmount';

import { PopUpButton } from '../styled-components';
import RandomMode from './RandomMode';
import ManualMode from './ManualMode';
import SvgWrapper from './SvgWrapper';

const svgClassName = 'flex-grow-1 d-flex align-items-center justify-content-center';

export default () => {
  const { tutorialEnabled } = useSelector(settingsSelector);
  const { phase } = useSelector(gameSelector).gameState;

  const [randomModeSelected, setRandomModeSelected] = useState(getFromLocalStorage('randomModeSelected') ?? true);
  const [modeApproved, setModeApproved] = useState(getFromLocalStorage('modeApproved') ?? false);

  useEffect(() => {
    localStorage.setItem('randomModeSelected', randomModeSelected);
    localStorage.setItem('modeApproved', modeApproved);
  }, [randomModeSelected, modeApproved]);

  useOnUnmount(() => {
    localStorage.removeItem('randomModeSelected');
    localStorage.removeItem('modeApproved');
  });

  useEffect(() => {
    if (tutorialEnabled && modeApproved === false) {
      setModeApproved(true);
      setRandomModeSelected(false);
    }
  }, [tutorialEnabled, modeApproved]);

  const resetMode = () => setModeApproved(false);

  if (modeApproved)
    return randomModeSelected ? <RandomMode resetMode={resetMode} /> : <ManualMode resetMode={resetMode} />;

  return (
    <>
      <SvgWrapper>
        <div className={svgClassName} onClick={() => setRandomModeSelected(true)}>
          <RandomCubeIcon className={randomModeSelected ? 'selected' : undefined} size='100px' />
        </div>

        <div className={svgClassName} onClick={() => setRandomModeSelected(false)}>
          <ListIcon className={!randomModeSelected ? 'selected' : undefined} size='100px' />
        </div>
      </SvgWrapper>

      <div className='flex-grow-1 d-flex align-items-center'>
        <PopUpButton color={phase} onClick={() => setModeApproved(true)}>
          {randomModeSelected ? 'автоматически' : 'вручную'}
        </PopUpButton>
      </div>
    </>
  );
};
