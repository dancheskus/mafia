import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Card = styled.div`
  width: 50%;
  display: flex;
  padding: 2px;
  height: 20%;
  order: ${props => props.order};

  div {
    background: orange;
    border-radius: 10px;
    flex-grow: 1;
  }
`;

const SingleCard = props => (
  <Card order={props.order}>
    <div>{props.number}</div>
  </Card>
);

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCard);
