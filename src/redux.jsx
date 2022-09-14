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
      const dispatch = (action) => {
          setState(store.reducer(state,action))
      }
      const {state,setState} = store
      const [,update] = useState({})
      const data = selector ? selector(state): {state}
      const dispatchers = dispatchSelector ? dispatchSelector(dispatch): {dispatch}
      useEffect(()=>{
          store.subscribe(()=>{
            const newData = selector ? selector(store.state): {state: store.state}
            if(changed(data,newData)){
                update({})
            }
          })
      },[selector])
      console.log('data',data);
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
