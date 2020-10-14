import { countBy } from 'lodash';

export default (players, lastRemovedPlayer) => {
  const allAlivePlayers = countBy(
    players.map(player => player.isAlive && (player.role === 'ДОН' || player.role === 'МАФИЯ' ? 'black' : 'red'))
  );
  if (lastRemovedPlayer && lastRemovedPlayer[0] >= 0) {
    lastRemovedPlayer.forEach(playerNumber => {
      const { role } = players[playerNumber];
      role === 'ДОН' || role === 'МАФИЯ' ? (allAlivePlayers.black -= 1) : (allAlivePlayers.red -= 1);
      allAlivePlayers.false += 1;
    });
  }

  return { status: allAlivePlayers.red <= allAlivePlayers.black || !allAlivePlayers.black, allAlivePlayers };
};
