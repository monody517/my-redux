import {combineReducers, createStore, Store,applyMiddleware} from "redux";
import {StoreItem} from "./base-store";
import logger from "redux-logger";
import thunk from "redux-thunk"

let singleStore: Store

// @ts-ignore
function createRootStore(stores: StoreItem[]){

    let rootReducer = stores.map(store=>{
       return store.namespace
    }).reduce((reducer,key)=>{
        let a
        return Object.assign(Object.assign({},reducer),
          a = {},
          a[key]= stores.find((store)=>{return store.namespace === key}).__reducer)
    })


    return singleStore = createStore(combineReducers(rootReducer),applyMiddleware(logger,thunk))
}

export {createRootStore,singleStore}
