import { Store } from 'redux';
import { StoreItem } from "./base.store";
declare type Options = {
  isDev: boolean;
};
export declare function getStore(): Store;
export declare function createRootStore(stores: StoreItem<any>[], options: Options): Store;
export {};
