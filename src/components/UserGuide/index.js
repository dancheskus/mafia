import React, { Component } from 'react';
import { connect } from 'react-redux';

import { disableTutorial } from 'redux/actions/settingsActions';
import {
  resetGameReducer,
  changeGameState,
  minimizeMaximaizePopup,
  changeActivePlayer,
} from 'redux/actions/gameActions';
import { resetPlayersReducer, addRole } from 'redux/actions/playersActions';

import {
  GuideWrapperStyle,
  GuideStepWrapperStyle,
  GuideStepTitleStyle,
  GuideStepContentStyle,
  GuideButton,
} from './style';
import stepDescription from './stepDescription';

const splitLines = text => text.split('\n').map(i => <p key={i}>{i}</p>);

class UsersGuide extends Component {
  state = { currentStep: 0 };

  componentDidMount = () => {
    const {
      game: {
        gameState: { phase },
        popupMinimized,
      },
      settings,
      changeActivePlayer,
      minimizeMaximaizePopup,
    } = this.props;

    if (!settings.tutorialEnabled) return;

    changeActivePlayer(0);

    popupMinimized && minimizeMaximaizePopup();

    if (phase === 'RoleDealing' || !settings.seatAllocator) this.setState({ currentStep: 3 });
    if (phase === 'ZeroNight') this.setState({ currentStep: 5 });
    if (phase === 'Day') this.setState({ currentStep: 7 });
  };

  componentDidUpdate = (_, prevState) => {
    const {
      changeGameState,
      settings: { appMusic, tutorialEnabled, seatAllocator },
      game: {
        popupMinimized,
        activePlayer,
        gameState: { phase },
      },
      addRole,
      minimizeMaximaizePopup,
    } = this.props;
    const { currentStep } = this.state;

    if (!tutorialEnabled) return;

    const stepChanged = prevState.currentStep !== currentStep;

    if ((phase === 'RoleDealing' || !seatAllocator) && currentStep === 0) this.setState({ currentStep: 3 });

    if (stepChanged) {
      if (currentStep === 3) changeGameState({ phase: 'RoleDealing' });
      if (currentStep === 5) {
        changeGameState({ phase: 'ZeroNight' });
        addRole({ playerNumber: 1, role: 'МАФИЯ' });
        addRole({ playerNumber: 2, role: 'МАФИЯ' });
        addRole({ playerNumber: 3, role: 'ДОН' });
        addRole({ playerNumber: 4, role: 'ШЕРИФ' });

        for (let i = 5; i <= 9; i++) addRole({ playerNumber: i, role: 'МИРНЫЙ' });
      }
      if (currentStep === 7) changeGameState({ phase: 'Day', dayNumber: 1 });
    }

    if (!appMusic && currentStep === 3) this.setState({ currentStep: 4 });

    if (currentStep < 7) {
      if (popupMinimized && currentStep !== 6) this.setState({ currentStep: 6 });
      if (!popupMinimized && currentStep === 6) minimizeMaximaizePopup();
    }

    if (activePlayer === 3 && currentStep !== 8) this.setState({ currentStep: 8 });
  };

  nextStep = () => this.setState({ currentStep: this.state.currentStep + 1 });

  endGuide = () => {
    const {
      game: { popupMinimized },
      minimizeMaximaizePopup,
      disableTutorial,
      resetGameReducer,
      resetPlayersReducer,
    } = this.props;

    popupMinimized && minimizeMaximaizePopup();
    this.setState({ currentStep: 0 });
    disableTutorial();
    resetGameReducer();
    resetPlayersReducer();
  };

  render = () => {
    const {
      children,
      settings: { tutorialEnabled },
    } = this.props;
    const { currentStep } = this.state;
    const guideStepsAvaliable = currentStep < stepDescription.length - 1;
    const { position, title, content } = stepDescription[currentStep];

    return tutorialEnabled ? (
      <GuideWrapperStyle currentStep={currentStep}>
        <GuideStepWrapperStyle position={position}>
          {title && <GuideStepTitleStyle>{title}</GuideStepTitleStyle>}

          <GuideStepContentStyle>{splitLines(content)}</GuideStepContentStyle>
        </GuideStepWrapperStyle>

        <GuideButton guideNextStep onClick={guideStepsAvaliable ? this.nextStep : this.endGuide}>
          {guideStepsAvaliable ? 'Далее' : 'Завершить'}
        </GuideButton>

        {guideStepsAvaliable && (
          <GuideButton skipGuide onClick={this.endGuide}>
            Завершить
          </GuideButton>
        )}

        {children}
      </GuideWrapperStyle>
    ) : (
      children
    );
  };
}

export default connect(({ game, settings }) => ({ game, settings }), {
  disableTutorial,
  resetGameReducer,
  resetPlayersReducer,
  changeGameState,
  minimizeMaximaizePopup,
  changeActivePlayer,
  addRole,
})(UsersGuide);
