/* 
КОМПОНЕНТ ПРИНИМАЕТ:

1. Кол-во оставшихся голосов
2. Информацию о том, за последниго ли игрока голосуют

КОМПОНЕНТ ВОЗВРАЩАЕТ: значение нажатой кнопки
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';

import VotingSingleElement from './VotingSingleElement';
import VotingBlock from './VotingBlock';

class VictimSelector extends Component {
  state = { selectedNumber: null };

  selectNumber = num => {
    this.props.onNumberSelected(num);
    this.setState({ selectedNumber: num === this.state.selectedNumber ? null : num });
  };

  render = () => {
    const { lastPlayer, votesLeft, shooting } = this.props;

    return (
      <VotingBlock className="col-10 col-md-8 col-lg-6">
        {range(0, 10).map(num => (
          <VotingSingleElement
            shooting={shooting}
            selected={lastPlayer ? num === votesLeft : this.state.selectedNumber === num}
            disabled={shooting ? !this.props.players[num].isAlive : lastPlayer ? num !== votesLeft : num > votesLeft}
            onClick={() => this.selectNumber(num)}
            key={num}
          >
            <div className="number">{num + 1}</div>
          </VotingSingleElement>
        ))}
      </VotingBlock>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }))(VictimSelector);
