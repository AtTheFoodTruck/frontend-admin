import React, { useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import Modal from "./Modal";
const MenuListEL = ({ item, handlePlusModal, handleMinusModal }) => {
  return (
    <>
      <ListGroup.Item className="d-inline-flex align-items-center">
        <Col>{item.itemId}</Col>
        <Col>{item.itemName}</Col>
        {/* <Col>{item.description}</Col> */}
        <Col>{item.price}</Col>
        {/* <Col>등록</Col> */}
        <Col>
          <AiFillPlusCircle type="button" onClick={handlePlusModal} />
        </Col>

        <Col>
          <AiFillEdit type="button" onClick={handleMinusModal} />
        </Col>

        <Col>
          <TiDelete type="button" />
        </Col>
        {/* <Col>{item.itemImg}</Col> */}
        {/* <img src={item.itemImg}></img> */}
      </ListGroup.Item>
    </>
  );
};

export default MenuListEL;
