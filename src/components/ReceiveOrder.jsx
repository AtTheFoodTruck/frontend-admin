import React, { useEffect, useState } from "react";
import { Container, ListGroup, Col, Button, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import ReceiveOrderList from "./ReceiveOrderList";

const ReceiveOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
`;

const ReceiveOrder = () => {
  // 변수 초기화
  const [orderList, setOrderList] = useState([]); // 주문내역
  const [orderItems, setOrderItems] = useState([]); // 주문내역의 주문 아이템 목록
  const [acceptType, setAcceptType] = useState(false);
  const [rejectType, setRejectType] = useState(true);
  const [completeType, setCompleteType] = useState(true);
  // 유저 정보
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };

  const size = 10;

  // 최초 페이지 렌더링
  useEffect(() => {
    getOrderList();
  }, []);

  // 주문 접수 클릭 이벤트
  async function acceptOrder() {
    await axios
      .patch(
        `https://apifood.blacksloop.com/order-service/orders/v1/owner/accept`,
        // `http://localhost:8000/order-service/orders/v1/owner/accept`,
        {
          order_id: 1,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setAcceptType(true);
  }

  // 주문 거절 클릭 이벤트
  async function rejectOrder() {
    await axios
      .patch(
        `https://apifood.blacksloop.com/order-service/orders/v1/owner/reject`,
        // `http://localhost:8000/order-service/orders/v1/owner/reject`,
        {
          order_id: 1,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.result === "success") {
          return alert(res.data.message);
        } else {
          return alert("오류가 발생하였습니다. 관리자에게 문의하세요");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setRejectType(true);
  }

  // 조리 완료 클릭 이벤트
  async function completeOrder() {
    await axios
      .patch(
        `https://apifood.blacksloop.com/order-service/orders/v1/owner/complete`,
        // `http://localhost:8000/order-service/orders/v1/owner/complete`,
        {
          order_id: 1,
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.result === "success") {
          return alert(res.data.message);
        } else {
          return alert("오류가 발생하였습니다. 관리자에게 문의하세요");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setCompleteType(true);
  }

  // 주문 접수 내역 조회
  async function getOrderList() {
    // const foodtruck = await axios
    await axios
      .post(
        `https://apifood.blacksloop.com/order-service/orders/v1/owner/order?page=0&size=${size}`,
        // `http://localhost:8000/order-service/orders/v1/owner/order?page=0&size=10`,
        {
          user_id: 2,
          order_date: "2022-04-25",
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
        <Row className=" mt-5">
          {/* <Col lg={3}></Col> */}
          <Col className="d-flex justify-content-start p-0">
            <h5>주문번호</h5>
          </Col>
          <Col className="d-flex justify-content-start p-0">
            <h5>주문시간</h5>
          </Col>
          <Col className="d-flex justify-content-start p-0">
            <h5>주문상태</h5>
          </Col>
          <Col className="d-flex justify-content-start p-0">
            <h5>주문자</h5>
          </Col>
          <Col className="d-flex justify-content-start p-0">
            <h5>아이템</h5>
          </Col>
        </Row>
        <ListGroup>
          {orderList.map((orderListItem) => (
            <ReceiveOrderList
              key={orderListItem.orderId}
              orderListItem={orderListItem}
              orderItems={orderItems}
              acceptOrder={acceptOrder}
              rejectOrder={rejectOrder}
              completeOrder={completeOrder}
            />
          ))}
        </ListGroup>
      </Container>
    </ReceiveOrderWrapper>
  );
};

export default ReceiveOrder;
