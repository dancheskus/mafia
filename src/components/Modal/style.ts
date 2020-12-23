import styled from 'styled-components';

import colors from 'style/colors';
import { PopUpButton } from 'components/PopUp/styled-components';

export const ModalStyle = styled.div`
  max-width: 500px;
  width: 90%;
  background: ${colors.Voting.popupBackground};
  color: ${colors.Voting.popupTextInverse};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
`;

export const ModalTitle = styled.div`
  font-size: 1.1rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
`;

export const ModalButtonGroup = styled.div`
  ${PopUpButton} {
    margin-right: 20px;
  }
`;
