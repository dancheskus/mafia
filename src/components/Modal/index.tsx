import { createPortal } from 'react-dom';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { PopUpButton } from 'components/PopUp/styled-components';

import { Backdrop, ModalButtonGroup, ModalStyle, ModalTitle } from './style';

interface IModal {
  children: ReactNode;
  opened?: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function Modal({ children, opened, onClose, onAccept }: IModal) {
  const { t } = useTranslation('common');

  const modal = createPortal(
    <>
      <Backdrop />

      <ModalStyle>
        <ModalTitle>{children}</ModalTitle>

        <ModalButtonGroup>
          <PopUpButton small color='Voting' onClick={onClose}>
            {t('cancelButton')}
          </PopUpButton>

          <PopUpButton
            small
            color='Night'
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            {t('okButton')}
          </PopUpButton>
        </ModalButtonGroup>
      </ModalStyle>
    </>,
    document.getElementById('portal')!,
  );

  return opened ? modal : null;
}
