import React, {useState, useContext} from 'react'

const appContext = React.createContext(null)
export const App = () => {
  const [appState, setAppState] = useState({
    user: {name: 'jwp', age: 18}
  })
  const contextValue = {appState, setAppState}
  return (
    <appContext.Provider value={contextValue}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </appContext.Provider>
  )
}
const 大儿子 = () => <section>大儿子<User/></section>
const 二儿子 = () => <section>二儿子<UserModifier>neirong</UserModifier></section>
const 幺儿子 = () => <section>幺儿子</section>

const User = () => {
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>
}

const reducer = (state, {type, payload}) => {
  if(type === 'updateUser'){
    return {
      ...state,
      user: {
        ...payload
      }
    }
  }else{
    return state
  }
}

const createWrapper = (Component) => {
  return (props) => {
    const {appState, setAppState} = useContext(appContext)
    const dispatch = (action) => {
      setAppState(reducer(appState.user.name,action))
    }
    return (
        <Component {...props} dispatch={dispatch} state={appState}/>
    )
  }
}

const _UserModifier = ({dispatch, state, children}) => {
  const onChange = (e) => {
    dispatch({type: 'updateUser',payload: {name:e.target.value}})
  }
  return (<div>
    {children}
    <input value={state.user.name}
      onChange={onChange}/>
  </div>)
}

const UserModifier = createWrapper(_UserModifier)

