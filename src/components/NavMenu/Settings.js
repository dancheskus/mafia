import React from 'react';
import { Howl } from 'howler';
import { connect } from 'react-redux';

import { enableTutorial } from 'redux/actions/settingsActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import countdownEndFile from 'audio/Countdown_end.mp3';
import { NextIcon } from 'icons/svgIcons';

import SettingsItem from './SettingsItem';
import { AppSettings, BottomButton, BackButton, BottomButtonsGroup } from './style';

const Settings = props => {
  const enableTutorial = () => {
    props.resetGameReducer();
    props.resetPlayersReducer();
    props.enableTutorial();
  };

  const { tutorialEnabled } = props.settings;

  const secondsSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });
  const countdownEndSound = new Howl({ src: `${countdownEndFile}` });

  const enableSounds = () => {
    secondsSound.play('oneSec');

    setTimeout(() => {
      countdownEndSound.play();
    }, 1500);
  };

  return (
    <AppSettings hide={props.hide} tutorialEnabled={tutorialEnabled}>
      <BackButton onClick={props.onClose}>
        <NextIcon />
      </BackButton>

      <SettingsItem title='Раздача номеров в начале игры' type='seatAllocator' />
      <SettingsItem title='Музыка' type='appMusic' />
      <SettingsItem title='Звуки таймера (на 10/0 сек)' type='timerSounds' />
      <SettingsItem title='Таймер на договорку (1 мин)' type='mafiaTimer' />
      <SettingsItem title='Предлагать вывести всех после повторной переголосовки' type='multiplePlayerRemove' />

      <BottomButtonsGroup>
        <BottomButton onClick={enableTutorial}>Включить обучение</BottomButton>
        <BottomButton onClick={enableSounds}>Пример звуков</BottomButton>
      </BottomButtonsGroup>
    </AppSettings>
  );
};

export default connect(({ settings }) => ({ settings }), { enableTutorial, resetGameReducer, resetPlayersReducer })(
  Settings
);
