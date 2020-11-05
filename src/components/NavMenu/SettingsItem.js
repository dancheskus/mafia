import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-ios-switch';

import {
  switchAppMusic,
  switchTimerSounds,
  switchMafiaTimer,
  switchMultiplePlayerRemove,
  switchSeatAllocator,
} from 'redux/actions/settingsActions';
import { settingsSelector } from 'redux/selectors';

import { SettingsLine } from './style';

const onColor = 'rgb(122, 156, 236)';

export default ({ type, title }) => {
  const dispatch = useDispatch();
  const settings = useSelector(settingsSelector);

  const functions = {
    appMusic: switchAppMusic(),
    timerSounds: switchTimerSounds(),
    mafiaTimer: switchMafiaTimer(),
    multiplePlayerRemove: switchMultiplePlayerRemove(),
    seatAllocator: switchSeatAllocator(),
  };

  return (
    <SettingsLine>
      <span>{title}</span>

      <Switch onColor={onColor} checked={settings[type]} onChange={() => dispatch(functions[type])} />
    </SettingsLine>
  );
};
