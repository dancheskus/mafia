import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { playerIsBlack } from 'helpers/roleHelpers';
import { playersSelector } from 'redux/selectors';
import ROLE from 'common/playerEnums';
import PHASE from 'common/phaseEnums';
import firstLetter from 'helpers/firstLetter';

import { Panel, PanelItem } from './style';

const phase = PHASE.ENDOFGAME;

export default function EndOfGameNumberPanel() {
  const { t } = useTranslation('playerRoles');
  const players = useSelector(playersSelector);

  return (
    <Panel color={phase}>
      {players.map(({ role, isAlive }, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <PanelItem isAlive={isAlive} color={phase} key={i} selected={playerIsBlack(role)}>
          {role === ROLE.SHERIF ? firstLetter(t('sheriff')) : role === ROLE.DON ? firstLetter(t('don')) : i + 1}
        </PanelItem>
      ))}
    </Panel>
  );
}
