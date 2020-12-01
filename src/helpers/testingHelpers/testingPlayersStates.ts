import ROLE from 'common/playerEnums';

export const allAlivePlayers = [
  { role: ROLE.DON, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MAFIA, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MAFIA, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.SHERIF, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
];

export const equalAmountOfAlivePlayers = [
  { role: ROLE.DON, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MAFIA, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MAFIA, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.SHERIF, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: true, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: false, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: false, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: false, fouls: { amount: 0, muted: false } },
  { role: ROLE.MIRNIJ, isAlive: false, fouls: { amount: 0, muted: false } },
];
