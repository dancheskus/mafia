import React, { useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import useOnMount from 'helpers/useOnMount';
import { disableTutorial } from 'redux/actions/settingsActions';
import {
  resetGameReducer,
  changeGameState,
  minimizeMaximaizePopup,
  changeActivePlayer,
  clearSelectedNumbers,
} from 'redux/actions/gameActions';
import { resetPlayersReducer, addRole } from 'redux/actions/playersActions';
import usePreviousState from 'helpers/usePreviousState';
import { gameSelector, settingsSelector } from 'redux/selectors';

import {
  GuideWrapperStyle,
  GuideStepWrapperStyle,
  GuideStepTitleStyle,
  GuideStepContentStyle,
  GuideButton,
} from './style';
import stepDescription from './stepDescription';

const splitLines = text => text.split('\n').map(i => <p key={i}>{i}</p>);

export default ({ children }) => {
  const dispatch = useDispatch();
  const { tutorialEnabled, appMusic, seatAllocator } = useSelector(settingsSelector);
  const {
    gameState: { phase },
    popupMinimized,
    activePlayer,
  } = useSelector(gameSelector);

  const [currentStep, setCurrentStep] = useState(0);

  useOnMount(() => {
    if (!tutorialEnabled) return;

    batch(() => {
      dispatch(changeActivePlayer(0));
      popupMinimized && dispatch(minimizeMaximaizePopup());
    });

    if (phase === 'RoleDealing' || !seatAllocator) setCurrentStep(3);
    if (phase === 'ZeroNight') setCurrentStep(5);
    if (phase === 'Day') setCurrentStep(7);
  });

  const prevCurrentStep = usePreviousState(currentStep);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!tutorialEnabled) return;

    const stepChanged = prevCurrentStep !== currentStep;

    if ((phase === 'RoleDealing' || !seatAllocator) && currentStep === 0) setCurrentStep(3);

    if (stepChanged) {
      batch(() => {
        if (currentStep === 3) dispatch(changeGameState({ phase: 'RoleDealing' }));
        if (currentStep === 5) {
          dispatch(changeGameState({ phase: 'ZeroNight' }));
          dispatch(addRole({ playerNumber: 1, role: 'МАФИЯ' }));
          dispatch(addRole({ playerNumber: 2, role: 'МАФИЯ' }));
          dispatch(addRole({ playerNumber: 3, role: 'ДОН' }));
          dispatch(addRole({ playerNumber: 4, role: 'ШЕРИФ' }));

          for (let i = 5; i <= 9; i++) dispatch(addRole({ playerNumber: i, role: 'МИРНЫЙ' }));
        }
        if (currentStep === 7) {
          batch(() => {
            dispatch(clearSelectedNumbers());
            dispatch(changeGameState({ phase: 'Day', dayNumber: 1 }));
          });
        }
      });
    }

    if (!appMusic && currentStep === 3) setCurrentStep(4);

    if (currentStep < 7) {
      if (popupMinimized && currentStep !== 6) setCurrentStep(6);
      if (!popupMinimized && currentStep === 6) dispatch(minimizeMaximaizePopup());
    }

    if (activePlayer === 3 && currentStep !== 8) setCurrentStep(8);
  });

  const nextStep = () => setCurrentStep(currentStep + 1);

  const endGuide = () => {
    setCurrentStep(0);

    batch(() => {
      popupMinimized && dispatch(minimizeMaximaizePopup());
      dispatch(disableTutorial());
      dispatch(resetGameReducer());
      dispatch(resetPlayersReducer());
    });
  };

  const guideStepsAvaliable = currentStep < stepDescription.length - 1;
  const { position, title, content } = stepDescription[currentStep];

  return tutorialEnabled ? (
    <GuideWrapperStyle currentStep={currentStep}>
      <GuideStepWrapperStyle position={position}>
        {title && <GuideStepTitleStyle>{title}</GuideStepTitleStyle>}

        <GuideStepContentStyle>{splitLines(content)}</GuideStepContentStyle>
      </GuideStepWrapperStyle>

      <GuideButton guideNextStep onClick={guideStepsAvaliable ? nextStep : endGuide}>
        {guideStepsAvaliable ? 'Далее' : 'Завершить'}
      </GuideButton>

      {guideStepsAvaliable && (
        <GuideButton skipGuide onClick={endGuide}>
          Завершить
        </GuideButton>
      )}

      {children}
    </GuideWrapperStyle>
  ) : (
    children
  );
};
