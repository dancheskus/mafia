import { useState } from 'react';

import VictimSelector from 'components/VictimSelector';

import { PopUpLabel, PopUpButton } from '../styled-components';
import SheriffTimePage from './SheriffTimePage';
import DonTimePage from './DonTimePage';

export default function Night() {
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
        В кого стреляет мафия?
      </PopUpLabel>

      <VictimSelector shooting onNumberSelected={onNumberSelected} />

      <PopUpButton onClick={() => setDonTime(true)} color='Night'>
        Далее
      </PopUpButton>
    </>
  );
}
