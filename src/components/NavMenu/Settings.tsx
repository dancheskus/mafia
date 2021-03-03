import { Howl } from 'howler';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { enableTutorial } from 'redux/actions/settingsActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { resetPlayersReducer } from 'redux/actions/playersActions';
// @ts-expect-error
import secondsSoundFile from 'audio/Countdown_10sec_effects.mp3';
// @ts-expect-error
import countdownEndFile from 'audio/Countdown_end.mp3';
import { NextIcon } from 'icons/svgIcons';
import { settingsSelector } from 'redux/selectors';
import { cleanRoleDealingLocalStorage } from 'components/PopUp/RoleDealing';

import SettingsItem from './SettingsItem';
import { AppSettings, BottomButton, BackButton, BottomButtonsGroup } from './style';

const secondsSound = new Howl({ src: `${secondsSoundFile}`, sprite: { oneSec: [0, 1020] } });
const countdownEndSound = new Howl({ src: `${countdownEndFile}` });

interface Props {
  hide?: boolean;
  onClose: () => void;
}

export default function Settings({ hide, onClose }: Props) {
  const { t } = useTranslation('navMenu');
  const dispatch = useDispatch();
  const { tutorialEnabled } = useSelector(settingsSelector);

  const startTutorial = () => {
    cleanRoleDealingLocalStorage();

    batch(() => {
      dispatch(resetGameReducer());
      dispatch(resetPlayersReducer());
      dispatch(enableTutorial());
    });
  };

  const enableSounds = () => {
    secondsSound.play('oneSec');

    setTimeout(() => countdownEndSound.play(), 1500);
  };

  return (
    <AppSettings hide={hide} tutorialEnabled={tutorialEnabled}>
      <BackButton onClick={onClose}>
        <NextIcon />
      </BackButton>

      <SettingsItem title={t('settingsItem.seatAllocator')} type='seatAllocator' />
      <SettingsItem title={t('settingsItem.appMusic')} type='appMusic' />
      <SettingsItem title={t('settingsItem.timerSounds')} type='timerSounds' />
      <SettingsItem title={t('settingsItem.mafiaTimer')} type='mafiaTimer' />
      <SettingsItem title={t('settingsItem.multiplePlayerRemove')} type='multiplePlayerRemove' />

      <BottomButtonsGroup>
        <BottomButton onClick={startTutorial}>{t('buttons.enableTutorial')}</BottomButton>
        <BottomButton onClick={enableSounds}>{t('buttons.soundsExample')}</BottomButton>
      </BottomButtonsGroup>
    </AppSettings>
  );
}
