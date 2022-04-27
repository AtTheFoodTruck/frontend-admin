import React from "react";
import styled from "styled-components";
import { Container, ListGroup, Col, Button, Row } from 'react-bootstrap';
// import OrderPage from "../OrderPage/OrderPage";
// import { useNavigate } from "react-router-dom";

const ImgSize = styled.img`
  height: 15rem;
  object-fit: cover;
`;

const ReceiveOrderList = ({ orderListitem }) => {

    const orderId = orderListitem.orderId
    const orderDate = orderListitem.orderTime
    const orderState = orderListitem.orderStatus
    const userName = orderListitem.userName
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/order-page", {
//       state: {
//         storeId: item.storeId,
//       },
//     });
//   };

  return (
    // <ListGroup>
    // <ListGroup.Item className="d-inline-flex align-items-center">
    <ListGroup.Item className="d-inline-flex align-items-center">
            {/* <Col>{orderListitem.orderId}</Col> */}
            <Col>{orderId}</Col>
            <Col>{orderDate}</Col>
            <Col>{orderState}</Col>
            <Col>{userName}</Col>
            <Col>{orderListitem.orderItems[0].itemName}</Col>
            <Col>
              <Button>수락</Button>
            </Col>
            <Col>
              <Button>거절</Button>
            </Col>
            <Col>
              <Button>조리완료</Button>
            </Col>
       </ListGroup.Item>
    // </ListGroup.Item>
//   </ListGroup>

    // <motion.section
    //   layout
    //   animate={{ opacity: 1 }}
    //   initial={{ opacity: 0 }}
    //   exit={{ opacity: 0 }}
    //   className="py-2 "
    // >
    //   <div className="col mb-5 ">
    //     <div className="card h-100 ">
    //       <ImgSize
    //         className="card-img-top img-fluid"
    //         src="/img/pizza.jpg"
    //         // src={item.storeImgUrl}
    //         alt="..."
    //       />
    //       <div className="card-body p-4">
    //         <div className="text-center">
    //           {/* <!-- Product name--> */}
    //           <h5 className="fw-bolder">{item.storeName}</h5>
    //           <div className="d-flex justify-content-center small  mb-2">
    //             <div className="bi-star-fill text-warning"></div>&ensp;
    //             {item.rateAvg}
    //           </div>
    //           {/* <div>store Id = {item.storeId}</div> */}
    //         </div>
    //       </div>
    //       {/* <!-- Product actions--> */}
    //       <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
    //         <div className="text-center">
    //           <button
    //             className="btn btn-outline-dark mt-auto"
    //             cvariant="outline-secondary"
    //             onClick={handleClick}
    //           >
    //             주문하기
    //           </button>
    //           {/* <Link
    //             className="btn btn-outline-dark mt-auto"
    //             to={"/order-page/" + item.storeId}
    //           >
    //             주문하기
    //           </Link>
    //           <Button cvariant="outline-secondary" onClick={handleClick}>
    //             주문하기
    //           </Button> */}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </motion.section>
  );
};

export default ReceiveOrderList;
