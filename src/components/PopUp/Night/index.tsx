import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import VictimSelector from 'components/VictimSelector';

import { PopUpLabel, PopUpButton } from '../styled-components';
import SheriffTimePage from './SheriffTimePage';
import DonTimePage from './DonTimePage';

export default function Night() {
  const { t } = useTranslation(['common', 'night']);
  const [playerToKill, setPlayerToKill] = useState<number>();
  const [donTime, setDonTime] = useState(false);
  const [sheriffTime, setSheriffTime] = useState(false);

  const onNumberSelected = (num: number) => setPlayerToKill(num === playerToKill ? undefined : num);

  if (sheriffTime) return <SheriffTimePage setSheriffTime={setSheriffTime} playerToKill={playerToKill} />;

  if (donTime)
    return <DonTimePage setDonTime={setDonTime} setPlayerToKill={setPlayerToKill} setSheriffTime={setSheriffTime} />;

  return (
    <>
      <PopUpLabel color='Night' className='h2'>
        {t('night:whoMafiaKills')}
      </PopUpLabel>

      <VictimSelector shooting onNumberSelected={onNumberSelected} />

      <PopUpButton onClick={() => setDonTime(true)} color='Night'>
        {t('nextButton')}
      </PopUpButton>
    </>
  );
}
