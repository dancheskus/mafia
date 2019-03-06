import React, { Component } from 'react';
import { NextIcon } from './../../icons/svgIcons';
import SettingsItem from './SettingsItem';
import { AppSettings, RepeatGuideButton, BackButton } from './style';
import { connect } from 'react-redux';
import { enableTutorial } from 'redux/actions/settingsActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';

class Settings extends Component {
  enableTutorial = () => {
    this.props.resetGameReducer();
    this.props.resetPlayersReducer();
    this.props.enableTutorial();
  };

  render = () => {
    const { tutorialEnabled } = this.props.settings;

    return (
      <AppSettings hide={this.props.hide} tutorialEnabled={tutorialEnabled}>
        <BackButton onClick={this.props.onClose}>
          <NextIcon />
        </BackButton>

        <SettingsItem title="Раздача номеров в начале игры" type="seatAllocator" />
        <SettingsItem title="Музыка" type="appMusic" />
        <SettingsItem title="Звуки таймера (на 15/5 сек)" type="timerSounds" />
        <SettingsItem title="Таймер на договорку (1 мин)" type="mafiaTimer" />
        <SettingsItem title="Предлагать вывести всех после повторной переголосовки" type="multiplePlayerRemove" />

        <RepeatGuideButton onClick={this.enableTutorial}>Включить обучение</RepeatGuideButton>
      </AppSettings>
    );
  };
}

export default connect(
  ({ settings }) => ({ settings }),
  { enableTutorial, resetGameReducer, resetPlayersReducer }
)(Settings);
