import React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-ios-switch';

import { SettingsLine } from './style';

import {
  switchAppMusic,
  switchTimerSounds,
  switchMafiaTimer,
  switchMultiplePlayerRemove,
  switchSeatAllocator,
} from 'redux/actions/settingsActions';

const onColor = 'rgb(122, 156, 236)';

const SettingsItem = props => {
  const {
    switchAppMusic,
    switchTimerSounds,
    switchMafiaTimer,
    switchMultiplePlayerRemove,
    switchSeatAllocator,
    settings: { appMusic, timerSounds, mafiaTimer, multiplePlayerRemove, seatAllocator },
  } = props;
  let checked;
  let func;

  switch (props.type) {
    case 'appMusic':
      checked = appMusic;
      func = switchAppMusic;
      break;
    case 'timerSounds':
      checked = timerSounds;
      func = switchTimerSounds;
      break;
    case 'mafiaTimer':
      checked = mafiaTimer;
      func = switchMafiaTimer;
      break;
    case 'multiplePlayerRemove':
      checked = multiplePlayerRemove;
      func = switchMultiplePlayerRemove;
      break;
    case 'seatAllocator':
      checked = seatAllocator;
      func = switchSeatAllocator;
      break;

    default:
      break;
  }

  return (
    <SettingsLine>
      <span>{props.title}</span>
      <Switch onColor={onColor} checked={checked} onChange={() => func()} />
    </SettingsLine>
  );
};

export default connect(
  ({ settings }) => ({ settings }),
  { switchAppMusic, switchTimerSounds, switchMafiaTimer, switchMultiplePlayerRemove, switchSeatAllocator }
)(SettingsItem);
