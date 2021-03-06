import { useSelector, useDispatch, batch } from 'react-redux';
import { countBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import { addRole } from 'redux/actions/playersActions';
import { numbersPanelClickable, addToSelectedNumbers } from 'redux/actions/gameActions';
import colors from 'style/colors';
import { ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import { PopUpButton } from 'components/PopUp/styled-components';
import useOnMount from 'helpers/useOnMount';
import { gameSelector, playersSelector } from 'redux/selectors';
import ROLE from 'common/playerEnums';

import { Notification, RoleCard, RoleSelection, RoleSelectionWrapper } from './style';
import useResetMode from '../useResetMode';
import startGame from '../startGame';

const { popupIconLight, popupIcon } = colors.RoleDealing;

export default function ManualMode({ resetMode }: { resetMode: () => void }) {
  const { t } = useTranslation(['common', 'roleDealing']);
  const dispatch = useDispatch();
  const players = useSelector(playersSelector);
  const { selectedNumbers } = useSelector(gameSelector);

  useResetMode(resetMode);

  useOnMount(() => {
    batch(() => {
      dispatch(addToSelectedNumbers(0));
      dispatch(numbersPanelClickable());
    });
  });

  const [playerNumber] = selectedNumbers;

  const changeSelection = (role: ROLE) => dispatch(addRole({ playerNumber, role }));

  const currentPlayerRole = players[playerNumber]?.role || null;

  const { МАФИЯ, ШЕРИФ, ДОН } = countBy(players.map(({ role }) => role));
  const isButtonDisabled = МАФИЯ !== 2 || ШЕРИФ !== 1 || ДОН !== 1;
  const isDonDisabled = ДОН === 1 && currentPlayerRole !== ROLE.DON;
  const isMafiaDisabled = МАФИЯ === 2 && currentPlayerRole !== ROLE.MAFIA;
  const isSherifDisabled = ШЕРИФ === 1 && currentPlayerRole !== ROLE.SHERIF;

  return (
    <>
      <RoleSelectionWrapper className='role-selection-wrapper'>
        <RoleSelection>
          <RoleCard
            data-testid='mirnijButton'
            onClick={() => changeSelection(ROLE.MIRNIJ)}
            selected={currentPlayerRole === ROLE.MIRNIJ}
          >
            <ThumbUpIcon size='45%' fill={popupIconLight} />
          </RoleCard>

          <RoleCard
            data-testid='donButton'
            disabled={isDonDisabled}
            onClick={() => changeSelection(ROLE.DON)}
            selected={currentPlayerRole === ROLE.DON}
          >
            <DonRingIcon size='45%' fill={popupIcon} />
          </RoleCard>

          <RoleCard
            data-testid='mafiaButton'
            disabled={isMafiaDisabled}
            onClick={() => changeSelection(ROLE.MAFIA)}
            selected={currentPlayerRole === ROLE.MAFIA}
          >
            <ThumbDownIcon size='45%' fill={popupIcon} />
          </RoleCard>

          <RoleCard
            data-testid='sheriffButton'
            disabled={isSherifDisabled}
            onClick={() => changeSelection(ROLE.SHERIF)}
            selected={currentPlayerRole === ROLE.SHERIF}
          >
            <SheriffOkIcon size='45%' fill={popupIconLight} />
          </RoleCard>
        </RoleSelection>
      </RoleSelectionWrapper>

      <Notification data-testid='roleNotification' disabled={isButtonDisabled}>
        {t('roleDealing:requiredRolesMessage')}
      </Notification>

      <div className='flex-grow-1 d-flex align-items-center'>
        <PopUpButton onClick={() => startGame(dispatch)} color='RoleDealing' disabled={isButtonDisabled}>
          {t('playGameButton')}
        </PopUpButton>
      </div>
    </>
  );
}
