import styled from 'styled-components';
import { UncontrolledAlert } from 'reactstrap';

export default styled(UncontrolledAlert)`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3000;
  width: 80%;

  .close {
    font-family: times;
  }
`;
