import { useSelector } from 'react-redux';

import { gameSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';

import useNotSelectedNumbers from './useNotSelectedNumbers';
import { Panel, PanelItem } from './style';

const phase = PHASE.SEATALLOCATOR;

export default function SeatAllocatorNumberPanel() {
  const { selectedNumbers } = useSelector(gameSelector);

  const notSelectedNumbers = useNotSelectedNumbers();

  return (
    <Panel color={phase} className='seat-allocator-panel'>
      {selectedNumbers.map(selNum => (
        <PanelItem color={phase} key={selNum} selected>
          {selNum + 1}
        </PanelItem>
      ))}

      {notSelectedNumbers.map(notSelNum => (
        <PanelItem color={phase} key={notSelNum} />
      ))}
    </Panel>
  );
}
