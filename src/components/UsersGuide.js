import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { disableTutorial } from 'redux/actions/settingsActions';
import {
  resetGameReducer,
  changeGameState,
  minimizeMaximaizePopup,
  changeActivePlayer,
} from 'redux/actions/gameActions';
import { resetPlayersReducer, addRole } from 'redux/actions/playersActions';

const GuideButton = styled.div`
  z-index: 3500;
  background: rgba(0, 0, 0, 0.164);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background 0.3s;
  text-transform: uppercase;
  cursor: pointer;
  position: fixed;
  bottom: 20px;

  ${props => {
    if (props.guideNextStep) return `right: 20px;`;
    if (props.skipGuide) return `left: 20px;`;
  }}

  &:hover {
    background: rgba(0, 0, 0, 0.464);
  }
`;

export const GuideOverlay = styled.div`
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
`;

export const GuideWrapperStyle = styled.div`
  ${({ currentStep }) => {
    switch (currentStep) {
      case 0:
        return `.seat-allocator-panel { z-index: 3001 }`;
      case 1:
        return `.seat-allocator-big-circle, .seat-allocator-panel { z-index: 3001 }`;
      case 2:
        return `.navi_button { z-index: 4001 }`;
      case 3:
        return `.audio-player-pause-play, .audio-player-next { z-index: 3001 }; .styled-popup { z-index: 1 };`;
      case 4:
        return `.role-dealing-panel, .role-selection-wrapper { z-index: 3001 };`;
      case 5:
        return `.styled-popup { z-index: 3001 }`;
      case 6:
        return `.add-foul, .remove-foul { z-index: 3001; }; .styled-popup { z-index: 1 };`;
      case 7:
        return `.day-user-navigation { z-index: 3001; };`;
      case 8:
        return `.day-panel { z-index: 3001; };`;

      default:
        break;
    }
  }}
`;

const GuideStepWrapperStyle = styled.div`
  z-index: 3100;
  position: fixed;
  background: rgba(256, 256, 256, 0.9);
  padding: 10px 20px;
  border-radius: 10px;

  ${({ position }) => {
    switch (position) {
      case 'left':
        return `
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
          width: 30%;

          @media (max-width: 991px) {
            width: 40%;
          }
        `;

      case 'top':
        return `
          top: 70px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;

      case 'afterNumbersPanel':
        return `
          top: 135px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;

      case 'bottom':
        return `
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;

      default:
        return `
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;

          @media (max-width: 991px) {
            width: 90%;
          }
        `;
    }
  }}
`;

const GuideStepTitleStyle = styled.div`
  font-size: 1.3rem;
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 15px;
  border-bottom: 1px solid black;

  @media (max-width: 991px) {
    font-size: 1rem;
  }
`;

const GuideStepContentStyle = styled.div`
  font-weight: 500;

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 991px) {
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

const steps = [
  {
    title: 'Верхняя панель',
    content:
      'Эта панель может выполнять разные функции в зависимости от состояния игры. В данном случае, здесь будут указаны номера за столом. \n Нажми ДАЛЕЕ.',
    position: 'afterNumbersPanel',
  },
  { content: 'Нажмите на кнопку пару раз, чтобы узнать номер игрока.', position: 'afterNumbersPanel' },
  {
    title: 'Музыка',
    content:
      'В приложении будет загружаться музыка. Если хотите выключить эту опцию, зайдите в настройки. Это сэкономит ваш трафик.',
    position: 'afterNumbersPanel',
  },
  {
    title: 'Управление музыкой',
    content:
      'В ночное время кнопками сверху можно ставить звук на паузу, а также включать следующую композицию. \n Если вы используете смартфон, убедитесь, что он не в беззвучном режиме.',
    position: 'top',
  },
  {
    title: 'Раздача ролей',
    content:
      'Во время ручной раздачи ролей, выбирите номер игрока и присвойте ему роль. \n В приложении присутствует и автоматическая раздача ролей.',
    position: 'bottom',
  },
  {
    title: 'Сверните окно',
    content: 'Для выставления фолоф в ночное время, сверните окно для доступа к карточкам игроков.',
    position: 'bottom',
  },
  {
    title: 'Поставьте фол',
    content:
      'Для выставления фола, необходимо нажать на "+". Чтобы убрать фол, выставленный по ошибке, нажмите на "-".\n Поставьте 8-у игроку 4-й фол, и через секунду он умрет.',
    position: 'left',
  },
  {
    title: 'Управление игроками',
    content: 'В этой панели можно управлять таймером игрока (пауза/сброс) и переключатся на следующих игроков.',
    position: 'top',
  },
  {
    title: 'Выставление на голосование',
    content:
      'В верхней панели можно указать, кого выставляет активный игрок. При нажатии на другую цифру, кандидатура будет заменена. Повторным нажатием на выбранную цифру, можно снять кандидатуру.',
    position: 'afterNumbersPanel',
  },
];

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
    const guideStepsAvaliable = currentStep < steps.length - 1;

    return tutorialEnabled ? (
      <GuideWrapperStyle currentStep={this.state.currentStep}>
        <GuideStepWrapperStyle position={steps[currentStep].position}>
          {steps[currentStep].title && <GuideStepTitleStyle>{steps[currentStep].title}</GuideStepTitleStyle>}
          <GuideStepContentStyle>{this.splitLines(steps[currentStep].content)}</GuideStepContentStyle>
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

export default connect(
  ({ game, settings }) => ({ game, settings }),
  {
    disableTutorial,
    resetGameReducer,
    resetPlayersReducer,
    changeGameState,
    minimizeMaximaizePopup,
    changeActivePlayer,
    addRole,
  }
)(UsersGuide);
