import { killPlayer } from 'redux/actions/playersActions';
import * as storeBuilder from 'redux/reduxStore';
import AbstractTestStore from 'test/AbstractTestStore';

class TestStore extends AbstractTestStore<storeBuilder.Store> {
  constructor() {
    super(storeBuilder, storeBuilder.createStoreInstance);

    this.dispatchSpy = jest.spyOn(this.store, 'dispatch');
  }

  killPlayer = (playerNumber: number) =>
    this.update(dispatch => {
      dispatch(killPlayer(playerNumber));
    });
}

export default TestStore;
