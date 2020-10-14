import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { countBy } from 'lodash';

import { addRole } from 'redux/actions/playersActions';
import {
  changeGameState,
  numbersPanelClickable,
  addToSelectedNumbers,
  clearSelectedNumbers,
} from 'redux/actions/gameActions';
import colors from 'colors.js';
import { ThumbDownIcon, DonRingIcon, ThumbUpIcon, SheriffOkIcon } from 'icons/svgIcons';
import { PopUpButton } from '../styled-components';

const RoleSelectionWrapper = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoleSelection = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    transition: border 0.1s;
    width: 50%;
    height: 50%;
  }

  @media (max-width: 991px) {
    width: 60%;
  }
  @media (max-width: 767px) {
    width: 80%;
  }
`;

const RoleCard = styled.div`
  border: ${props => (props.selected ? '2px solid white' : null)} !important;

  ${props => {
    if (props.mafia)
      return `
      border-radius: 0 0 0 10px;
      background: ${colors.RoleDealing.popupButton};
    `;
    if (props.don)
      return `
      border-radius: 0 10px 0 0;
      background: ${colors.RoleDealing.popupButton};
    `;
    if (props.sherif)
      return `
      background: ${colors.RoleDealing.popupBackgroundLight};
      border-radius: 0 0 10px 0;
    `;
    if (props.mirnij)
      return `
      background: ${colors.RoleDealing.popupBackgroundLight};
      border-radius: 10px 0 0 0;
    `;
  }}

  ${props => props.disabled && 'background: grey; filter: brightness(25%) grayscale(100%)'}
`;

const Notification = styled.div`
  text-align: center;
  line-height: 1;
  margin: 20px;

  ${props => (!props.disabled ? `color: transparent` : `animation: blinkingText 6s infinite`)};

  @keyframes blinkingText {
    0% {
      color: transparent;
    }

    50% {
      color: white;
    }

    100% {
      color: transparent;
    }
  }
`;

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
