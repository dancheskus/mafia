import styled from 'styled-components';

export const AppWrapper = styled.div`
  height: 100vh;
  height: ${({ appHeight }) => appHeight}px;
  overflow: hidden;
`;

export const MainApp = styled.div`
  flex-grow: 1;
  min-height: 0;
  background-image: radial-gradient(circle at right bottom, #8b96af, #666a73);
  .container {
    padding: 15px;
  }
`;

export const MainContentWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  position: relative;
  justify-content: center;
  min-height: 0;
`;

export const UnsupportedRes = styled.div`
  z-index: 5000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;

  > h3 {
    width: 50%;
    text-align: center;
    background: white;
    color: black;
    padding: 30px 10px;
    border-radius: 20px;
    opacity: 0.8;
  }
`;
