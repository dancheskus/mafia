import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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

export default function DonTimePage({ setDonTime, setPlayerToKill, setSheriffTime }: Props) {
  const { t } = useTranslation(['common', 'night']);
  const players = useSelector(playersSelector);

  return (
    <>
      <BackButton
        data-testid='backToShootingButton'
        onClick={() => {
          setDonTime(false);
          setPlayerToKill(undefined);
        }}
      >
        <NextIcon />
      </BackButton>

      <PopUpLabel color='Night' className='h2'>
        {t('night:donSearchesSheriff')}
      </PopUpLabel>

      <Sheriff>
        <SheriffStarIcon />

        <span>{players.findIndex(({ role }) => role === ROLE.SHERIF) + 1}</span>
      </Sheriff>

      <PopUpButton onClick={() => setSheriffTime(true)} color='Night'>
        {t('nextButton')}
      </PopUpButton>
    </>
  );
}
