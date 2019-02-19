import styled from 'styled-components';
import { UncontrolledAlert } from 'reactstrap';

export default styled(UncontrolledAlert)`
  width: ${props => props.width};
  position: absolute;
  top: ${props => (props.top ? props.top : '60px')};
  /* left: 50%; */
  transform: translateX(-50%);
  text-align: ${props => (props.talign ? props.talign : 'center')};
  z-index: 112;

  .close {
    font-family: auto;
  }

  @media (max-width: 767px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;
