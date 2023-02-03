let __assign = (this && this.__assign) || function(...args) {
    __assign = Object.assign || function(t) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, args);
};
const __spreadArrays = (this && this.__spreadArrays) || ((...args) => {
    for (var s = 0, i = 0, il = args.length; i < il; i++) s += args[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (let a = args[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
});
Object.defineProperty(exports, "__esModule", { value: true });
export const createStore = exports.BaseStore = void 0;
import create_store_1 from "./create-store";
const ACTION_RESET = '__reset';
const ACTION_UPDATE = 'setState';
const BaseStore /** @class */ = (() => {
    class BaseStore {
        __reset() { }

        // @ts-ignore
        setState(state) { }

        // @ts-ignore
        getState() { }
    }

    return BaseStore;
})();
export {BaseStore};
/**
 * 判断Config中的方法是否为action方法
 * @param key
 * @param value
 */
function isValidActionFun(key, value) {
    if ([ACTION_RESET, ACTION_UPDATE].includes(key)) {
        return false;
    }
    return typeof key === 'string' && typeof value === 'function';
}
/**
 * 生成actionName
 * @param namespace
 * @param methodName
 */
function getActionType(namespace, methodName) {
    return `__action_${namespace}_${methodName}`;
}
/**
 * 根据config中的方法生成action
 * @param store
 */
function getAction(store) {
    let _a;
    const innerAction = (_a = {},
        _a[ACTION_RESET] = () => {
            create_store_1.getStore().dispatch({ type: getActionType(store.namespace, ACTION_UPDATE), payload: store.initState });
        },
        _a[ACTION_UPDATE] = state => {
            create_store_1.getStore().dispatch({ type: getActionType(store.namespace, ACTION_UPDATE), payload: state });
        },
        _a);
    return Object.getOwnPropertyNames(Object.getPrototypeOf(store)).reduce((reducer, key) => {
        let _a;
        if (isValidActionFun(key, store[key])) {
            return __assign(__assign({}, reducer), (_a = {}, _a[key] = function () {
                const _this = this;
                const args = [];
                for (let _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                create_store_1.getStore().dispatch({
                    type: getActionType(store.namespace, key),
                    payload: args,
                });
                return create_store_1.getStore().dispatch((() => {
                    let _a;
                    return (_a = store[key]).call.apply(_a, __spreadArrays([_this], args));
                }));
            }, _a));
        }
        return reducer;
    }, innerAction);
}
/**
 * 根据config中的方法生成reducer
 * @param store
 */
function getReducer({namespace, initState}) {
    let _a;
    const reducerObj = (_a = {},
        _a[getActionType(namespace, ACTION_UPDATE)] = (payload, state) => {
            const unValidKey = Object.keys(payload).find(key => !state.hasOwnProperty(key));
            if (unValidKey) {
                console.error(`unValidKey:[${unValidKey}]`);
                return state;
            }
            return __assign(__assign({}, state), payload);
        },
        _a);
    return (state, {type, payload}) => {
        if (state === void 0) { state = __assign({}, initState); }
        if (reducerObj.hasOwnProperty(type)) {
            return reducerObj[type](payload, state);
        }
        return state;
    };
}
function createStore(store) {
    return __assign(__assign(__assign({}, store), getAction(store)),
        { __reducer: getReducer(store), getState() {
            return create_store_1.getStore().getState()[store.namespace];
        } });
}

export {createStore};
//# sourceMappingURL=base.store.js.map
