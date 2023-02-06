import TestStore from "./test";
import {createRootStore} from '../easy-use/create-store'
import TestStore1 from "./test1";

const stores = [
  TestStore,
  TestStore1
]

export default function configStore(){
  const store = createRootStore(stores)
  return store
}
