import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';

import colors from '../colors';

const Panel = styled.div`
  background: ${colors.seatAllocator.numbersPanel};
  padding: 10px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const PanelItem = styled.div`
  height: 30px;
  width: 30px;
  background: ${props => (props.selected ? colors.seatAllocator.numberSelected : colors.seatAllocator.number)};
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  box-shadow: 0px 9px 35px -8px rgba(0, 0, 0, 0.49);
`;

const NumbersPanel = props => (
  <Panel className="d-flex justify-content-around">
    {props.game.selectedNumbers.map(selNum => (
      <PanelItem key={selNum} selected>
        {selNum}
      </PanelItem>
    ))}

    {_.range(1, 11)
      .filter(e => !props.game.selectedNumbers.includes(e))
      .map(notSelNum => (
        <PanelItem key={notSelNum}>{notSelNum}</PanelItem>
      ))}
  </Panel>
);

const mapStateToProps = state => ({ game: state.game });
export default connect(mapStateToProps)(NumbersPanel);
