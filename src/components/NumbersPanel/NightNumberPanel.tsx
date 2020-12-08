import React from 'react';

import { useGetAlivePlayersAmountByColor } from 'helpers/roleHelpers';
import PHASE from 'common/phaseEnums';

import { Panel, PanelText } from './style';

const phase = PHASE.NIGHT;

export default function NightNumberPanel() {
  const aliveMafiaAmount = useGetAlivePlayersAmountByColor('black');
  const aliveRedAmount = useGetAlivePlayersAmountByColor('red');

  return (
    <Panel color={phase}>
      <PanelText>Живых мафов: {aliveMafiaAmount}</PanelText>
      <PanelText>Живых мирных: {aliveRedAmount}</PanelText>
    </Panel>
  );
}
