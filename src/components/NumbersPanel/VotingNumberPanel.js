import React from 'react';
import { useSelector } from 'react-redux';

import { Panel, PanelItem } from './style';

export default () => {
  const {
    game: {
      gameState: { phase },
      selectedNumbers,
    },
  } = useSelector(state => state);

  return (
    <Panel color={phase} itemsCentered>
      {selectedNumbers.map(selNum => (
        <PanelItem color={phase} key={selNum} selected>
          {selNum + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};
