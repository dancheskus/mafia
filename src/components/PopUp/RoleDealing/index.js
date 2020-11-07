import React, { useState, useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { RandomCubeIcon, ListIcon } from 'icons/svgIcons';
import { clearSelectedNumbers, lightModeOff, numbersPanelNotClickable } from 'redux/actions/gameActions';
import useOnMount from 'helpers/useOnMount';
import { gameSelector, settingsSelector } from 'redux/selectors';

import { PopUpButton } from '../styled-components';
import RandomMode from './RandomMode';
import ManualMode from './ManualMode';
import { SvgWrapper } from './style';

const svgClassName = 'flex-grow-1 d-flex align-items-center justify-content-center';

export default () => {
  const { tutorialEnabled } = useSelector(settingsSelector);
  const {
    lightMode,
    gameState: { phase },
  } = useSelector(gameSelector);
  const dispatch = useDispatch();

  const [randomModeSelected, setRandomModeSelected] = useState(true);
  const [modeApproved, setModeApproved] = useState(false);

  useOnMount(() => {
    batch(() => {
      dispatch(numbersPanelNotClickable());
      dispatch(lightModeOff());
      dispatch(clearSelectedNumbers());
    });
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
          <RandomCubeIcon className={randomModeSelected ? 'selected' : null} size='100px' />
        </div>

        <div className={svgClassName} onClick={() => setRandomModeSelected(false)}>
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
