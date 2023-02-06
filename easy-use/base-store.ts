// @ts-ignore
import {singleStore,createRootStore} from './create-store'
import {AnyAction, Reducer} from "redux";

const ACTION_RESET = '__reset';
const ACTION_UPDATE = 'setState';

export abstract class BaseStore<S = any> {
    abstract namespace: string;
    abstract initState: S;
    abstract setState(state: Partial<S>): void;
    abstract getState(): S;
}

export declare type StoreItem<S extends BaseStore> = {
    __reducer: (state: S['initState'], action: AnyAction) => any;
} & S;

interface State {
    [key: string]: string
}

export interface Config {
    namespace: string;
    commonState: State;
    initState: State;
}

type Actions<T> = T;

/**
 * 判断Config中的方法是否为action方法
 * @param key
 * @param value
 */
function isValidActionFun(key: string, value: string) {
    if ([ACTION_RESET, ACTION_UPDATE].includes(key)) {
        return false;
    }
    return typeof value === 'function';
}

/**
 * 判断Config中的方法是否为reducer方法
 * @param key
 * @param value
 */
function isReducerFun(key: string, value: any) {
    return !/^_.*/.test(key) && typeof value === 'function';
}

/**
 * 生成actionName
 * @param namespace
 * @param methodName
 */
function getActionType(namespace: string, methodName: string) {
    return "__action_" + namespace + "_" + methodName;
}

/**
 * 根据config中的方法生成action
 * @param config
 */
function getAction<T>(config: Config): Actions<T>{
    const innerAction = {
        __reset: function () {
            singleStore.dispatch({type: getActionType(config.namespace, ACTION_UPDATE), payload: config.initState})
        },
        setState: function (state: any) {
            console.log('state',state);
            singleStore.dispatch({type: getActionType(config.namespace, ACTION_UPDATE), payload: state})
        },
    }
    return Object.getOwnPropertyNames(Object.getPrototypeOf(config)).reduce((reducer, key) => {
        // @ts-ignore
        if (isValidActionFun(key, config[key])) {
            return {
                ...reducer,
                [key]: function () {
                    singleStore.dispatch({
                        type: getActionType(config.namespace, key),
                        payload: Array.prototype.slice.call(arguments)
                    });
                    // @ts-ignore
                    return (config[key].apply(this,Array.prototype.slice.call(arguments)));
                }
            };
        }
        return reducer;
    }, innerAction) as unknown as Actions<T>;
}

/**
 * 根据Config中的方法生成reducer
 * @param config
 */
function getReducer({namespace, initState}) {
    const reducerObj = {}
    // @ts-ignore
    reducerObj[getActionType(namespace,ACTION_UPDATE)] = (payload, state) => {
        return {...state,...payload}
    }
    console.log('reducerObj',reducerObj);

    return (state: any, {type, payload}: any) => {
        if(state === undefined) state = initState
        if(reducerObj.hasOwnProperty(type)){
            // @ts-ignore
            return reducerObj[type](payload,state)
        }
        return state
    }

    // return function (state = {
    //     ...config.commonState,
    //     ...config.initState
    // }, action) {
    //     if (reducerObj.hasOwnProperty(action.type)) {
    //         return reducerObj[action.type](action.payload, state)
    //     }
    //     return state;
    // }
}

const createStore = <S extends BaseStore>(store: S):StoreItem<S> => {
    if (!store.namespace) {
        throw new Error('namespace is unvaild');
    }

    if (!store.initState || typeof store.initState !== 'object') {
        throw new Error('initState is unvaild');
    }

    return {
        ...store,
        ...getAction(store),
        getState: function () {
            console.log('singleStore.getState()',singleStore.getState());
            console.log('store.namespace',store.namespace);
            return singleStore.getState()[store.namespace];
        },
        __reducer:getReducer(store)
    }
}

export {createStore}


