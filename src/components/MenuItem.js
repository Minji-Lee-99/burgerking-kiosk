import { CartDispatchContext } from '../App'
import React, {useContext} from 'react'


const MenuItem = ({menu, price, path}) => {
  const { append } = useContext(CartDispatchContext)
  
  return (
    <div className="MenuItem"
      onClick={() => {
        append(menu, price, path)
      }}
    >
      <img src={path} alt={menu}/>
      <div>
        <span className="menu">{menu}</span>
        <span className="price">{price}원</span>
      </div>
    </div>
  )
}

export default MenuItem