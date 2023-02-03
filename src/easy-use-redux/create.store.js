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
const __importDefault = (this && this.__importDefault) || (mod => (mod && mod.__esModule) ? mod : { "default": mod });
Object.defineProperty(exports, "__esModule", { value: true });
export const createRootStore = exports.getStore = void 0;

/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 20-7-15
 * Time: 下午6:47
 * Desc:
 */
import redux_1 from "redux";

const redux_thunk_1 = __importDefault(require("redux-thunk"));
import redux_logger_1 from "redux-logger";
const composeEnhancers =
// @ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? // @ts-ignore
        (window && window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : redux_1.compose;
const middleWares = [redux_thunk_1.default];
let singleStore = undefined;
function getStore() {
    if (!singleStore) {
        throw 'please first create store';
    }
    return singleStore;
}
export {getStore};
function createRootStore(stores, {isDev}) {
    if (singleStore) {
        console.warn('store is exist');
        return singleStore;
    }
    if (isDev) {
        middleWares.push(redux_logger_1.createLogger());
    }
    const enhancer = composeEnhancers(redux_1.applyMiddleware.apply(void 0, middleWares));
    const rootReducer = stores.map(({namespace}) => namespace).reduce((reducer, key) => {
        let _a;
        return __assign(__assign({}, reducer), (_a = {}, _a[key] = stores.find(({namespace}) => namespace === key).__reducer, _a));
    }, {});
    singleStore = redux_1.createStore(redux_1.combineReducers(rootReducer), enhancer);
    return singleStore;
}

export {createRootStore};
//# sourceMappingURL=create-store.js.map
