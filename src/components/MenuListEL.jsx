import React from "react";
import { Col, ListGroup } from "react-bootstrap";

const MenuListEL = ({ item }) => {
  return (
    <>
      <ListGroup.Item className="d-inline-flex align-items-center">
        <Col>{item.itemId}</Col>
        <Col>{item.itemName}</Col>
        {/* <Col>{item.description}</Col> */}
        <Col>{item.price}</Col>
        {/* <Col>{item.itemImg}</Col> */}
        {/* <img src={item.itemImg}></img> */}
      </ListGroup.Item>
    </>
  );
};

export default MenuListEL;
