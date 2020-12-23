import styled from 'styled-components';
import { useState } from 'react';

import colors from 'style/colors';
import { ResetIcon } from 'icons/svgIcons';
import Modal from 'components/Modal';

const ResetButtonStyle = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${colors.Voting.popupButton};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  transition: filter 0.2s !important;

  :hover {
    filter: brightness(110%);
  }
`;

export default function ResetButton({ onClick }: { onClick: () => void }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <ResetButtonStyle data-testid='resetButton' onClick={() => setIsOpened(true)}>
        <ResetIcon size='75%' />
      </ResetButtonStyle>

      <Modal opened={isOpened} onClose={() => setIsOpened(false)} onAccept={onClick}>
        Хотите сбросить голосование?
      </Modal>
    </>
  );
}
