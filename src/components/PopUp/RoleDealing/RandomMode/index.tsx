import { useState } from 'react';
import { shuffle, concat, fill, clamp } from 'lodash';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useTimer } from 'use-timer';
import { useTranslation } from 'react-i18next';

import { lightModeOff, lightModeOn, replaceSelectedNumbersWith } from 'redux/actions/gameActions';
import { addRole } from 'redux/actions/playersActions';
import colors from 'style/colors';
import { EyeIcon, ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import useOnMount from 'helpers/useOnMount';
import { gameSelector, playersSelector } from 'redux/selectors';
import useOnUnmount from 'helpers/useOnUnmount';
import { playerIsRed, useGetAlivePlayersAmountByTeam } from 'helpers/roleHelpers';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from 'helpers/localStorageHelpers';
import ROLE from 'common/playerEnums';

import { PressText, RoleName, ScaledPopUpButton, Card } from './style';
import useResetMode from '../useResetMode';
import startGame from '../startGame';

const { popupIcon, popupIconLight } = colors.RoleDealing;

interface IRoleIcons {
  МАФИЯ: JSX.Element;
  ДОН: JSX.Element;
  МИРНЫЙ: JSX.Element;
  ШЕРИФ: JSX.Element;
}

const roleIcons: IRoleIcons = {
  МАФИЯ: <ThumbDownIcon size='30%' fill={popupIcon} />,
  ДОН: <DonRingIcon size='30%' fill={popupIcon} />,
  МИРНЫЙ: <ThumbUpIcon size='30%' fill={popupIconLight} />,
  ШЕРИФ: <SheriffOkIcon size='30%' fill={popupIconLight} />,
};

export default function RandomMode({ resetMode }: { resetMode: () => void }) {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { selectedNumbers, lightMode } = useSelector(gameSelector);
  const players = useSelector(playersSelector);
  const [cardOpened, setCardOpened] = useState(false);

  const lastCardRevealed = getFromLocalStorage('lastCardRevealed') ?? false;
  const allAliveRedPlayers = useGetAlivePlayersAmountByTeam('red');

  const [playerNumber] = selectedNumbers;
  const role = players[playerNumber]?.role;

  const { start: startCardBlockingTimer, status: timerStatus } = useTimer({
    initialTime: 1,
    endTime: 0,
    timerType: 'DECREMENTAL',
    interval: 1800,
    onTimeOver: () => {
      playerNumber === players.length - 1 && addToLocalStorage({ lastCardRevealed: true });
      const nextPlayerNumber = playerNumber + 1;
      setCardOpened(false);
      batch(() => {
        dispatch(lightModeOff());
        dispatch(replaceSelectedNumbersWith(clamp(nextPlayerNumber, 0, 9)));
      });
    },
  });

  useResetMode(resetMode);

  useOnMount(() => {
    batch(() => {
      if (allAliveRedPlayers === 10) {
        const shuffledRoles = shuffle(
          concat(fill(Array(6), ROLE.MIRNIJ), ROLE.SHERIF, ROLE.MAFIA, ROLE.MAFIA, ROLE.DON),
        );
        shuffledRoles.forEach((role, playerNumber) => dispatch(addRole({ playerNumber, role })));
      }
      dispatch(replaceSelectedNumbersWith(selectedNumbers[0] ?? 0));
    });
  });

  useOnUnmount(() => {
    removeFromLocalStorage('lastCardRevealed');
    dispatch(lightModeOff());
  });

  const showRole = () => {
    setCardOpened(true);
    playerIsRed(role) && dispatch(lightModeOn());

    startCardBlockingTimer();
  };

  return (
    <>
      {!lastCardRevealed ? (
        <Card disabled={timerStatus === 'RUNNING'} onClick={showRole}>
          {!cardOpened ? (
            <>
              <EyeIcon size='40%' fill={popupIcon} />

              <PressText>{t('pressButton')}</PressText>
            </>
          ) : (
            <>
              {roleIcons[role]}

              <RoleName light={lightMode}>{role}</RoleName>
            </>
          )}
        </Card>
      ) : (
        <ScaledPopUpButton onClick={() => startGame(dispatch)} color='RoleDealing'>
          {t('playGameButton')}
        </ScaledPopUpButton>
      )}
    </>
  );
}
