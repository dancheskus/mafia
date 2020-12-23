import { useSelector } from 'react-redux';

import PHASE from 'common/phaseEnums';
import { gameSelector } from 'redux/selectors';

import { Panel, PanelItem } from './style';

const phase = PHASE.VOTING;

export default function VotingNumberPanel() {
  const { selectedNumbers } = useSelector(gameSelector);

  return (
    <Panel color={phase} itemsCentered>
      {selectedNumbers.map(selNum => (
        <PanelItem color={phase} key={selNum} selected>
          {selNum + 1}
        </PanelItem>
      ))}
    </Panel>
  );
}
