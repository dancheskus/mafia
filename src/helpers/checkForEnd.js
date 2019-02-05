import { countBy } from 'lodash';

export default (players, lastKilledPlayer) => {
  const allAlivePlayers = countBy(
    players.map(player => player.isAlive && (player.role === 'ДОН' || player.role === 'МАФИЯ' ? 'black' : 'red'))
  );

  if (lastKilledPlayer) {
    const role = players[lastKilledPlayer].role;
    role === 'ДОН' || role === 'МАФИЯ' ? (allAlivePlayers.black -= 1) : (allAlivePlayers.red -= 1);
    allAlivePlayers.false += 1;
  }

  return { status: allAlivePlayers.red === allAlivePlayers.black || !allAlivePlayers.black, allAlivePlayers };
};
