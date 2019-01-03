import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearSelectedNumbers, closePopup, openPopup } from '../../redux/actions/gameActions';
import Circle from './Voting/style/Circle';
import PopUpButton from './style/PopUpButton';
import { ResultsLabel } from './Voting/style/Results';
import Timer from '../Timer';
import { CylinderIcon } from './../../icons/svgIcons';
import colors from '../../colors';

class Day extends Component {
  state = { killedPlayer: this.props.game.selectedNumbers[0] };

  componentWillUnmount = () => this.props.openPopup();

  componentDidMount = () => {
    this.props.clearSelectedNumbers();
    this.props.game.gameState.dayNumber === 1 && this.props.closePopup();
  };

  render = () => (
    <>
      {this.state.killedPlayer ? (
        <>
          <ResultsLabel className="h1">Убит</ResultsLabel>
          <Circle>{this.state.killedPlayer}</Circle>
          <Timer />
        </>
      ) : (
        <>
          <ResultsLabel className="h1">Несострел</ResultsLabel>
          <Circle>
            <CylinderIcon fill={colors.Day.popupNightResult} size="80%" />
          </Circle>
        </>
      )}
      <PopUpButton color="Day" onClick={() => this.props.closePopup()}>
        Закрыть
      </PopUpButton>
    </>
  );
}

export default connect(
  ({ game }) => ({ game }),
  { clearSelectedNumbers, closePopup, openPopup }
)(Day);
