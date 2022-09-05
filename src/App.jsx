import React from 'react'
import {appContext,connect,store} from './redux.jsx'

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

const _User = ({user}) => {
  console.log('User render')
  return <div>User:{user.name}</div>
}

const UserModifier = connect()(_UserModifier)
const User = connect(state => {
  return {user: state.user}
})(_User)

