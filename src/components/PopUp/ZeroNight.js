import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PopUpButton from './style/PopUpButton';
import Timer from '../Timer';
import colors from '../../colors';
import { changeGameState } from './../../redux/actions/gameActions';

const Label = styled.h1`
  color: ${colors.ZeroNight.popupText};
  text-transform: uppercase;
  font-size: 300%;
  text-align: center;
`;

class ZeroNight extends Component {
  state = { dogovorka: true };

  render = () => (
    <Fragment>
      {this.state.dogovorka ? (
        <Fragment>
          <Label>Договорка</Label>
          <Timer />
          <PopUpButton onClick={() => this.setState({ dogovorka: false })} color="ZeroNight">
            Далее
          </PopUpButton>
        </Fragment>
      ) : (
        <Fragment>
          <Label>Знакомство с шерифом и доном</Label>
          <PopUpButton onClick={() => this.props.changeGameState({ phase: 'Day', dayNumber: 1 })} color="ZeroNight">
            День
          </PopUpButton>
        </Fragment>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = dispatch => ({ changeGameState: payload => dispatch(changeGameState(payload)) });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZeroNight);
