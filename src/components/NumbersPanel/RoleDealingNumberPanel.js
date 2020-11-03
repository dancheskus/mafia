import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { range } from 'lodash';

import { addToSelectedNumbers, clearSelectedNumbers } from 'redux/actions/gameActions';

import { Panel, PanelItem } from './style';

export default () => {
  const {
    players,
    game: {
      gameState: { phase },
      numbersPanelClickable,
      selectedNumbers,
    },
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const selectPlayer = playerNumber => {
    if (!numbersPanelClickable) return;

    batch(() => {
      dispatch(clearSelectedNumbers());
      dispatch(addToSelectedNumbers(playerNumber));
    });
  };

  return (
    <Panel color={phase} className='role-dealing-panel'>
      {range(0, 10).map(num => (
        <PanelItem
          pointer={numbersPanelClickable}
          color={phase}
          key={num}
          selected={num === selectedNumbers[0]}
          onClick={() => selectPlayer(num)}
        >
          {numbersPanelClickable && players[num].role === 'МАФИЯ' && 'М'}
          {numbersPanelClickable && players[num].role === 'ШЕРИФ' && 'Ш'}
          {numbersPanelClickable && players[num].role === 'ДОН' && 'Д'}
          {numbersPanelClickable && players[num].role === 'МИРНЫЙ' && num + 1}
          {!numbersPanelClickable && num + 1}
        </PanelItem>
      ))}
    </Panel>
  );
};
