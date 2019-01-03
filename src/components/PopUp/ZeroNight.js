import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import PopUpButton from './styled-components/PopUpButton';
import Timer from '../Timer';
import { changeGameState } from 'redux/actions/gameActions';
import PopUpLabel from './styled-components/PopUpLabel';
import { SheriffStarIcon, TargetIcon } from 'icons/svgIcons';

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    color: white;
    font-size: 2rem;
    position: absolute;
  }

  .label {
    color: white;
    position: absolute;
    bottom: -30%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 170%;
  }
`;

const TwoIcons = styled.div`
  /* border: 1px solid white; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

class ZeroNight extends Component {
  state = { dogovorka: true };

  startGame = () => this.props.changeGameState({ phase: 'Day', dayNumber: 1 });

  render = () => (
    <>
      {this.state.dogovorka ? (
        <>
          <PopUpLabel color="ZeroNight" className="h1">
            Договорка
          </PopUpLabel>
          <Timer />
          <PopUpButton onClick={() => this.setState({ dogovorka: false })} color="ZeroNight">
            Далее
          </PopUpButton>
        </>
      ) : (
        <>
          {/* <PopUpLabel color="ZeroNight" className="h2">
            Знакомство
          </PopUpLabel> */}
          <TwoIcons>
            <Icon>
              <SheriffStarIcon size="86%" />
              <span>{this.props.players.findIndex(player => player.role === 'ШЕРИФ') + 1}</span>
              <div className="label">ШЕРИФ</div>
            </Icon>
            <Icon>
              <TargetIcon />
              <span>{this.props.players.findIndex(player => player.role === 'ДОН') + 1}</span>
              <div className="label">ДОН</div>
            </Icon>
          </TwoIcons>
          <PopUpButton onClick={this.startGame} color="ZeroNight">
            День
          </PopUpButton>
        </>
      )}
    </>
  );
}

export default connect(
  ({ game, players }) => ({ game, players }),
  { changeGameState }
)(ZeroNight);
