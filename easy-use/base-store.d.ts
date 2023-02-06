import { AnyAction } from 'redux';
export declare abstract class BaseStore<S = any> {
  abstract namespace: string;
  abstract initState: S;
  __reset(): void;
  setState(state: Partial<S>): void;
  getState(): S;
}
export declare type StoreItem<S extends BaseStore> = {
  __reducer: (state: S['initState'], action: AnyAction) => any;
  getState: () => S['initState'];
} & S;
export declare function createStore<S extends BaseStore>(store: S): StoreItem<S>;
