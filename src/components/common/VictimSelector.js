/* 
КОМПОНЕНТ ПРИНИМАЕТ:

1. Кол-во оставшихся голосов
2. Информацию о том, за последниго ли игрока голосуют

КОМПОНЕНТ ВОЗВРАЩАЕТ: значение нажатой кнопки
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';

import { VotingSingleElement, VotingBlock } from 'components/common';

class VictimSelector extends Component {
  state = { selectedNumber: null };

  selectNumber = num => {
    this.props.onNumberSelected(num);
    this.setState({ selectedNumber: num === this.state.selectedNumber ? null : num });
  };

  render = () => {
    const { lastPlayer, votesLeft } = this.props;

    return (
      <VotingBlock className="col-10 col-md-8 col-lg-6">
        {range(1, 11).map(num => (
          <VotingSingleElement
            selected={lastPlayer ? num === votesLeft : this.state.selectedNumber === num}
            disabled={lastPlayer ? num !== votesLeft : num > votesLeft}
            onClick={() => this.selectNumber(num)}
            key={num}
          >
            <div className="number">{num}</div>
          </VotingSingleElement>
        ))}
      </VotingBlock>
    );
  };
}

export default connect(({ game }) => ({ game }))(VictimSelector);
