import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';

import { killPlayer } from '../../redux/actions/playersActions';
import { changeGameState, addToSelectedNumbers } from './../../redux/actions/gameActions';
import BlockOfHands from './Voting/style/BlockOfHands';
import HandsButton from './Voting/style/HandsButton';
import colors from '../../colors';
import PopUpButton from './style/PopUpButton';

const Label = styled.div`
  text-transform: uppercase;
  color: ${colors.Night.popupText};
  text-align: center;
`;

class Night extends Component {
  state = { playerToKill: null, questionsTime: false };

  selectPlayer = num => this.setState({ playerToKill: num === this.state.playerToKill ? null : num });

  killPlayer = () => {
    this.state.playerToKill && this.props.killPlayer(this.state.playerToKill - 1);
    this.setState({ questionsTime: true });
  };

  render = () => {
    if (this.state.questionsTime)
      return (
        <>
          <Label className="h2">Дон ищет шерифа</Label>

          <Label className="h2">Шериф ищет черных игроков</Label>

          <PopUpButton
            onClick={() => {
              this.state.playerToKill && this.props.addToSelectedNumbers(this.state.playerToKill);
              this.props.changeGameState({ phase: 'Day', dayNumber: this.props.game.gameState.dayNumber + 1 });
            }}
            color="Night"
          >
            День
          </PopUpButton>
        </>
      );

    return (
      <>
        <Label className="h2">В кого стреляет мафия?</Label>

        <BlockOfHands className="col-10 col-md-8 col-lg-6">
          {_.range(1, 11).map(num => (
            <HandsButton
              shooting
              selected={this.state.playerToKill === num}
              onClick={() => this.selectPlayer(num)}
              key={num}
            >
              <div className="number">{num}</div>
            </HandsButton>
          ))}
        </BlockOfHands>

        <PopUpButton onClick={this.killPlayer} color="Night">
          Далее
        </PopUpButton>
      </>
    );
  };
}

export default connect(
  ({ game }) => ({ game }),
  { killPlayer, changeGameState, addToSelectedNumbers }
)(Night);
