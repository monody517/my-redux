import React,{useEffect, useState} from "react";

export const store = {
    state: {
        user: {name: 'jwp', age: 18}
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

export const connect = (Component) => {
  return (props) => {
    const [,update] = useState({})
    useEffect(()=>{
      store.subscribe(()=>{
            update({})
      })
    },[])
    const dispatch = (action) => {
      store.setState(reducer(store.state.user.name,action))
    }
    return (
        <Component {...props} dispatch={dispatch} state={store.state}/>
    )
  }
}

export const appContext = React.createContext(null)
