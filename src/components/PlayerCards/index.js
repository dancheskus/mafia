import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SingleCard from './SingleCard';

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  min-height: 0;
  flex-direction: column-reverse;
`;

const PlayerCards = ({ players }) => (
  <CardsWrapper>
    {players.map((_, i) => {
      const plNum = i;
      return (
        <SingleCard
          key={i}
          number={plNum}
          order={plNum === 9 ? 5 : plNum === 8 ? 6 : plNum === 6 ? 8 : plNum === 5 ? 9 : plNum}
        />
      );
    })}
  </CardsWrapper>
);
export default connect(({ players }) => ({ players }))(PlayerCards);
