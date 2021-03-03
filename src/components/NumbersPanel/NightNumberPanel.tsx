import { useTranslation } from 'react-i18next';

import { useGetAlivePlayersAmountByTeam } from 'helpers/roleHelpers';
import PHASE from 'common/phaseEnums';

import { Panel, PanelText } from './style';

const phase = PHASE.NIGHT;

export default function NightNumberPanel() {
  const { t } = useTranslation('numbersPanel');
  const { red, black } = useGetAlivePlayersAmountByTeam('all');

  return (
    <Panel color={phase}>
      <PanelText>
        {t('night.aliveMafias')}: {black}
      </PanelText>
      <PanelText>
        {t('night.aliveCivilians')}: {red}
      </PanelText>
    </Panel>
  );
}
