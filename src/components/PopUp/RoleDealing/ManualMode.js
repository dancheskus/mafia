import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _ from 'lodash';

import { addRole } from './../../../redux/actions/playersActions';
import {
  changeGameState,
  numbersPanelClickable,
  addToSelectedNumbers,
  clearSelectedNumbers,
} from './../../../redux/actions/gameActions';
import PopUpButton from '../style/PopUpButton';
import colors from '../../../colors';
import { ThumbDownIcon, DonRingIcon, ThumbUpIcon, SherifOkIcon } from './../../../img/svgIcons';

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

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    transition: border 0.1s;
  }
`;

const Mirnij = styled.div`
  background: ${colors.RoleDealing.popupBackgroundLight};
  width: 50%;
  height: 50%;
  border: ${props => (props.selected ? '2px solid white' : null)} !important;
  border-radius: 10px 0 0 0;
`;
const Don = styled.div`
  background: ${colors.RoleDealing.popupButton};
  width: 50%;
  height: 50%;
  border: ${props => (props.selected ? '2px solid white' : null)} !important;
  border-radius: 0 10px 0 0;
`;
const Mafia = styled.div`
  background: ${colors.RoleDealing.popupButton};
  width: 50%;
  height: 50%;
  border: ${props => (props.selected ? '2px solid white' : null)} !important;
  border-radius: 0 0 0 10px;
`;
const Sherif = styled.div`
  background: ${colors.RoleDealing.popupBackgroundLight};
  width: 50%;
  height: 50%;
  border: ${props => (props.selected ? '2px solid white' : null)} !important;
  border-radius: 0 0 10px 0;
`;

class ManualMode extends Component {
  componentDidMount = () => {
    this.props.addToSelectedNumbers(1);
    this.props.numbersPanelClickable();
  };

  changeSelection = role => {
    this.props.addRole({ playerNumber: this.props.game.selectedNumbers[0], role });
  };

  startGameClicked = () => {
    this.props.clearSelectedNumbers();
    this.props.changeGameState({ phase: 'ZeroNight' });
  };

  render = () => {
    const currentPlayerRole = this.props.players[this.props.game.selectedNumbers[0] - 1]
      ? this.props.players[this.props.game.selectedNumbers[0] - 1].role
      : null;

    const { МАФИЯ, ШЕРИФ, ДОН } = _.countBy(this.props.players.map(player => player.role));

    return (
      <>
        <RoleSelectionWrapper>
          <RoleSelection>
            <Mirnij onClick={() => this.changeSelection('МИРНЫЙ')} selected={currentPlayerRole === 'МИРНЫЙ'}>
              <ThumbUpIcon size={'60%'} fill={colors.RoleDealing.popupIconLight} />
            </Mirnij>
            <Don onClick={() => this.changeSelection('ДОН')} selected={currentPlayerRole === 'ДОН'}>
              <DonRingIcon size={'60%'} fill={colors.RoleDealing.popupIcon} />
            </Don>
            <Mafia onClick={() => this.changeSelection('МАФИЯ')} selected={currentPlayerRole === 'МАФИЯ'}>
              <ThumbDownIcon size={'60%'} fill={colors.RoleDealing.popupIcon} />
            </Mafia>
            <Sherif onClick={() => this.changeSelection('ШЕРИФ')} selected={currentPlayerRole === 'ШЕРИФ'}>
              <SherifOkIcon size={'60%'} fill={colors.RoleDealing.popupIconLight} />
            </Sherif>
          </RoleSelection>
        </RoleSelectionWrapper>
        <div className="flex-grow-1 d-flex align-items-center">
          <PopUpButton
            onClick={this.startGameClicked}
            color="RoleDealing"
            disabled={МАФИЯ !== 2 || ШЕРИФ !== 1 || ДОН !== 1}
          >
            Играть
          </PopUpButton>
        </div>
      </>
    );
  };
}

const mapStateToProps = state => ({
  game: state.game,
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  addRole: payload => dispatch(addRole(payload)),
  changeGameState: payload => dispatch(changeGameState(payload)),
  numbersPanelClickable: () => dispatch(numbersPanelClickable()),
  addToSelectedNumbers: playerNumber => dispatch(addToSelectedNumbers(playerNumber)),
  clearSelectedNumbers: () => dispatch(clearSelectedNumbers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManualMode);
