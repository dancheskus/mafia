import RingLoader from 'react-spinners/RingLoader';
import styled from 'styled-components';

import colors from 'style/colors';

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <RingLoader size={40} color={colors.SeatAllocator.popupButton} />
    </SpinnerWrapper>
  );
}
