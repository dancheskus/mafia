import styled from 'styled-components';
import colors from '../../../colors';

export default styled.button`
  background: ${props => (props.light ? colors[props.color].popupButtonLight : colors[props.color].popupButton)};
  padding: 10px 25px;
  border: none;
  color: white;
  border-radius: 30px;
  font-size: 1.1rem;
  text-transform: uppercase;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(110%);
  }

  &:focus {
    outline: none;
  }
`;
