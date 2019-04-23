import styled from 'styled-components';
import colors from 'colors.js';

export default styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${colors.Voting.popupButton};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: absolute;
  bottom: 15px;
  left: 15px;
  cursor: pointer;
  transition: filter 0.2s !important;

  :hover {
    filter: brightness(110%);
  }
`;
