import { Store } from 'redux';

abstract class AbstractTestStore<T extends Store<ReturnType<T['getState']>>> {
  protected store: T;

  dispatch: T['dispatch'];

  dispatchSpy: jest.SpyInstance = jest.fn();

  constructor(moduleExportingStore: { store: T }, createStoreInstance: () => T) {
    this.store = createStoreInstance();
    this.dispatch = this.store.dispatch;

    Object.assign(moduleExportingStore, { store: this.store });
  }

  get state() {
    return this.store.getState();
  }

  protected update(updateFunc: (dispatch: T['dispatch'], state: ReturnType<T['getState']>) => void) {
    updateFunc(this.dispatch, this.state);
    return this;
  }
}

export default AbstractTestStore;
