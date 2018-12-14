import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import PopUpButton from './style/PopUpButton';
import Timer from '../Timer';
import colors from '../../colors';

const Label = styled.h1`
  color: ${colors.ZeroNight.popupText};
  text-transform: uppercase;
  font-size: 300%;
`;

export default class ZeroNight extends Component {
  state = { dogovorka: true };

  render = () => (
    <Fragment>
      {this.state.dogovorka ? <Label>Договорка</Label> : <Label>Знакомство с шерифом и доном</Label>}
      <Timer />
      <PopUpButton color="ZeroNight">Далее</PopUpButton>
    </Fragment>
  );
}
