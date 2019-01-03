import React, { Component } from 'react';
import { connect } from 'react-redux';

import PopUpButton from './styled-components/PopUpButton';
import Timer from '../Timer';
import { changeGameState } from './../../redux/actions/gameActions';
import PopUpLabel from './styled-components/PopUpLabel';

class ZeroNight extends Component {
  state = { dogovorka: true };

  startGame = () => this.props.changeGameState({ phase: 'Day', dayNumber: 1 });

  render = () => (
    <>
      {this.state.dogovorka ? (
        <>
          <PopUpLabel color="ZeroNight" className="h1">
            Договорка
          </PopUpLabel>
          <Timer />
          <PopUpButton onClick={() => this.setState({ dogovorka: false })} color="ZeroNight">
            Далее
          </PopUpButton>
        </>
      ) : (
        <>
          <PopUpLabel color="ZeroNight" className="h2">
            Знакомство с шерифом и доном
          </PopUpLabel>
          <PopUpButton onClick={this.startGame} color="ZeroNight">
            День
          </PopUpButton>
        </>
      )}
    </>
  );
}

export default connect(
  ({ game }) => ({ game }),
  { changeGameState }
)(ZeroNight);
