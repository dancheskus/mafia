import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SingleCard from './SingleCard';
import TutorialAlert from '../common/TutorialAlert';

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  min-height: 0;
  flex-direction: column-reverse;
`;

class PlayerCards extends Component {
  render = () => {
    const { tutorialEnabled } = this.props.settings;
    const { phase } = this.props.game.gameState;

    return (
      <>
        {tutorialEnabled && phase === 'Day' && (
          <TutorialAlert>
            В верхней панели можно выставлять игроков на голосование. Нажмите на цифру, чтобы выделить или снять
            выделение.
          </TutorialAlert>
        )}

        <CardsWrapper>
          {this.props.players.map((_, i) => {
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
      </>
    );
  };
}

export default connect(({ game, players, settings }) => ({ game, players, settings }))(PlayerCards);
