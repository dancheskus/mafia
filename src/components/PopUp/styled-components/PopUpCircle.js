import styled from 'styled-components';
import colors from '../../../colors';

export default styled.div`
  width: 180px;
  height: 180px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  color: ${colors.Voting.popupText};

  span {
    font-size: 4rem;
  }
`;
