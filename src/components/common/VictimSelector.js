/* 
КОМПОНЕНТ ПРИНИМАЕТ:

1. Кол-во оставшихся голосов
2. Информацию о том, за последниго ли игрока голосуют

КОМПОНЕНТ ВОЗВРАЩАЕТ: значение нажатой кнопки
*/

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { range } from 'lodash';

import VotingSingleElement from './VotingSingleElement';
import VotingBlock from './VotingBlock';

const VictimSelector = props => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  const { lastPlayer, votesLeft, shooting, players } = props;

  const selectNumber = num => {
    if (lastPlayer) return; // Отключает возможность снять голос с последнего игрока
    props.onNumberSelected(num);
    setSelectedNumber(num === selectedNumber ? null : num);
  };

  return (
    <VotingBlock className="col-10 col-md-8 col-lg-6">
      {range(0, 10).map(num => (
        <VotingSingleElement
          shooting={shooting}
          selected={lastPlayer ? num === votesLeft : selectedNumber === num}
          disabled={shooting ? !players[num].isAlive : lastPlayer ? num !== votesLeft : num > votesLeft}
          onClick={() => selectNumber(num)}
          key={num}
        >
          <div className="number">{num + 1}</div>
        </VotingSingleElement>
      ))}
    </VotingBlock>
  );
};

export default connect(({ game, players }) => ({ game, players }))(VictimSelector);
