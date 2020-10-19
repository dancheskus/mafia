import React from 'react';
import { useSelector } from 'react-redux';

import { useNotSelectedNumbers } from './helper';
import { Panel, PanelItem } from './style';

export default () => {
  const {
    gameState: { phase },
    selectedNumbers,
  } = useSelector(({ game }) => game);

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
};