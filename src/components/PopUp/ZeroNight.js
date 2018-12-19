import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PopUpButton from './style/PopUpButton';
import Timer from '../Timer';
import colors from '../../colors';
import { changeGameState, changeActivePlayer } from './../../redux/actions/gameActions';

const Label = styled.h1`
  color: ${colors.ZeroNight.popupText};
  text-transform: uppercase;
  font-size: 300%;
  text-align: center;
`;

class ZeroNight extends Component {
  state = { dogovorka: true };

  startGame = () => {
    this.props.changeGameState({ phase: 'Day', dayNumber: 1 });
    this.props.changeActivePlayer(1);
  };

  render = () => (
    <>
      {this.state.dogovorka ? (
        <>
          <Label>Договорка</Label>
          <Timer />
          <PopUpButton onClick={() => this.setState({ dogovorka: false })} color="ZeroNight">
            Далее
          </PopUpButton>
        </>
      ) : (
        <>
          <Label>Знакомство с шерифом и доном</Label>
          <PopUpButton onClick={this.startGame} color="ZeroNight">
            День
          </PopUpButton>
        </>
      )}
    </>
  );
}

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = dispatch => ({
  changeGameState: payload => dispatch(changeGameState(payload)),
  changeActivePlayer: playerNumber => dispatch(changeActivePlayer(playerNumber)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZeroNight);
