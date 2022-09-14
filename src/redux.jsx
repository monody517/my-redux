import React,{useEffect, useState} from "react";

const store =  {
    state: undefined,
    reducer: undefined,
    setState(newState){
        store.state = newState
        store.listener.map(fn=>fn(store.state))
    },
    listener: [],
    subscribe(fn){
        store.listener.push(fn)
        return () => {
            const index = store.listener.indexOf(fn)
            store.listener.splice((index, 1))
        }
    }
}

export const createStore = (reducer,initState) => {
    store.state = initState
    store.reducer = reducer
    return store
}

const changed = (oldState,newState) => {
    let change = false;
    for(let key in oldState){
        if(oldState[key] !== newState[key]){
            change = true
        }
    }
    return change
}
export const connect = (selector,dispatchSelector) => (Component) => {
  return (props) => {
      // 拿读写方法
      const dispatch = (action) => {
          setState(store.reducer(state,action))
      }
      const {state,setState} = store

      // 对读写方法封装，使组件能更加精确地读写
      const data = selector ? selector(state): {state}
      const dispatchers = dispatchSelector ? dispatchSelector(dispatch): {dispatch}

      // 在store变化的时候订阅，更新页面
      const [,update] = useState({})
      useEffect(()=>{
          store.subscribe(()=>{
            const newData = selector ? selector(store.state): {state: store.state}
            if(changed(data,newData)){
                update({})
            }
          })
      },[selector])

      return (
          <Component {...props} {...data} {...dispatchers}/>
      )
  }
}

const appContext = React.createContext(null)
export const Provider = ({store,children}) => {
    return (
        <appContext.Provider value={store}>
            {children}
        </appContext.Provider>
    )
}
