import { PiniaPluginContext } from 'pinia';

type Store = PiniaPluginContext['store'];
type PartialState = Partial<Store['$state']>;

export interface StorageStrategy {
  key?: string;
  storage?: Storage;
  paths?: string[];
}

export interface StorageOptions {
  enabled: true;
  strategies?: StorageStrategy[];
}

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    storage?: StorageOptions;
  }
}

export const updateStorage = (strategy: StorageStrategy, store: Store) => {
  const storage = strategy.storage || sessionStorage;
  const storeKey = strategy.key || store.$id;

  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key];
      return finalObj;
    }, {} as PartialState);

    storage.setItem(storeKey, JSON.stringify(partialState));
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state));
  }
};

export const StoragePlugin = ({ options, store }: PiniaPluginContext) => {
  if (options.storage?.enabled) {
    const defaultStrat: StorageStrategy[] = [
      {
        key: store.$id,
        storage: sessionStorage,
      },
    ];

    const strategies = options.storage?.strategies?.length
      ? options.storage?.strategies
      : defaultStrat;

    strategies.forEach(strategy => {
      const storage = strategy.storage || sessionStorage;
      const storeKey = strategy.key || store.$id;
      const storageResult = storage.getItem(storeKey);

      if (storageResult) {
        store.$patch(JSON.parse(storageResult));
        updateStorage(strategy, store);
      }
    });

    store.$subscribe(() => {
      strategies.forEach(strategy => {
        updateStorage(strategy, store);
      });
    });
  }
};
