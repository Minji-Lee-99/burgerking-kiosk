import { CartContext, CartDispatchContext } from "../App"
import React, {useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"


const OrderCheck = () => {
  const cart = useContext(CartContext)
  const {clear} = useContext(CartDispatchContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let total = 0
    cart.forEach(element => {
      total += element.price
    });
    setTotalPrice(total)
  }, [cart])


  return (
    <div className="OrderCheck">
      <div className="header"><span>step1.주문확인</span></div>
      <div className="order-list">
        {
          cart.map((ele)=> {
            return (
              <div className="order-item" key={ele.id}>
                <div className="order-item-info">
                  <span className="name">{ele.menu}</span>
                  <span className="price">{ele.price}원</span>
                </div>
                <img src={ele.path}/>
              </div>
            )
          })
        }
      </div>
      <div className="footer">
        <div className="price-area">
          <span className="word">총 결제금액</span>
          <span className="price">{totalPrice}원</span>
        </div>
        <div className="btn-area">
          <button className="back-btn" onClick={() => {
            navigate(-1)
            clear()
          }}>취소</button>
          <button className="pay-btn" onClick={() => {
            navigate('/complete')
            clear()
          }}>결제하기</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCheck