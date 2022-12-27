import MenuItem from "../components/MenuItem"
import { special_menu_list, premium_memu_list } from "../utils/menu"
import React, { useContext, useEffect, useState } from "react"
import { CartContext, CartDispatchContext } from '../App'
import { useNavigate } from "react-router-dom"

const category_list = [
  {
    selected: true,
    name: "스페셜",
    menuList: special_menu_list
  },
  {
    selected: false,
    name: "프리미엄",
    menuList: premium_memu_list
  },
  {
    selected: false,
    name: "와퍼&버거",
    menuList: special_menu_list
  },
  {
    selected: false,
    name: "올데이킹",
    menuList: special_menu_list
  },
  {
    selected: false,
    name: "치킨&치킨버거",
    menuList: special_menu_list
  },
  {
    selected: false,
    name: "사이드",
    menuList: special_menu_list
  },
  {
    selected: false,
    name: "음료&디저트",
    menuList: special_menu_list
  },
  {
    selected: false,
    name: "",
    menuList: []
  }
]

const Home = () => {
  const [menuList, setMenuList] = useState(category_list[0].menuList)
  const [categoryList, setCategoryList] = useState(category_list)
  const [totalPrice, setTotalPrice] = useState(0)
  const cart = useContext(CartContext)
  const { remove } = useContext(CartDispatchContext)

  const navigate = useNavigate()

  useEffect(() => {
    let total = 0
    cart.forEach(element => {
      total += element.price
    });
    setTotalPrice(total)
  }, [cart])

  return (
    <div className="Home">
      <header className='header'>
        {
          category_list.map((ele, idx) => {
            return <div 
              className={['category', ele.selected? 'seleted-category' : ''].join(" ")}
              onClick={() => {
                setMenuList(ele.menuList)
                console.log(categoryList)
                const temp = categoryList.map((it) => {
                  return ele.name === it.name? {...it, selected: true}: {...it, selected: false}
                })
                console.log(temp)
                setCategoryList(temp)
                console.log(categoryList)
              }}
              key={ idx }
            ><span>{ele.name}</span></div>
          })
        }
      </header>
      <div className="menu-container">
        {
          menuList.map((ele, idx) => {
            return (
              <MenuItem key={idx} menu={ele.menu} price={ele.price} path={ele.path}/>
            )
          })
        }
      </div>
      <div className="cart">
        <div className="cart-info">
          <div className="cart-cnt">
            <span className="cart-cnt-word">카트</span>
            <span className="cart-cnt-number">{cart.length}</span>
          </div>
          <div className="cart-total-price">
            <span className="cart-total-price-word">총 주문금액</span>
            <span className="cart-total-price-number">{totalPrice}</span>
          </div>
        </div>
        <div className="cart-item-container">
          {cart.map((ele, idx) => {
            return (
              <div className="cart-item" key={idx}>
                <div className="cart-item-top">
                  <span>{ele.menu}</span>
                  <button onClick={() => {
                    remove(ele.id)
                  }}>X</button>
                </div>
                <span className="price">{ele.price}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="btn-container">
        <button className="cancle-btn">취소</button>
        <button className="order-btn" onClick={()=> {
          navigate("/check")
        }}>주문하기</button>
      </div>
  </div>
  )
}

export default Home