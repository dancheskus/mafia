import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RandomCubeIcon, ListIcon } from 'icons/svgIcons';
import { clearSelectedNumbers, lightModeOff, numbersPanelNotClickable } from 'redux/actions/gameActions';

import { PopUpButton } from '../styled-components';
import RandomMode from './RandomMode';
import ManualMode from './ManualMode';
import { SvgWrapper } from './style';

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
  const [modeApproved, setModeApproved] = useState(false);

  useEffect(() => {
    dispatch(numbersPanelNotClickable());
    dispatch(lightModeOff());
    dispatch(clearSelectedNumbers());
  }, [dispatch]);

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
        <div
          className='flex-grow-1 d-flex align-items-center justify-content-center'
          onClick={() => setRandomModeSelected(true)}
        >
          <RandomCubeIcon className={randomModeSelected ? 'selected' : null} size='100px' />
        </div>

        <div
          className='flex-grow-1 d-flex align-items-center justify-content-center'
          onClick={() => setRandomModeSelected(false)}
        >
          <ListIcon className={!randomModeSelected ? 'selected' : null} size='100px' />
        </div>
      </SvgWrapper>

      <div className='flex-grow-1 d-flex align-items-center'>
        <PopUpButton color={phase} light={lightMode} onClick={() => setModeApproved(true)}>
          {randomModeSelected ? 'автоматически' : 'вручную'}
        </PopUpButton>
      </div>
    </>
  );
};
