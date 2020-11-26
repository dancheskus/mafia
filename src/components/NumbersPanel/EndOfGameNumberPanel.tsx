import React from 'react';
import { useSelector } from 'react-redux';

import { playerIsBlack } from 'helpers/roleHelpers';
import { gameSelector, playersSelector } from 'redux/selectors';
import ROLE from 'common/playerEnums';

import { Panel, PanelItem } from './style';

export default function EndOfGameNumberPanel() {
  const { phase } = useSelector(gameSelector).gameState;
  const players = useSelector(playersSelector);

  return (
    <Panel color={phase}>
      {players.map(({ role, isAlive }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <PanelItem isAlive={isAlive} color={phase} key={i} selected={playerIsBlack(role)}>
          {role === ROLE.SHERIF ? 'Ш' : role === ROLE.DON ? 'Д' : i + 1}
        </PanelItem>
      ))}
    </Panel>
  );
}
