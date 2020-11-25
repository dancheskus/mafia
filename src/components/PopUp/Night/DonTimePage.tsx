import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { SheriffStarIcon, NextIcon } from 'icons/svgIcons';
import { playersSelector } from 'redux/selectors';
import ROLE from 'common/playerEnums';

import { PopUpLabel, PopUpButton } from '../styled-components';
import { BackButton, Sheriff } from './style';

interface Props {
  setDonTime: Dispatch<SetStateAction<boolean>>;
  setPlayerToKill: Dispatch<SetStateAction<number | undefined>>;
  setSheriffTime: Dispatch<SetStateAction<boolean>>;
}

export default ({ setDonTime, setPlayerToKill, setSheriffTime }: Props) => {
  const players = useSelector(playersSelector);

  return (
    <>
      <BackButton
        onClick={() => {
          setDonTime(false);
          setPlayerToKill(undefined);
        }}
      >
        <NextIcon />
      </BackButton>

      <PopUpLabel color='Night' className='h2'>
        Дон ищет шерифа
      </PopUpLabel>

      <Sheriff>
        <SheriffStarIcon />

        <span>{players.findIndex(({ role }) => role === ROLE.SHERIF) + 1}</span>
      </Sheriff>

      <PopUpButton onClick={() => setSheriffTime(true)} color='Night'>
        Далее
      </PopUpButton>
    </>
  );
};
