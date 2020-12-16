import { castArray } from 'lodash';

import ROLE from 'common/playerEnums';
import { addRole, killPlayer } from 'redux/actions/playersActions';
import * as storeBuilder from 'redux/reduxStore';
import AbstractTestStore from 'test/AbstractTestStore';

type TChangeRoles = { playerNumber?: number; role: ROLE };

class TestStore extends AbstractTestStore<storeBuilder.Store> {
  constructor() {
    super(storeBuilder, storeBuilder.createStoreInstance);

    this.dispatchSpy = jest.spyOn(this.store, 'dispatch');
  }

  killPlayer = (playerNumber: number) => {
    return this.update(dispatch => {
      dispatch(killPlayer(playerNumber));
    });
  };

  changeRoles = (roles: TChangeRoles[] | TChangeRoles) => {
    return this.update(dispatch => {
      castArray(roles).forEach(({ playerNumber, role }, i) => {
        dispatch(addRole({ playerNumber: playerNumber ?? i, role }));
      });
    });
  };

  defaultTestRoles = () => {
    return this.update(() => {
      this.changeRoles([{ role: ROLE.MAFIA }, { role: ROLE.MAFIA }, { role: ROLE.DON }, { role: ROLE.SHERIF }]);
    });
  };
}

export default TestStore;
