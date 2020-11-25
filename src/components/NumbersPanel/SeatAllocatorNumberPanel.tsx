import React from 'react';
import { useSelector } from 'react-redux';

import { gameSelector } from 'redux/selectors';

import useNotSelectedNumbers from './useNotSelectedNumbers';
import { Panel, PanelItem } from './style';

export default function SeatAllocatorNumberPanel() {
  const {
    gameState: { phase },
    selectedNumbers,
  } = useSelector(gameSelector);

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
