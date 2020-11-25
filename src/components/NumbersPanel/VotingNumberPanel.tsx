import React from 'react';
import { useSelector } from 'react-redux';

import { gameSelector } from 'redux/selectors';

import { Panel, PanelItem } from './style';

export default () => {
  const {
    gameState: { phase },
    selectedNumbers,
  } = useSelector(gameSelector);

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
