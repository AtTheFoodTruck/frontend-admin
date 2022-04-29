import React, { useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";

const PrevOrderList = ({ item }) => {
  //주문번호,주문상태,주문시간,주문상품,결제금액,아이디?,상세보기

  return (
    <>
      <ListGroup.Item className="d-inline-flex align-items-center">
        {/* 주문번호 */}
        {/* <Col>{key}</Col> */}

        <Col>item.id</Col>
        <Col>주문성공</Col>
        <Col>2022-03-29 11:30:30</Col>
        <Col>스테이크 외 2건</Col>
        <Col>25000</Col>
        <Col>푸드트럭고객</Col>
        <Col>상세보기</Col>
        <Col>{/* <AiFillPlusCircle type="button" /> */}</Col>
      </ListGroup.Item>
    </>
  );
};

export default PrevOrderList;
