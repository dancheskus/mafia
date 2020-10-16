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
    const { game, lightModeOff, replaceSelectedNumbersWith, addRole, lightModeOn } = this.props;
    const playerNumber = game.selectedNumbers[0];
    if (this.state.role || !this.allRoles.length) return;

    this.closeCardTimer = setTimeout(() => {
      this.setState({ role: null });
      lightModeOff();
      replaceSelectedNumbersWith(playerNumber + 1 <= 9 ? playerNumber + 1 : 9);
    }, 1800);

    const role = this.allRoles.pop();
    addRole({ playerNumber, role });
    this.setState({ role });
    if (role === 'МИРНЫЙ' || role === 'ШЕРИФ') lightModeOn();
  };

  startGameClicked = () => {
    const { clearSelectedNumbers, changeGameState } = this.props;

    clearSelectedNumbers();
    changeGameState({ phase: 'ZeroNight' });
  };

  render = () => {
    const { role } = this.state;

    return (
      <Card onClick={this.cardClicked}>
        {!role && !!this.allRoles.length && (
          <>
            <EyeIcon size='40%' fill={popupIcon} />

            <PressText>Нажми</PressText>
          </>
        )}

        {!role && !this.allRoles.length && (
          <ScaledPopUpButton onClick={this.startGameClicked} color='RoleDealing'>
            Играть
          </ScaledPopUpButton>
        )}

        {role &&
          ((role === 'МАФИЯ' && <ThumbDownIcon size='30%' fill={popupIcon} />) ||
            (role === 'ДОН' && <DonRingIcon size='30%' fill={popupIcon} />) ||
            (role === 'МИРНЫЙ' && <ThumbUpIcon size='30%' fill={popupIconLight} />) ||
            (role === 'ШЕРИФ' && <SheriffOkIcon size='30%' fill={popupIconLight} />))}

        {role && <RoleName light={this.props.game.lightMode}>{role}</RoleName>}
      </Card>
    );
  };
}

export default connect(({ game }) => ({ game }), {
  lightModeOff,
  lightModeOn,
  clearSelectedNumbers,
  addRole,
  changeGameState,
  replaceSelectedNumbersWith,
})(RandomMode);
