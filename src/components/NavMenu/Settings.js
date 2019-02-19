import React, { Component } from 'react';
import { NextIcon } from './../../icons/svgIcons';
import SettingsItem from './SettingsItem';
import { AppSettings, BackButton } from './style';

export default class extends Component {
  render = () => (
    <AppSettings hide={this.props.hide}>
      <BackButton onClick={this.props.onClose}>
        <NextIcon />
      </BackButton>

      <SettingsItem title="Раздача номеров в начале игры" type="seatAllocator" />
      <SettingsItem title="Музыка" type="appMusic" />
      <SettingsItem title="Звуки таймера (на 15/5 сек)" type="timerSounds" />
      <SettingsItem title="Таймер на договорку (1 мин)" type="mafiaTimer" />
      <SettingsItem title="Предлагать выгнать всех после повторной переголосовки" type="multiplePlayerRemove" />
    </AppSettings>
  );
}
