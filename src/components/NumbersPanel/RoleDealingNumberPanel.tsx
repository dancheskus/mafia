import { batch, useDispatch, useSelector } from 'react-redux';
import { range } from 'lodash';
import { useTranslation } from 'react-i18next';

import { addToSelectedNumbers, clearSelectedNumbers } from 'redux/actions/gameActions';
import { gameSelector, playersSelector } from 'redux/selectors';
import ROLE from 'common/playerEnums';
import PHASE from 'common/phaseEnums';
import firstLetter from 'helpers/firstLetter';

import { Panel, PanelItem } from './style';

const phase = PHASE.ROLEDEALING;

export default function RoleDealingNumberPanel() {
  const { t } = useTranslation('playerRoles');
  const { numbersPanelClickable, selectedNumbers } = useSelector(gameSelector);
  const players = useSelector(playersSelector);
  const dispatch = useDispatch();

  const selectPlayer = (playerNumber: number) => {
    if (!numbersPanelClickable) return;

    batch(() => {
      dispatch(clearSelectedNumbers());
      dispatch(addToSelectedNumbers(playerNumber));
    });
  };

  return (
    <Panel color={phase} className='role-dealing-panel'>
      {range(0, 10).map(num => (
        <PanelItem
          pointer={numbersPanelClickable}
          color={phase}
          key={num}
          selected={num === selectedNumbers[0]}
          onClick={() => selectPlayer(num)}
        >
          {numbersPanelClickable && players[num].role === ROLE.MAFIA && firstLetter(t('mafia'))}
          {numbersPanelClickable && players[num].role === ROLE.SHERIF && firstLetter(t('sheriff'))}
          {numbersPanelClickable && players[num].role === ROLE.DON && firstLetter(t('don'))}
          {numbersPanelClickable && players[num].role === ROLE.MIRNIJ && num + 1}
          {!numbersPanelClickable && num + 1}
        </PanelItem>
      ))}
    </Panel>
  );
}
