/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RandomCubeIcon, ListIcon } from 'icons/svgIcons';
import { settingsSelector } from 'redux/selectors';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from 'helpers/localStorageHelpers';
import useOnUnmount from 'helpers/useOnUnmount';
import PHASE from 'common/phaseEnums';

import { PopUpButton } from '../styled-components';
import RandomMode from './RandomMode';
import ManualMode from './ManualMode';
import SvgWrapper from './SvgWrapper';

const svgClassName = 'flex-grow-1 d-flex align-items-center justify-content-center';

export const cleanRoleDealingLocalStorage = () => removeFromLocalStorage(['randomModeSelected', 'modeApproved']);

export default function RoleDealing() {
  const { t } = useTranslation('roleDealing');
  const { tutorialEnabled } = useSelector(settingsSelector);

  const [randomModeSelected, setRandomModeSelected] = useState(getFromLocalStorage('randomModeSelected') ?? true);
  const [modeApproved, setModeApproved] = useState(getFromLocalStorage('modeApproved') ?? false);

  useEffect(() => {
    addToLocalStorage({ randomModeSelected });
    addToLocalStorage({ modeApproved });
  }, [randomModeSelected, modeApproved]);

  useOnUnmount(cleanRoleDealingLocalStorage);

  useEffect(() => {
    if (tutorialEnabled && modeApproved === false) {
      setModeApproved(true);
      setRandomModeSelected(false);
    }
  }, [tutorialEnabled, modeApproved]);

  const resetMode = () => setModeApproved(false);

  if (modeApproved)
    return randomModeSelected ? <RandomMode resetMode={resetMode} /> : <ManualMode resetMode={resetMode} />;

  return (
    <>
      <SvgWrapper>
        <div className={svgClassName} onClick={() => setRandomModeSelected(true)}>
          <RandomCubeIcon className={randomModeSelected ? 'selected' : undefined} size='100px' />
        </div>

        <div className={svgClassName} onClick={() => setRandomModeSelected(false)}>
          <ListIcon className={!randomModeSelected ? 'selected' : undefined} size='100px' />
        </div>
      </SvgWrapper>

      <div className='flex-grow-1 d-flex align-items-center'>
        <PopUpButton data-testid='nextButton' color={PHASE.ROLEDEALING} onClick={() => setModeApproved(true)}>
          {randomModeSelected ? t('automatically') : t('manually')}
        </PopUpButton>
      </div>
    </>
  );
}
