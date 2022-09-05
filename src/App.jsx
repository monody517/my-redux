import React, {useState, useEffect} from 'react'

const appContext = React.createContext(null)

const store = {
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

export const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => {
  console.log('1111111111')
  return (<section>大儿子<User/></section>)
}
const 二儿子 = () => {
  console.log('2222222222')
  return (<section>二儿子<UserModifier>neirong</UserModifier></section>)
}
const 幺儿子 = () => {
  console.log('33333333333')
  return (<section>幺儿子</section>)
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

const connect = (Component) => {
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

const _UserModifier = ({dispatch, state, children}) => {
  console.log('_UserModifier render')
  const onChange = (e) => {
    dispatch({type: 'updateUser',payload: {name:e.target.value}})
  }
  return (<div>
    {children}
    <input value={state.user.name}
      onChange={onChange}/>
  </div>)
}

const _User = ({state,dispatch}) => {
  console.log('User render')
  return <div>User:{state.user.name}</div>
}

const UserModifier = connect(_UserModifier)
const User = connect(_User)

