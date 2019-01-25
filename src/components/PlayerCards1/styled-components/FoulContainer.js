import styled from 'styled-components';

export default styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  display: ${props => !props.isAlive && 'none'};

  > div {
    width: 100%;
    height: 50%;
    color: white;
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
