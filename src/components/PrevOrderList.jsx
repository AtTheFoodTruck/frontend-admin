import React from "react";
import { Col, ListGroup } from "react-bootstrap";

const PrevOrderList = (item) => {
  //주문번호,주문상태,주문시간,주문상품,결제금액,아이디?,상세보기
  const style = {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  };
  return (
    <>
      <ListGroup.Item className="d-inline-flex align-items-center ">
        {/* 주문번호 */}
        {/* <Col>{key}</Col> */}

        <Col>{item.id}</Col>
        <Col>{item.orderStatus}</Col>
        <Col>{item.orderTime}</Col>
        <Col className="orderItems" style={style}>
          {item.orderItems[0].itemName}
        </Col>
        <Col>{item.orderPrice}</Col>
        <Col>{item.userName}</Col>
      </ListGroup.Item>
    </>
  );
};

export default PrevOrderList;
