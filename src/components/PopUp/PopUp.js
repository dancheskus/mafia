import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import colors from '../../colors';

const StyledPopUp = styled.div`
  background: ${colors.SeatAllocator.popupBackground};
  border-radius: 10px;
  box-shadow: 0px 9px 24px -2px rgba(0, 0, 0, 0.52);
  user-select: none;
  position: relative;

  ${props =>
    props.minimized
      ? ` width: 100px; height: 100px; `
      : `
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      `};
`;

const MinimizeButton = styled.div`
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${colors.SeatAllocator.popupButton};
  position: absolute;
  top: 15px;
  right: 15px;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.3);

    &::after {
      width: 7px;
      height: 7px;
    }
  }

  &::after {
    transition: all 0.2s;
    content: '';
    width: 0;
    height: 0;
    border-radius: 50%;
    background: ${colors.SeatAllocator.popupBackground};
  }
`;

class PopUp extends Component {
  state = { minimized: false };

  minimizeClicked = () => this.setState({ minimized: !this.state.minimized });

  render = () => (
    <StyledPopUp minimized={this.state.minimized}>
      <MinimizeButton onClick={this.minimizeClicked} />
      {!this.state.minimized ? this.props.children : null}
    </StyledPopUp>
  );
}

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(PopUp);
