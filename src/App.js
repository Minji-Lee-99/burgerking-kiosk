import './App.css';
import Home from './pages/Home'
import OrderCheck from './pages/OrderCheck'
import OrderComplete from './pages/OrderComplete';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useReducer, useRef } from 'react';

export const CartContext = React.createContext()
export const CartDispatchContext = React.createContext()

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'APPEND':
      newState = [...state, action.data]
      break
    case 'REMOVE':
      console.log(action.targetId)
      newState = state.filter((it) => {
        return it.id !== action.targetId
      })
      break
    case 'CLEAR':
      newState = []
      break
    default:
      return state
  }
  return newState
}

function App() {
  const [cart, dispatch] = useReducer(reducer, [])
  const dataId = useRef(0)

  // 추가하기
  const append = (menu, price, path) => {
    dispatch({type: 'APPEND', data: {
      id: dataId.current,
      menu,
      price,
      path,
    }})
    dataId.current += 1
  }

  // 삭제하기
  const remove = (targetId) => {
    dispatch({type: 'REMOVE', targetId})
  }

  // 초기화하기
  const clear = () => {
    dispatch({type: 'CLEAR'})
    dataId.current = 0
  }

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={{append, remove, clear}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/check' element={<OrderCheck/>}/>
              <Route path='/complete' element={<OrderComplete/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
