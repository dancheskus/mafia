import React from 'react';
import { useSelector } from 'react-redux';

import { useGetAlivePlayersAmountByColor } from 'helpers/roleHelpers';
import { gameSelector } from 'redux/selectors';

import { Panel, PanelText } from './style';

export default () => {
  const { phase } = useSelector(gameSelector).gameState;

  const aliveMafiaAmount = useGetAlivePlayersAmountByColor('black');

  return (
    <Panel color={phase}>
      <PanelText>Живых мафов: {aliveMafiaAmount}</PanelText>
    </Panel>
  );
};
