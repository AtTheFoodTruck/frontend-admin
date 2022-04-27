import React, { useEffect, useState } from "react";
import { Container, ListGroup, Col, Button, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from "axios";
import ReceiveOrderList from './ReceiveOrderList';

const ReceiveOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 100%;
  top: 20%;
`;

const ReceiveOrder = () => {

  // 변수 초기화
  const [orderList, setOrderList] = useState([])    // 주문내역
  const [orderItems, setOrderItems] = useState([])  // 주문내역의 주문 아이템 목록

  // 유저 정보
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };

  // 최초 페이지 렌더링
  useEffect(() => {
    getOrderList();
  }, []);

  async function getOrderList() {
    const foodtruck = await axios
      .post(
        // `https://apifood.blacksloop.com/order-service/orders/v1/owner/order?page=0&size=${size}`,
        `http://localhost:8000/order-service/orders/v1/owner/order?page=0&size=10`,
        {
          user_id: 2,
          order_date: "2022-04-25"
        },
        { headers }
      )
      .then((res) => {
        console.log(res);
        setOrderList(res.data.data.orderList);
        setOrderItems(res.data.data.orderItems);
      })
      .catch((err) => console.log(err));
  }

  return (
    <ReceiveOrderWrapper>
      <Container className="text-center">
        <p className="fs-1">주문접수</p>
        <Row>
          {/* <Col lg={3}></Col> */}
          <Col className='d-flex justify-content-start p-0'>
            <h5>주문번호</h5>
          </Col>
          <Col className='d-flex justify-content-start p-0'>
            <h5>주문시간</h5>
          </Col>
          <Col className='d-flex justify-content-start p-0'>
            <h5>주문상태</h5>
          </Col>
          <Col className='d-flex justify-content-start p-0'>
            <h5>주문자</h5>
          </Col>
          <Col className='d-flex justify-content-start p-0'>
            <h5>아이템</h5>
          </Col>
        </Row>
        <ListGroup>
        {orderList.map(orderListitem => {
              return <ReceiveOrderList key={orderListitem.orderId} orderListitem={orderListitem} />;
            })}
          {/* <ListGroup.Item className="d-inline-flex align-items-center"> */}
            
            {/* <Col>orderID</Col>
            <Col>orderDate</Col>
            <Col>menuName</Col>
            <Col>orderState</Col>
            <Col>
              <Button>수락</Button>
            </Col>
            <Col>
              <Button>거절</Button>
            </Col>
            <Col>
              <Button>조리완료</Button>
            </Col> */}
          {/* </ListGroup.Item> */}
        </ListGroup>
      </Container>
    </ReceiveOrderWrapper>
  );
};

export default ReceiveOrder;
