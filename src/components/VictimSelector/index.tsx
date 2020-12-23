/* 
КОМПОНЕНТ ПРИНИМАЕТ:

1. Кол-во оставшихся голосов
2. Информацию о том, за последниго ли игрока голосуют

КОМПОНЕНТ ВОЗВРАЩАЕТ: значение нажатой кнопки
*/

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { range } from 'lodash';

import { playersSelector } from 'redux/selectors';

import { VotingSingleElement, VotingBlock } from './style';
import { TProps } from './types';

const VictimSelector = ({
  lastPlayer,
  votesLeft,
  shooting,
  onNumberSelected,
  selectedNumber: predefinedSelectedNumber,
}: TProps) => {
  const [selectedNumber, setSelectedNumber] = useState(
    Number.isInteger(predefinedSelectedNumber) ? predefinedSelectedNumber : null,
  );
  const players = useSelector(playersSelector);

  const selectNumber = (num: number) => {
    if (lastPlayer) return; // Отключает возможность снять голос с последнего игрока

    onNumberSelected(num);
    setSelectedNumber(num === selectedNumber ? null : num);
  };

  return (
    <VotingBlock className='col-10 col-md-8 col-lg-6'>
      {range(0, 10).map(num => (
        <VotingSingleElement
          data-testid='votingSingleElement'
          shooting={shooting}
          selected={lastPlayer ? num === votesLeft : selectedNumber === num}
          disabled={
            shooting ? !players[num].isAlive : lastPlayer ? num !== votesLeft : !!(votesLeft && num > votesLeft)
          }
          onClick={() => selectNumber(num)}
          key={num}
        >
          <div className='number'>{num + 1}</div>
        </VotingSingleElement>
      ))}
    </VotingBlock>
  );
};

export default VictimSelector;
