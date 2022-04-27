import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, ListGroup, Col, Button, Row } from 'react-bootstrap';
import styledComponents from "styled-components";
// import OrderPage from "../OrderPage/OrderPage";
// import { useNavigate } from "react-router-dom";
import "./style.css";

const ImgSize = styled.img`
  height: 15rem;
  object-fit: cover;
`;

const ReceiveOrderList = ({ orderListItem, orderItems, acceptOrder, rejectOrder, completeOrder }) => {

    const orderId = orderListItem.orderId
    const orderDate = orderListItem.orderTime
    const orderState = orderListItem.orderStatus
    const userName = orderListItem.userName
    // 주문 상태 : ORDER, ACCEPTED, REJECTED, COMPLETED
    const flag = ["ORDER", "ACCEPTED", "REJECTED", "COMPLETED"];
    const [acceptType, setAcceptType] = useState(false);
    const [rejectType, setRejectType] = useState(false);
    const [completeType, setCompleteType] = useState(false);
    let newArray = [];


    useEffect( () => {
        if( orderListItem.orderStatus === "ORDER"){
            setAcceptType(false);
            setRejectType(false);
            setCompleteType(true);
        } else if( orderListItem.orderStatus === "ACCEPTED"){
            setAcceptType(true);
            setRejectType(true);
            setCompleteType(false);
        } else { // 주문 거절 상태, 조리 완료 상태는 모든 버튼 비활성화
            setAcceptType(true);
            setRejectType(true);
            setCompleteType(true);
        }
    }, [])

    // itemName
    for( let i=0; i<orderListItem.orderItems.length; i++ ) {
        newArray = newArray.concat(orderListItem.orderItems[i].itemName);
        
        console.log(newArray);
    }
    console.log(newArray.join())

    

  return (
    // <ListGroup>
    // <ListGroup.Item className="d-inline-flex align-items-center">
    <ListGroup.Item className="d-inline-flex align-items-center">
        {/* <Col>{orderListItem.orderId}</Col> */}
        <Col>{orderId}</Col>
        <Col>{orderDate}</Col>
        <Col>{orderState}</Col>
        <Col>{userName}</Col>
        <Col id="menu_name">{newArray.join()}</Col>
        <Col>
            {acceptType 
                ? <Button disabled={true} onClick={acceptOrder}>주문수락</Button>
                : <Button disabled={false} onClick={acceptOrder}>주문수락</Button>
            }
        </Col>
        <Col>
            {rejectType
                ? <Button disabled={true} onClick={rejectOrder}>주문거절</Button>
                : <Button disabled={false} onClick={rejectOrder}>주문거절</Button>
            }
        </Col>
        <Col>
            {completeType
                ? <Button disabled={true}  onClick={completeOrder}>조리완료</Button>
                : <Button disabled={false} onClick={completeOrder}>조리완료</Button>
            }
        </Col>
    </ListGroup.Item>
  );
};

export default ReceiveOrderList;
