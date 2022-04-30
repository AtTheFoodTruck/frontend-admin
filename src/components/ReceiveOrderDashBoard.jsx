import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaBars,
  FaFileAlt,
  FaSave,
  FaRegAddressBook,
} from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { BsHourglassSplit } from "react-icons/bs";
import { RiVipCrown2Line } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";

const ReceiveOrderDashBoard = () => {
  return (
    <>
      <Row>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body style={{ textAlign: "center" }}>
              <Row>
                <Col xs="5">
                  <div>
                    <AiOutlineHome size="65" color="black" />
                  </div>
                </Col>
                <Col xs="7" className="">
                  <div className="numbers">
                    <p className="card-category mb-3">상점이름</p>
                    <Card.Title as="h4" style={{ fontFamily: "Jua" }}>
                      김치찌개전문
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <BiEdit style={{ fontSize: 20, marginRight: 5 }} />
                수정
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body style={{ textAlign: "center" }}>
              <Row>
                <Col xs="5">
                  <div>
                    <FcSalesPerformance size="70" />
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category mb-3">누적판매량</p>
                    <Card.Title style={{ fontFamily: "Jua" }} as="h4">
                      $ 1,345
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <BiEdit style={{ fontSize: 20, marginRight: 5 }} />
                수정
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body style={{ textAlign: "center" }}>
              <Row>
                <Col xs="5">
                  <div>
                    <BsHourglassSplit size="63" color="black" />
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category mb-3">총 대기 번호</p>
                    <Card.Title as="h4" style={{ fontFamily: "Jua" }}>
                      23
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <BiEdit style={{ fontSize: 20, marginRight: 5 }} />
                수정
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body style={{ textAlign: "center" }}>
              <Row>
                <Col xs="5">
                  <div>
                    <FaRegAddressBook size="65" color="black" />
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category mb-3">내 현재 위치</p>
                    <Card.Title as="h4" style={{ fontFamily: "Jua" }}>
                      송파구
                    </Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <div className="stats">
                <BiEdit style={{ fontSize: 20, marginRight: 5 }} />
                수정
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReceiveOrderDashBoard;
