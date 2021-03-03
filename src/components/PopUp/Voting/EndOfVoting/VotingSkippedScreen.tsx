import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { PopUpButton, PopUpLabel } from 'components/PopUp/styled-components';
import { gameSelector } from 'redux/selectors';

export default function VotingSkippedScreen({ goToNight }: { goToNight: () => void }) {
  const { t } = useTranslation(['voting', 'common']);
  const {
    skipVoting,
    selectedNumbers,
    gameState: { dayNumber },
  } = useSelector(gameSelector);

  return (
    <>
      <PopUpLabel className='h2'>{t('votingSkipped.noVoting')}</PopUpLabel>

      {selectedNumbers.length === 1 && dayNumber === 1 ? (
        <PopUpLabel light className='h3'>
          {t('votingSkipped.firstDayOnePlayerVoting')}
        </PopUpLabel>
      ) : (
        skipVoting && (
          <PopUpLabel light className='h3'>
            {t('votingSkipped.fourthFoulReceived')}
          </PopUpLabel>
        )
      )}

      <PopUpButton color='Voting' onClick={goToNight}>
        {t('common:nightButton')}
      </PopUpButton>
    </>
  );
}
