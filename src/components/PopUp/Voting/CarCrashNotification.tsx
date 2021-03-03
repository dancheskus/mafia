import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { gameSelector } from 'redux/selectors';

import { ResultsNumbers } from './style';
import { PopUpLabel, PopUpButton } from '../styled-components';

export default function CarCrashNotification({ closeNotification }: { closeNotification: () => void }) {
  const { t } = useTranslation(['voting', 'common']);
  const { selectedNumbers } = useSelector(gameSelector);

  return (
    <>
      <PopUpLabel className='h1'>{t('reVoting')}</PopUpLabel>

      <ResultsNumbers>
        {selectedNumbers.map(num => (
          <div key={num}>{num + 1}</div>
        ))}
      </ResultsNumbers>

      <PopUpButton color='Voting' onClick={closeNotification}>
        {t('common:okButton')}
      </PopUpButton>
    </>
  );
}
