import React from 'react';
import { Howl } from 'howler';
import { batch, useDispatch, useSelector } from 'react-redux';

import { enableTutorial } from 'redux/actions/settingsActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
import countdownEndFile from 'audio/Countdown_end.mp3';
import { NextIcon } from 'icons/svgIcons';

import SettingsItem from './SettingsItem';
import { AppSettings, BottomButton, BackButton, BottomButtonsGroup } from './style';

const secondsSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });
const countdownEndSound = new Howl({ src: `${countdownEndFile}` });

export default ({ hide, onClose }) => {
  const dispatch = useDispatch();
  const { tutorialEnabled } = useSelector(({ settings }) => settings);

  const startTutorial = () => {
    batch(() => {
      dispatch(resetGameReducer());
      dispatch(resetPlayersReducer());
      dispatch(enableTutorial());
    });
  };

  const enableSounds = () => {
    secondsSound.play('oneSec');

    setTimeout(() => countdownEndSound.play(), 1500);
  };

  return (
    <AppSettings hide={hide} tutorialEnabled={tutorialEnabled}>
      <BackButton onClick={onClose}>
        <NextIcon />
      </BackButton>

      <SettingsItem title='Раздача номеров в начале игры' type='seatAllocator' />
      <SettingsItem title='Музыка' type='appMusic' />
      <SettingsItem title='Звуки таймера (на 10/0 сек)' type='timerSounds' />
      <SettingsItem title='Таймер на договорку (1 мин)' type='mafiaTimer' />
      <SettingsItem title='Предлагать вывести всех после повторной переголосовки' type='multiplePlayerRemove' />

      <BottomButtonsGroup>
        <BottomButton onClick={startTutorial}>Включить обучение</BottomButton>
        <BottomButton onClick={enableSounds}>Пример звуков</BottomButton>
      </BottomButtonsGroup>
    </AppSettings>
  );
};
