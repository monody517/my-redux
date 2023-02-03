const __createBinding = (this && this.__createBinding) || (Object.create ? ((o, m, k, k2) => {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get() { return m[k]; } });
}) : ((o, m, k, k2) => {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
const __exportStar = (this && this.__exportStar) || ((m, exports) => {
    for (const p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
});
Object.defineProperty(exports, "__esModule", { value: true });
export const BaseStore = exports.createStore = exports.createRootStore = void 0;

/**
 * Created by JetBrains WebStorm.
 * Author: yoon
 * Date: 20-7-15
 * Time: 下午6:43
 * Desc:
 */
import create_store_1 from "./create-store";

Object.defineProperty(exports, "createRootStore", { enumerable: true, get() { return create_store_1.createRootStore; } });
import base_store_1 from "./base.store";
Object.defineProperty(exports, "createStore", { enumerable: true, get() { return base_store_1.createStore; } });
Object.defineProperty(exports, "BaseStore", { enumerable: true, get() { return base_store_1.BaseStore; } });
__exportStar(require("react-redux"), exports);
//# sourceMappingURL=index.js.map
