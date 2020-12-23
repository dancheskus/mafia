import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

import { PopUpButton } from 'components/PopUp/styled-components';

import { Backdrop, ModalButtonGroup, ModalStyle, ModalTitle } from './style';

interface IModal {
  children: ReactNode;
  opened?: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function Modal({ children, opened, onClose, onAccept }: IModal) {
  const modal = createPortal(
    <>
      <Backdrop />

      <ModalStyle>
        <ModalTitle>{children}</ModalTitle>

        <ModalButtonGroup>
          <PopUpButton small color='Voting' onClick={onClose}>
            отмена
          </PopUpButton>

          <PopUpButton
            small
            color='Night'
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            ок
          </PopUpButton>
        </ModalButtonGroup>
      </ModalStyle>
    </>,
    document.getElementById('portal')!,
  );

  return opened ? modal : null;
}
