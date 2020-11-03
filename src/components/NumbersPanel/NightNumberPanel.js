import React from 'react';
import { useSelector } from 'react-redux';

import { Panel, PanelText } from './style';

export default () => {
  const {
    players,
    game: {
      gameState: { phase },
    },
  } = useSelector(state => state);

  const aliveMafiaAmount = players.filter(({ isAlive, role }) => isAlive && (role === 'ДОН' || role === 'МАФИЯ'))
    .length;

  return (
    <Panel color={phase}>
      <PanelText>Живых мафов: {aliveMafiaAmount}</PanelText>
    </Panel>
  );
};
