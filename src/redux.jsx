import React,{useEffect, useState} from "react";

export const store =  {
    state: {
        user: {name: 'jwp', age: 18},
        group: {name: "前端组"}
    },
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

const reducer = (state, {type, payload}) => {
  if(type === 'updateUser'){
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  }else{
    return state
  }
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
export const connect = (selector) => (Component) => {
  return (props) => {
      const {state,setState} = store
      const [,update] = useState({})
      const data = selector ? selector(state): {state}
      useEffect(()=>{
          store.subscribe(()=>{
            const newData = selector ? selector(store.state): {state: store.state}
            if(changed(data,newData)){
                update({})
            }
          })
      },[selector])
      const dispatch = (action) => {
          setState(reducer(state,action))
      }
      console.log('data',data);
      return (
          <Component {...props} {...data} dispatch={dispatch}/>
      )
  }
}

export const appContext = React.createContext(null)
