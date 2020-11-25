import React from 'react';
import { useSelector } from 'react-redux';

import { playerIsBlack } from 'helpers/roleHelpers';
import { gameSelector, playersSelector } from 'redux/selectors';

import { Panel, PanelItem } from './style';

export default () => {
  const { phase } = useSelector(gameSelector).gameState;
  const players = useSelector(playersSelector);

  return (
    <Panel color={phase}>
      {players.map(({ role, isAlive }, i) => (
        <PanelItem isAlive={isAlive} color={phase} key={i} selected={playerIsBlack(role)}>
          {role === 'ШЕРИФ' ? 'Ш' : role === 'ДОН' ? 'Д' : i + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};
