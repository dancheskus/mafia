import React, { Component } from 'react';
import { shuffle, concat, fill } from 'lodash';
import { connect } from 'react-redux';

import {
  lightModeOff,
  lightModeOn,
  clearSelectedNumbers,
  changeGameState,
  replaceSelectedNumbersWith,
} from 'redux/actions/gameActions';
import { addRole } from 'redux/actions/playersActions';
import colors from 'style/colors';
import { EyeIcon, ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';

import { PressText, RoleName, ScaledPopUpButton, Card } from './style';

const { popupIcon, popupIconLight } = colors.RoleDealing;

class RandomMode extends Component {
  state = { role: null };

  allRoles = shuffle(concat(fill(Array(6), 'МИРНЫЙ'), 'ШЕРИФ', 'МАФИЯ', 'МАФИЯ', 'ДОН'));

  componentDidMount = () => this.props.replaceSelectedNumbersWith(0);

  componentWillUnmount = () => clearTimeout(this.closeCardTimer);

  componentDidUpdate = prevState => {
    // Возвращаемся на пред. страницу при "Новой игре"
    prevState.game.selectedNumbers.length > 0 && this.props.game.selectedNumbers.length === 0 && this.props.resetMode();
  };

  cardClicked = () => {
    const playerNumber = this.props.game.selectedNumbers[0];

    if (this.state.role) return;

    this.closeCardTimer = setTimeout(() => {
      this.setState({ role: null });
      this.props.lightModeOff();
      this.props.replaceSelectedNumbersWith(playerNumber + 1);
    }, 1800);

    if (!this.allRoles.length) return;

    const role = this.allRoles.pop();
    this.props.addRole({ playerNumber, role });
    this.setState({ role });
    if (role === 'МИРНЫЙ' || role === 'ШЕРИФ') this.props.lightModeOn();
  };

  startGameClicked = () => {
    this.props.clearSelectedNumbers();
    this.props.changeGameState({ phase: 'ZeroNight' });
  };

  render = () => (
    <Card onClick={this.cardClicked}>
      {!this.state.role && !!this.allRoles.length && (
        <>
          <EyeIcon size='40%' fill={popupIcon} />
          <PressText>Нажми</PressText>
        </>
      )}

      {!this.state.role && !this.allRoles.length && (
        <ScaledPopUpButton onClick={this.startGameClicked} color='RoleDealing'>
          Играть
        </ScaledPopUpButton>
      )}

      {this.state.role &&
        ((this.state.role === 'МАФИЯ' && <ThumbDownIcon size='30%' fill={popupIcon} />) ||
          (this.state.role === 'ДОН' && <DonRingIcon size='30%' fill={popupIcon} />) ||
          (this.state.role === 'МИРНЫЙ' && <ThumbUpIcon size='30%' fill={popupIconLight} />) ||
          (this.state.role === 'ШЕРИФ' && <SheriffOkIcon size='30%' fill={popupIconLight} />))}

      {this.state.role && <RoleName light={this.props.game.lightMode}>{this.state.role}</RoleName>}
    </Card>
  );
}

export default connect(({ game }) => ({ game }), {
  lightModeOff,
  lightModeOn,
  clearSelectedNumbers,
  addRole,
  changeGameState,
  replaceSelectedNumbersWith,
})(RandomMode);
