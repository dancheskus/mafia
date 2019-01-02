import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';

import { killPlayer } from '../../redux/actions/playersActions';
import { changeGameState, addToSelectedNumbers } from './../../redux/actions/gameActions';
import VotingBlock from '../common/styled-components/VotingBlock';
import VotingSingleElement from '../common/styled-components/VotingSingleElement';
import colors from '../../colors';
import PopUpButton from './style/PopUpButton';
import checkForEnd from '../../helpers/checkForEnd';

const Label = styled.div`
  text-transform: uppercase;
  color: ${colors.Night.popupText};
  text-align: center;
`;

class Night extends Component {
  state = { playerToKill: null, questionsTime: false };

  selectPlayer = num => this.setState({ playerToKill: num === this.state.playerToKill ? null : num });

  componentWillUnmount = () => {
    checkForEnd(this.props.players).status && this.props.changeGameState({ phase: 'EndOfGame' });
  };

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

        <VotingBlock className="col-10 col-md-8 col-lg-6">
          {_.range(0, 10).map(num => (
            <VotingSingleElement
              disabled={!this.props.players[num].isAlive}
              shooting
              selected={this.state.playerToKill === num}
              onClick={() => this.selectPlayer(num)}
              key={num}
            >
              <div className="number">{num + 1}</div>
            </VotingSingleElement>
          ))}
        </VotingBlock>

        <PopUpButton onClick={this.killPlayer} color="Night">
          Далее
        </PopUpButton>
      </>
    );
  };
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { killPlayer, changeGameState, addToSelectedNumbers }
)(Night);
