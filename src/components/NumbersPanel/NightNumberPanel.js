import React from 'react';
import { useSelector } from 'react-redux';

import { gameSelector, playersSelector } from 'redux/selectors';

import { Panel, PanelText } from './style';

export default () => {
  const { phase } = useSelector(gameSelector).gameState;
  const players = useSelector(playersSelector);

  const aliveMafiaAmount = players.filter(({ isAlive, role }) => isAlive && (role === 'ДОН' || role === 'МАФИЯ'))
    .length;

  return (
    <Panel color={phase}>
      <PanelText>Живых мафов: {aliveMafiaAmount}</PanelText>
    </Panel>
  );
};
