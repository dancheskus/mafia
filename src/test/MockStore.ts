import { killPlayer } from 'redux/actions/playersActions';
import * as StoreBuilder from 'redux/reduxStore';

const mockStore = () => {
  const store = StoreBuilder.createStoreInstance();
  const { dispatch } = store;

  Object.assign(StoreBuilder, { store });

  const dispatchSpy = jest.spyOn(store, 'dispatch');

  const testStore = {
    dispatch,
    dispatchSpy,

    get state() {
      return store.getState();
    },

    killAllPlayers: () => {
      dispatch(killPlayer(1));
      dispatch(killPlayer(2));
      dispatch(killPlayer(3));
      dispatch(killPlayer(4));
      dispatch(killPlayer(5));
      dispatch(killPlayer(6));
      dispatch(killPlayer(7));
      dispatch(killPlayer(8));
      dispatch(killPlayer(9));
      dispatch(killPlayer(0));

      return testStore;
    },
  };

  return testStore;
};

export type MockStore = ReturnType<typeof mockStore>;

export default mockStore;
