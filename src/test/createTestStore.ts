import repeat from 'helpers/repeat';
import { killPlayer } from 'redux/actions/playersActions';
import * as storeBuilder from 'redux/reduxStore';

const createTestStore = () => {
  const store = storeBuilder.createStoreInstance();
  const { dispatch } = store;

  Object.assign(storeBuilder, { store });

  const dispatchSpy = jest.spyOn(store, 'dispatch');

  const testStore = {
    dispatch,
    dispatchSpy,

    get state() {
      return store.getState();
    },

    killAllPlayers: () => {
      repeat(i => dispatch(killPlayer(i)), 10);

      return testStore;
    },
  };

  return testStore;
};

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
