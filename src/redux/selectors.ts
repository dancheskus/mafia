import { TPlayersState, TGameState, TSettingsState } from './reducers/types';
import { TState } from './reduxStore';

export const playersSelector = ({ players }: TState) => players;
export const gameSelector = ({ game }: TState) => game;
export const settingsSelector = ({ settings }: TState) => settings;
