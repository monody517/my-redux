import React from 'react'
import {Provider,connect,createStore} from './redux.jsx'
import {connectToUser} from './connects/connectToUser'

const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}
const initState = {
  user: {name: 'jwp', age: 18},
  group: {name: "前端组"}
}


const store = createStore(reducer,initState)

export const App = () => {
  return (
    <Provider store={store}>
      <大儿子/>
      <二儿子/>
      <幺儿子/>
    </Provider>
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
const 幺儿子 = connect(state=>{
  return {group: state.group}
})(({group}) => {
  console.log('33333333333')
  return (<section>幺儿子<div>Group: {group.name}</div></section>)
})

const _UserModifier = ({updateUser, user, children}) => {
  console.log('_UserModifier render')
  return (<div>
    {children}
    <input value={user.name}
      onChange={(e)=>updateUser({name:e.target.value})}/>
  </div>)
}

const _User = ({user}) => {
  console.log('User render')
  return <div>User:{user.name}</div>
}

const UserModifier = connectToUser(_UserModifier)

const User = connectToUser(_User)

