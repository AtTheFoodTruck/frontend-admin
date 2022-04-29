import React, { useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const MenuListEL = ({
  key,
  item,
  // handlePlusModal,
  handleMinusModal,
  deleteMenu,
}) => {
  console.log("key : " + key)
  console.log("itemId : " + item.itemId)
  return (
    <>
      <ListGroup.Item className="d-inline-flex align-items-center">
        <Col>{item.itemId}</Col>
        <Col>{item.itemName}</Col>
        <Col>{item.price}</Col>
        {/* <Col>등록</Col> */}
        {/* <Col>
          <AiFillPlusCircle type="button" onClick={handlePlusModal} />
        </Col> */}

        <Col>
          <AiFillEdit type="button" onClick={handleMinusModal} />
        </Col>

        <Col>
          <TiDelete type="button" onClick={() => deleteMenu(item.itemId)} />
        </Col>

        {/* <Col>{item.itemImg}</Col> */}
        {/* <img src={item.itemImg}></img> */}
      </ListGroup.Item>
    </>
  );
};

export default MenuListEL;
