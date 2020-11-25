import React from 'react';
import { useSelector } from 'react-redux';

import { playersSelector } from 'redux/selectors';

import { CardsWrapper } from './style';
import SingleCard from './SingleCard';

export default () => {
  const players = useSelector(playersSelector);

  return (
    <CardsWrapper>
      {players.map((_, plNum) => (
        // eslint-disable-next-line react/no-array-index-key
        <SingleCard key={plNum} playerNumber={plNum} order={plNum > 4 ? Math.abs(plNum - 9) + 4 : plNum} />
      ))}
    </CardsWrapper>
  );
};
