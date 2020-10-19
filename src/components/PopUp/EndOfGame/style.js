import styled from 'styled-components';

export const GameResult = styled.div`
  width: 90%;
  height: 90%;
  background: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
`;

export const KilledPlayer = styled.div`
  font-size: 1.3rem;
  color: red;
`;
