import PHASE from 'common/phaseEnums';
import ROLE from 'common/playerEnums';

export type TPlayersAction = {
  type: string;
  playerNumber: number;
  payload: { playerNumber: number; role: ROLE };
};

export type TPlayer = {
  role: ROLE;
  isAlive: boolean;
  fouls: { amount: number; muted: boolean };
};
export type TPlayersState = TPlayer[];

export type TSettingsState = {
  appMusic: boolean;
  timerSounds: boolean;
  mafiaTimer: boolean;
  multiplePlayerRemove: boolean;
  seatAllocator: boolean;
  tutorialEnabled: boolean;
};

export type TGameState = {
  opensTable: number;
  activePlayer: number;
  gameState: { phase: PHASE; dayNumber: number };
  lightMode: boolean;
  selectedNumbers: number[];
  numbersPanelClickable: boolean;
  popupOpened: boolean;
  skipVoting: boolean;
  playerAddedToVotingList: [number, number] | [];
  killedAtNightPlayer: number | null;
  popupMinimized: boolean;
};

export type TCombinedReducers = {
  players: TPlayersState;
  settings: TSettingsState;
  game: TGameState;
};
