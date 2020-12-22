import React, { Dispatch, SetStateAction } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { PopUpButton, PopUpLabel } from 'components/PopUp/styled-components';
import { gameSelector, playersSelector } from 'redux/selectors';
import { checkForEnd } from 'helpers/checkForEnd';
import PHASE from 'common/phaseEnums';
import { changeGameState } from 'redux/actions/gameActions';
import { killPlayer } from 'redux/actions/playersActions';

import { ResultsNumbers } from '../style';
import ResetButton from '../ResetButton';

interface Props {
  setIsFinalResultVisible: Dispatch<SetStateAction<boolean>>;
  lastMinuteFor: number[];
  goToNight: () => void;
  resetFn: () => void;
}

export default function FinalResultScreen({ lastMinuteFor, goToNight, resetFn, setIsFinalResultVisible }: Props) {
  const dispatch = useDispatch();
  const { selectedNumbers } = useSelector(gameSelector);
  const players = useSelector(playersSelector);

  const goToLastMinuteOrEndGame = () => {
    if (checkForEnd(players, lastMinuteFor)) {
      batch(() => {
        lastMinuteFor.forEach(plNum => dispatch(killPlayer(plNum)));
        dispatch(changeGameState({ phase: PHASE.ENDOFGAME }));
      });
    }

    setIsFinalResultVisible(false);
  };

  return (
    <>
      {selectedNumbers.length > 1 && <ResetButton onClick={resetFn} />}

      {lastMinuteFor.length > 0 ? (
        <>
          <PopUpLabel className='h1'>Игру покидает</PopUpLabel>

          <ResultsNumbers>
            {lastMinuteFor.map(num => (
              <div key={num}>{num + 1}</div>
            ))}
          </ResultsNumbers>

          <PopUpButton color='Voting' onClick={goToLastMinuteOrEndGame}>
            ОК
          </PopUpButton>
        </>
      ) : (
        <>
          <PopUpLabel className='h1'>Никто не уходит</PopUpLabel>

          <PopUpButton color='Voting' onClick={goToNight}>
            Ночь
          </PopUpButton>
        </>
      )}
    </>
  );
}
