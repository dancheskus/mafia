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
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { popupMinimized, selectedNumbers } = useSelector(gameSelector);

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

  const [justKilledPlayer] = selectedNumbers;

  return (
    <GameResult>
      Победа {black >= red ? ' черных' : ' красных'}
      {justKilledPlayer >= 0 && <KilledPlayer>Ночью был убит {justKilledPlayer + 1} игрок.</KilledPlayer>}
      <PopUpButton onClick={startNewGame} color={phase}>
        {t('newGame')}
      </PopUpButton>
    </GameResult>
  );
}
