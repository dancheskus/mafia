import { batch, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useOnMount from 'helpers/useOnMount';
import { resetGameReducer, minimizeMaximaizePopup } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
import { gameSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';
import { useGetAlivePlayersAmountByTeam } from 'helpers/roleHelpers';

import { PopUpButton } from '../styled-components';
import { GameResult, KilledPlayer } from './style';

const phase = PHASE.ENDOFGAME;

export default function EndOfGame() {
  const { t } = useTranslation(['endOfGame', 'common']);
  const dispatch = useDispatch();
  const { popupMinimized, killedAtNightPlayer } = useSelector(gameSelector);

  useOnMount(() => {
    popupMinimized && dispatch(minimizeMaximaizePopup());
  });

  const startNewGame = () => {
    batch(() => {
      dispatch(resetGameReducer());
      dispatch(resetPlayersReducer());
    });
  };

  const { red, black } = useGetAlivePlayersAmountByTeam('all');

  return (
    <GameResult>
      {t('winnerMessage', { context: black >= red ? 'black' : 'red' })}

      {killedAtNightPlayer && (
        <KilledPlayer>{t('killedAtNightPlayer', { playerNumber: killedAtNightPlayer + 1 })}</KilledPlayer>
      )}

      <PopUpButton onClick={startNewGame} color={phase}>
        {t('common:newGame')}
      </PopUpButton>
    </GameResult>
  );
}
