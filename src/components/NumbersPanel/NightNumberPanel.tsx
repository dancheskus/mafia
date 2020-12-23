import { useGetAlivePlayersAmountByTeam } from 'helpers/roleHelpers';
import PHASE from 'common/phaseEnums';

import { Panel, PanelText } from './style';

const phase = PHASE.NIGHT;

export default function NightNumberPanel() {
  const { red, black } = useGetAlivePlayersAmountByTeam('all');

  return (
    <Panel color={phase}>
      <PanelText>Живых мафов: {black}</PanelText>
      <PanelText>Живых мирных: {red}</PanelText>
    </Panel>
  );
}
