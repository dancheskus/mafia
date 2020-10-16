import React, { Component } from 'react';
import { connect } from 'react-redux';
import { countBy } from 'lodash';

import { addRole } from 'redux/actions/playersActions';
import {
  changeGameState,
  numbersPanelClickable,
  addToSelectedNumbers,
  clearSelectedNumbers,
} from 'redux/actions/gameActions';
import colors from 'style/colors';
import { ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import { PopUpButton } from 'components/PopUp/styled-components';

import { Notification, RoleCard, RoleSelection, RoleSelectionWrapper } from './style';

class ManualMode extends Component {
  componentDidMount = () => {
    this.props.addToSelectedNumbers(0);
    this.props.numbersPanelClickable();
  };

  componentDidUpdate = prevState => {
    // Возвращаемся на пред. страницу при "Новой игре"
    prevState.game.selectedNumbers.length > 0 && this.props.game.selectedNumbers.length === 0 && this.props.resetMode();
  };

  changeSelection = (role, disabled) => {
    if (disabled) return;
    this.props.addRole({ playerNumber: this.props.game.selectedNumbers[0], role });
  };

  startGameClicked = () => {
    this.props.clearSelectedNumbers();

    this.props.changeGameState({ phase: 'ZeroNight' });
  };

  render = () => {
    const currentPlayerRole = this.props.players[this.props.game.selectedNumbers[0]]
      ? this.props.players[this.props.game.selectedNumbers[0]].role
      : null;

    const { МАФИЯ, ШЕРИФ, ДОН } = countBy(this.props.players.map(player => player.role));
    const isButtonDisabled = МАФИЯ !== 2 || ШЕРИФ !== 1 || ДОН !== 1;
    const isDonDisabled = ДОН === 1 && currentPlayerRole !== 'ДОН';
    const isMafiaDisabled = МАФИЯ === 2 && currentPlayerRole !== 'МАФИЯ';
    const isSherifDisabled = ШЕРИФ === 1 && currentPlayerRole !== 'ШЕРИФ';

    return (
      <>
        <RoleSelectionWrapper className='role-selection-wrapper'>
          <RoleSelection>
            <RoleCard mirnij onClick={() => this.changeSelection('МИРНЫЙ')} selected={currentPlayerRole === 'МИРНЫЙ'}>
              <ThumbUpIcon size='60%' fill={colors.RoleDealing.popupIconLight} />
            </RoleCard>
            <RoleCard
              disabled={isDonDisabled}
              don
              onClick={() => this.changeSelection('ДОН', isDonDisabled)}
              selected={currentPlayerRole === 'ДОН'}
            >
              <DonRingIcon size='60%' fill={colors.RoleDealing.popupIcon} />
            </RoleCard>
            <RoleCard
              disabled={isMafiaDisabled}
              mafia
              onClick={() => this.changeSelection('МАФИЯ', isMafiaDisabled)}
              selected={currentPlayerRole === 'МАФИЯ'}
            >
              <ThumbDownIcon size='60%' fill={colors.RoleDealing.popupIcon} />
            </RoleCard>
            <RoleCard
              disabled={isSherifDisabled}
              sherif
              onClick={() => this.changeSelection('ШЕРИФ', isSherifDisabled)}
              selected={currentPlayerRole === 'ШЕРИФ'}
            >
              <SheriffOkIcon
                size='60%'
                fill={isSherifDisabled ? colors.RoleDealing.popupIcon : colors.RoleDealing.popupIconLight}
              />
            </RoleCard>
          </RoleSelection>
        </RoleSelectionWrapper>

        <Notification disabled={isButtonDisabled}>Выберите все функциональные роли (2 Мафии, Дон и Шериф)</Notification>

        <div className='flex-grow-1 d-flex align-items-center'>
          <PopUpButton onClick={this.startGameClicked} color='RoleDealing' disabled={isButtonDisabled}>
            Играть
          </PopUpButton>
        </div>
      </>
    );
  };
}

export default connect(({ game, players }) => ({ game, players }), {
  addRole,
  changeGameState,
  numbersPanelClickable,
  addToSelectedNumbers,
  clearSelectedNumbers,
})(ManualMode);