import { castArray } from 'lodash';

import ROLE from 'common/playerEnums';
import { addRole, killPlayer } from 'redux/actions/playersActions';
import * as storeBuilder from 'redux/reduxStore';
import AbstractTestStore from 'test/AbstractTestStore';
import repeat from 'helpers/repeat';

type TChangeRoles = { playerNumber?: number; role: ROLE };

class TestStore extends AbstractTestStore<storeBuilder.Store> {
  constructor() {
    super(storeBuilder, storeBuilder.createStoreInstance);

    this.dispatchSpy = jest.spyOn(this.store, 'dispatch');
  }

  killPlayer = (playerNumber: number) =>
    this.update(dispatch => {
      dispatch(killPlayer(playerNumber));
    });

  changeRoles = (roles: TChangeRoles[] | TChangeRoles) =>
    this.update(dispatch => {
      castArray(roles).forEach(({ playerNumber, role }, i) => {
        dispatch(addRole({ playerNumber: playerNumber ?? i, role }));
      });
    });

  defaultTestRoles = () =>
    this.update(() => {
      this.changeRoles([{ role: ROLE.MAFIA }, { role: ROLE.MAFIA }, { role: ROLE.DON }, { role: ROLE.SHERIF }]);
    });

  setEqualPlayersInTeam = () =>
    this.update(dispatch => {
      this.changeRoles([{ role: ROLE.MAFIA }, { role: ROLE.MAFIA }, { role: ROLE.DON }]);
      repeat(i => dispatch(killPlayer(i + 6)), 4);
    });
}

export default TestStore;
