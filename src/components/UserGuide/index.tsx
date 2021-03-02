import { ReactNode, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
import ROLE from 'common/playerEnums';
import PHASE from 'common/phaseEnums';
import { cleanRoleDealingLocalStorage } from 'components/PopUp/RoleDealing';

import {
  GuideWrapperStyle,
  GuideStepWrapperStyle,
  GuideStepTitleStyle,
  GuideStepContentStyle,
  GuideButton,
} from './style';
import stepDescription from './stepDescription';

const splitLines = (text: string) => text.split('\n').map(i => <p key={i}>{i}</p>);

const UserGuide = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { tutorialEnabled, appMusic, seatAllocator } = useSelector(settingsSelector);
  const {
    gameState: { phase },
    popupMinimized,
    activePlayer,
    selectedNumbers,
  } = useSelector(gameSelector);

  const [currentStep, setCurrentStep] = useState(0);

  useOnMount(() => {
    if (!tutorialEnabled) return;

    batch(() => {
      dispatch(changeActivePlayer(0));
      popupMinimized && dispatch(minimizeMaximaizePopup());
    });

    if (phase === PHASE.ROLEDEALING || !seatAllocator) setCurrentStep(3);
    if (phase === PHASE.ZERONIGHT) setCurrentStep(5);
    if (phase === PHASE.DAY) setCurrentStep(7);
  });

  const prevCurrentStep = usePreviousState(currentStep);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!tutorialEnabled) return;

    const stepChanged = prevCurrentStep !== currentStep;

    if ((phase === PHASE.ROLEDEALING || !seatAllocator) && currentStep === 0) setCurrentStep(3);

    if (currentStep === 1 && selectedNumbers.length === 3) setCurrentStep(2);

    if (stepChanged) {
      batch(() => {
        if (currentStep === 3) dispatch(changeGameState({ phase: PHASE.ROLEDEALING }));
        if (currentStep === 5) {
          dispatch(changeGameState({ phase: PHASE.ZERONIGHT }));
          [ROLE.MAFIA, ROLE.MAFIA, ROLE.DON, ROLE.SHERIF].forEach((role, playerNumber) =>
            dispatch(addRole({ playerNumber, role })),
          );
        }
        if (currentStep === 7) {
          dispatch(clearSelectedNumbers());
          dispatch(changeGameState({ phase: PHASE.DAY, dayNumber: 1 }));
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

    cleanRoleDealingLocalStorage();
  };

  const guideStepsAvaliable = currentStep < stepDescription.length - 1;
  const { position, title, content } = stepDescription[currentStep];

  return tutorialEnabled ? (
    <GuideWrapperStyle currentStep={currentStep}>
      <GuideStepWrapperStyle position={position}>
        {title && <GuideStepTitleStyle>{title}</GuideStepTitleStyle>}

        <GuideStepContentStyle>{splitLines(content)}</GuideStepContentStyle>
      </GuideStepWrapperStyle>

      {guideStepsAvaliable && (
        <GuideButton light skipGuide onClick={endGuide}>
          {t('finishButton')}
        </GuideButton>
      )}

      <GuideButton guideNextStep onClick={guideStepsAvaliable ? nextStep : endGuide}>
        {guideStepsAvaliable ? t('nextButton') : t('finishButton')}
      </GuideButton>

      {children}
    </GuideWrapperStyle>
  ) : (
    children
  );
};

export default UserGuide;
