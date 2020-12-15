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
      dispatch(killPlayer(0));
      dispatch(killPlayer(1));
      dispatch(killPlayer(2));
      dispatch(killPlayer(3));
      dispatch(killPlayer(4));
      dispatch(killPlayer(5));
      dispatch(killPlayer(6));
      dispatch(killPlayer(7));
      dispatch(killPlayer(8));
      dispatch(killPlayer(9));

      return testStore;
    },
  };

  return testStore;
};

export type TestStore = ReturnType<typeof createTestStore>;

export default createTestStore;
