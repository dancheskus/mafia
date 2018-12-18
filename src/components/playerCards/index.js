import React, { Component, Fragment } from 'react';
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

class PlayerCards extends Component {
  render = () => (
    <CardsWrapper>
      {this.props.players.map((player, i) => {
        const plNum = i + 1;
        return (
          <SingleCard
            key={i}
            number={plNum}
            order={plNum === 10 ? 6 : plNum === 9 ? 7 : plNum === 7 ? 9 : plNum === 6 ? 10 : plNum}
          />
        );
      })}
    </CardsWrapper>
  );
}

const mapStateToProps = ({ game, players }) => ({ game, players });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCards);
