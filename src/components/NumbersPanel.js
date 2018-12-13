import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';

import colors from '../colors';
import { addToSelectedNumbers, clearSelectedNumbers } from '../redux/actions/gameActions';

const Panel = styled.div`
  background: ${props => colors[props.color].numbersPanel};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const PanelItem = styled.div`
  height: 30px;
  width: 30px;
  background: ${props => (props.selected ? colors[props.color].numberSelected : colors[props.color].number)};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  box-shadow: 0px 9px 35px -8px rgba(0, 0, 0, 0.49);
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
`;

const NumbersPanel = props => (
  <Fragment>
    {props.game.gameState.phase === 'SeatAllocator' && (
      <Panel color={props.game.gameState.phase} className="d-flex justify-content-around">
        {props.game.selectedNumbers.map(selNum => (
          <PanelItem color={props.game.gameState.phase} key={selNum} selected>
            {selNum}
          </PanelItem>
        ))}

        {_.range(1, 11)
          .filter(e => !props.game.selectedNumbers.includes(e))
          .map(notSelNum => (
            <PanelItem color={props.game.gameState.phase} key={notSelNum}>
              {notSelNum}
            </PanelItem>
          ))}
      </Panel>
    )}

    {props.game.gameState.phase === 'RoleDealing' && (
      <Panel color={props.game.gameState.phase} className="d-flex justify-content-around">
        {_.range(1, 11).map(num => (
          <PanelItem
            pointer={props.game.numbersPanelClickable}
            color={props.game.gameState.phase}
            key={num}
            selected={num === props.game.selectedNumbers[0]}
            onClick={() => {
              if (!props.game.numbersPanelClickable) return;
              props.clearSelectedNumbers();
              props.addToSelectedNumbers(num);
            }}
          >
            {num}
          </PanelItem>
        ))}
      </Panel>
    )}
  </Fragment>
);

const mapStateToProps = state => ({ game: state.game });
const mapDispatchToProps = dispatch => ({
  addToSelectedNumbers: playerNumber => dispatch(addToSelectedNumbers(playerNumber)),
  clearSelectedNumbers: () => dispatch(clearSelectedNumbers()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumbersPanel);
