import { TPlayersState, TGameState, TSettingsState } from './reducers/types';

export const playersSelector = ({ players }: { players: TPlayersState }) => players;
export const gameSelector = ({ game }: { game: TGameState }) => game;
export const settingsSelector = ({ settings }: { settings: TSettingsState }) => settings;
