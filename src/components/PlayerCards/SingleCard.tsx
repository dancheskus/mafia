import React, { useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useTimer } from 'use-timer';

import { MinimizeIcon, MaximizeIcon, NextIcon } from 'icons/svgIcons';
import { addFoul, removeFoul, returnPlayerToGame } from 'redux/actions/playersActions';
import { skipVotingEnable, skipVotingDisable } from 'redux/actions/gameActions';
import { gameSelector, playersSelector } from 'redux/selectors';
import { useCheckForEnd } from 'helpers/checkForEnd';
import PHASE from 'common/phaseEnums';

import { FoulContainer, PlayerNumber, CardContainer, Card, RemoveFoul, AddFoul, FoulIcon, BackButton } from './style';

interface Props {
  order: number;
  playerNumber: number;
}

export default ({ order, playerNumber }: Props) => {
  const dispatch = useDispatch();

  const {
    activePlayer,
    opensTable,
    gameState: { phase },
  } = useSelector(gameSelector);
  const players = useSelector(playersSelector);

  const {
    isAlive,
    role,
    fouls: { muted, amount },
  } = players[playerNumber];

  const [foulsAmount, setFoulsAmount] = useState(amount);
  const [lastFoulDeath, setLastFoulDeath] = useState(false);

  const returnToLifeTimer = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 5000,
    onTimeOver: () => setLastFoulDeath(false),
  });

  useCheckForEnd();

  const addFourthFoulTimer = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 2000,
    onTimeOver: () => {
      batch(() => {
        dispatch(addFoul(playerNumber));
        dispatch(skipVotingEnable());
      });

      if (phase === PHASE.DAY) {
        setLastFoulDeath(true);
        returnToLifeTimer.start();
      }
    },
  });

  const addFoulClicked = () => {
    if (foulsAmount === 4) return;

    setFoulsAmount(foulsAmount + 1);
    if (foulsAmount !== 3) return dispatch(addFoul(playerNumber));
    addFourthFoulTimer.start();
  };

  const removeFoulClicked = () => {
    if (foulsAmount === 0) return;

    setFoulsAmount(foulsAmount - 1);

    if (foulsAmount === 4) {
      addFourthFoulTimer.reset();
    } else {
      dispatch(removeFoul(playerNumber));
    }
  };

  const backToLife = () => {
    returnToLifeTimer.reset();
    batch(() => {
      dispatch(returnPlayerToGame(playerNumber));
      dispatch(skipVotingDisable());
    });
    setFoulsAmount(3);
    setLastFoulDeath(false);
  };

  return (
    <CardContainer order={order}>
      <Card activePlayer={phase === PHASE.DAY && activePlayer === playerNumber}>
        <PlayerNumber
          role={role}
          isMuted={muted}
          isAlive={isAlive}
          opensTable={phase === PHASE.DAY && opensTable === playerNumber}
        >
          {lastFoulDeath && (
            <BackButton onClick={backToLife}>
              <NextIcon fill='lightgrey' />
            </BackButton>
          )}

          <div className='number'>{playerNumber + 1}</div>
        </PlayerNumber>

        <FoulContainer isAlive={isAlive}>
          <RemoveFoul onClick={removeFoulClicked} className={playerNumber === 7 ? 'remove-foul' : ''}>
            <FoulIcon remove>
              <MinimizeIcon size='50%' />
            </FoulIcon>
          </RemoveFoul>

          <AddFoul amount={foulsAmount} onClick={addFoulClicked} className={playerNumber === 7 ? 'add-foul' : ''}>
            {foulsAmount ? (
              '!'.repeat(foulsAmount)
            ) : (
              <FoulIcon>
                <MaximizeIcon size='50%' />
              </FoulIcon>
            )}
          </AddFoul>
        </FoulContainer>
      </Card>
    </CardContainer>
  );
};
