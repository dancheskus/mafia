import _ from 'lodash';

export default players => {
  const allAlivePlayers = _.countBy(
    players.map(player => player.isAlive && (player.role === 'ДОН' || player.role === 'МАФИЯ' ? 'black' : 'red'))
  );

  return { status: allAlivePlayers.red === allAlivePlayers.black || !allAlivePlayers.black, allAlivePlayers };
};
