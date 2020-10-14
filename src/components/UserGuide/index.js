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

class UsersGuide extends Component {
  state = { currentStep: 0 };

  componentDidMount = () => {
    if (!this.props.settings.tutorialEnabled) return;

    this.props.changeActivePlayer(0);

    const {
      gameState: { phase },
      popupMinimized,
    } = this.props.game;

    popupMinimized && this.props.minimizeMaximaizePopup();

    if (phase === 'RoleDealing' || !this.props.settings.seatAllocator) this.setState({ currentStep: 3 });
    if (phase === 'ZeroNight') this.setState({ currentStep: 5 });
    if (phase === 'Day') this.setState({ currentStep: 7 });
  };

  componentDidUpdate = (_, prevState) => {
    if (!this.props.settings.tutorialEnabled) return;

    const { currentStep } = this.state;
    const { changeGameState } = this.props;
    const {
      popupMinimized,
      activePlayer,
      gameState: { phase },
    } = this.props.game;
    const { appMusic } = this.props.settings;
    const stepChanged = prevState.currentStep !== currentStep;

    if ((phase === 'RoleDealing' || !this.props.settings.seatAllocator) && currentStep === 0)
      this.setState({ currentStep: 3 });

    if (stepChanged) {
      if (currentStep === 3) changeGameState({ phase: 'RoleDealing' });
      if (currentStep === 5) {
        changeGameState({ phase: 'ZeroNight' });
        this.props.addRole({ playerNumber: 1, role: 'МАФИЯ' });
        this.props.addRole({ playerNumber: 2, role: 'МАФИЯ' });
        this.props.addRole({ playerNumber: 3, role: 'ДОН' });
        this.props.addRole({ playerNumber: 4, role: 'ШЕРИФ' });

        for (let i = 5; i <= 9; i++) {
          this.props.addRole({ playerNumber: i, role: 'МИРНЫЙ' });
        }
      }
      if (currentStep === 7) {
        changeGameState({ phase: 'Day', dayNumber: 1 });
      }
    }

    if (!appMusic && currentStep === 3) this.setState({ currentStep: 4 });

    if (currentStep < 7) {
      if (popupMinimized && currentStep !== 6) this.setState({ currentStep: 6 });
      if (!popupMinimized && currentStep === 6) this.props.minimizeMaximaizePopup();
    }

    if (activePlayer === 3 && currentStep !== 8) this.setState({ currentStep: 8 });
  };

  nextStep = () => this.setState({ currentStep: this.state.currentStep + 1 });

  endGuide = () => {
    this.props.game.popupMinimized && this.props.minimizeMaximaizePopup();
    this.setState({ currentStep: 0 });
    this.props.disableTutorial();
    this.props.resetGameReducer();
    this.props.resetPlayersReducer();
  };

  splitLines = text => text.split('\n').map(i => <p key={i}>{i}</p>);

  render = () => {
    const { tutorialEnabled } = this.props.settings;
    const { currentStep } = this.state;
    const guideStepsAvaliable = currentStep < stepDescription.length - 1;

    return tutorialEnabled ? (
      <GuideWrapperStyle currentStep={this.state.currentStep}>
        <GuideStepWrapperStyle position={stepDescription[currentStep].position}>
          {stepDescription[currentStep].title && (
            <GuideStepTitleStyle>{stepDescription[currentStep].title}</GuideStepTitleStyle>
          )}
          <GuideStepContentStyle>{this.splitLines(stepDescription[currentStep].content)}</GuideStepContentStyle>
        </GuideStepWrapperStyle>

        <GuideButton guideNextStep onClick={guideStepsAvaliable ? this.nextStep : this.endGuide}>
          {guideStepsAvaliable ? 'Далее' : 'Завершить'}
        </GuideButton>
        {guideStepsAvaliable && (
          <GuideButton skipGuide onClick={this.endGuide}>
            Завершить
          </GuideButton>
        )}
        {this.props.children}
      </GuideWrapperStyle>
    ) : (
      this.props.children
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
