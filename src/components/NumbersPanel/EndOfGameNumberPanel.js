import React from 'react';
import { useSelector } from 'react-redux';

import { Panel, PanelItem } from './style';

export default () => {
  const {
    players,
    game: {
      gameState: { phase },
    },
  } = useSelector(state => state);

  return (
    <Panel color={phase}>
      {players.map((player, i) => (
        <PanelItem
          isAlive={player.isAlive}
          color={phase}
          key={i}
          selected={player.role === 'ДОН' || player.role === 'МАФИЯ'}
        >
          {player.role === 'ШЕРИФ' ? 'Ш' : player.role === 'ДОН' ? 'Д' : i + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};
