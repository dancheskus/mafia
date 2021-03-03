/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { resetPlayersReducer } from 'redux/actions/playersActions';
import { resetGameReducer } from 'redux/actions/gameActions';
import { gameSelector, settingsSelector } from 'redux/selectors';
import PHASE from 'common/phaseEnums';
import Modal from 'components/Modal';
import useChangeLanguage from 'helpers/useChangeLanguage';

import { StyledNavMenu, MenuItems, LanguageButton } from './style';
import Settings from './Settings';

export default function NavMenu() {
  const { t } = useTranslation(['common', 'navMenu']);
  const [currentLang, changeLang] = useChangeLanguage();
  const dispatch = useDispatch();
  const { phase } = useSelector(gameSelector).gameState;
  const { tutorialEnabled } = useSelector(settingsSelector);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSettingsPage, setIsSettingsPage] = useState(false);

  const askNewGameConfirmation = phase !== PHASE.SEATALLOCATOR && phase !== PHASE.ENDOFGAME;

  const startNewGame = () => {
    localStorage.clear();

    batch(() => {
      dispatch(resetGameReducer());
      dispatch(resetPlayersReducer());
    });

    setIsChecked(false);
  };

  return (
    <>
      <StyledNavMenu tutorialEnabled={tutorialEnabled}>
        <input
          type='checkbox'
          onChange={() => {
            setIsChecked(!isChecked);
            setIsSettingsPage(false);
          }}
          checked={isChecked}
          className='navi_check'
          id='navi-toggle'
        />

        <label htmlFor='navi-toggle' className='navi_button'>
          <span className='navi_icon'>&nbsp;</span>
        </label>

        <div className='navi-background' />

        <Settings hide={!isSettingsPage} onClose={() => setIsSettingsPage(false)} />

        <MenuItems hide={isSettingsPage} className='navi_nav'>
          <ul className='navi_list'>
            <li onClick={() => setIsSettingsPage(true)} className='navi_item'>
              <div className='navi_link'>{t('navMenu:settings')}</div>
            </li>

            <li className='navi_item'>
              <div
                onClick={() => (askNewGameConfirmation ? setIsModalOpened(true) : startNewGame())}
                className='navi_link'
              >
                {t('newGame')}
              </div>
            </li>

            <li className='navi_item'>
              <div style={{ paddingTop: '15px' }}>
                <LanguageButton onClick={() => changeLang('ru')} selected={currentLang.includes('ru')}>
                  RU
                </LanguageButton>

                <LanguageButton onClick={() => changeLang('en')} selected={currentLang.includes('en')}>
                  EN
                </LanguageButton>
              </div>
            </li>
          </ul>
        </MenuItems>

        <div className='menu-footer'>
          {t('navMenu:signature.project')}{' '}
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/dancheskus'>
            {t('navMenu:signature.name')}
          </a>
          . 2018-2021г.
        </div>
      </StyledNavMenu>

      <Modal opened={isModalOpened} onClose={() => setIsModalOpened(false)} onAccept={startNewGame}>
        {t('navMenu:startNewGame')}
      </Modal>
    </>
  );
}
