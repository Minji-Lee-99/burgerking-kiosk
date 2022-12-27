import { useNavigate } from "react-router-dom"

const OrderComplete = () => {
  const navigate = useNavigate()

  return (
    <div className="OrderComplete">
      <div className="header"><span>step2.결제완료</span></div>
      <div className="main"
        onClick={()=> navigate("/")}
      >
        <span className="para1">주문이 완료되었습니다!</span>
        <div className="para2">
          <span className="small">주문번호</span>
          <span className="large">803</span>
        </div>
        <div className="para3">
          <span>신용카드를 뽑은 후</span>
          <span>출력된 영수증을 받아가세요!</span>
        </div>
        <img src={process.env.PUBLIC_URL + '/assets/bill.png'}/>
      </div>
    </div>
  )
}

export default OrderComplete