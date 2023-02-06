// @ts-ignore
import {BaseStore,createStore} from '../easy-use/base-store'

class Store extends BaseStore{
  namespace = 'test1';

  initState = {
    num: 1
  };

  add1() {
    this.setState({
      num: 2
    })
    console.log(this.getState().num);
  }
}

console.log(new Store())

const TestStore1 = createStore(new Store())

export default TestStore1;


