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

export const connect = (selector) => (Component) => {
  return (props) => {
      const {state,setState} = store
    const [,update] = useState({})
      const data = selector ? selector(state): {state}
    useEffect(()=>{
      store.subscribe(()=>{
            update({})
      })
    },[])
    const dispatch = (action) => {
      setState(reducer(store.state.user.name,action))
    }
    return (
        <Component {...props} {...data} dispatch={dispatch}/>
    )
  }
}

export const appContext = React.createContext(null)
