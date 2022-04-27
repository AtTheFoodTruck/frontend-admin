import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const MenuListEL = ({ item, deleteMenu }) => {
  return (
    <>
      <ListGroup.Item className="d-inline-flex align-items-center">
        <Col>{item.itemId}</Col>
        <Col>{item.itemName}</Col>
        <Col>{item.price}</Col>
        <Col><AiFillPlusCircle/></Col>
        <Col><AiFillEdit/></Col>
        <Col><TiDelete type="button" onClick={() => deleteMenu(item.itemId)} /></Col>
        {/* <Col>{item.description}</Col> */}
        {/* <Col>{item.itemImg}</Col> */}
        {/* <img src={item.itemImg}></img> */}
      </ListGroup.Item>
    </>
  );
};

export default MenuListEL;
