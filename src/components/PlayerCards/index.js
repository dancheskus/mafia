import React from 'react';
import { useSelector } from 'react-redux';

import { CardsWrapper } from './style';
import SingleCard from './SingleCard';

export default () => {
  const players = useSelector(({ players }) => players);

  return (
    <CardsWrapper>
      {players.map((_, plNum) => (
        <SingleCard key={plNum} number={plNum} order={plNum > 4 ? Math.abs(plNum - 9) + 4 : plNum} />
      ))}
    </CardsWrapper>
  );
};
