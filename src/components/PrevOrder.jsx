import React, { useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import PrevOrderList from "./PrevOrderList";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ko } from "date-fns/locale";
import { IoMdArrowDropdown } from "react-icons/io";

const PrevOrder = () => {
  const url =
    "https://apifood.blacksloop.com/order-service/orders/v1/owner/order?page=0&size=15";
  //const url = `http://localhost:8000/order-service/orders/v1/owner/prev-order?page=0&size=10`;
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const [prevOrderList, setPrevOrderList] = useState([]);

  const headers = {
    Authorization: `Bearer ${authorization}`,
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState({
    sdate: `${format(new Date(), "yyyy-MM-dd")}`,
    edate: `${format(new Date(), "yyyy-MM-dd")}`,
  });

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelection = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const sDate = format(startDate, "yyyy-MM-dd");
  const eDate = format(endDate, "yyyy-MM-dd");
  // console.log("userId : " + userId);
  // console.log("sData : " + sDate);
  // console.log("eData : " + eDate);

  const data = {
    user_id: userId,
    start_date: sDate,
    end_date: eDate,
  };

  const handleConfirm = () => {
    setDate({
      ...date,
      sdate: sDate,
      edate: eDate,
    });
    setShowDate(!showDate);
  };

  const getPrevOrderList = async () => {
    console.log(data);
    await axios
      .post(url, data, { headers })
      .then((response) => {
        setPrevOrderList(response.data.data.orders);
        console.log(response);
      })
      .catch((err) => console.log(err.response));
  };

  const handleSearch = () => {
    console.log("Post 시작");
    getPrevOrderList();
  };

  return (
    <>
      <PrevOrderWrapper>
        <Container className="text-center">
          <p className="fs-1">이전 주문</p>

          <InputDate className="inputDate" action="https://example.com">
            <div className="dateWrapper">
              <div
                className="showDateRange btn -regular"
                onClick={() => {
                  setShowDate(!showDate);
                }}
              >
                {date.sdate} ~ {date.edate} <IoMdArrowDropdown />
              </div>
              {showDate && (
                <div className="dateRangePicker">
                  <DateRangePicker>
                    <DateRange
                      ranges={[selectionRange]}
                      onChange={handleSelection}
                      rangeColors={["black"]}
                      color="black"
                      locale={ko}
                      startDatePlaceholder="Early"
                    />
                  </DateRangePicker>
                  <div className="cancleAndSelect">
                    <button
                      className="cancel btn -regular"
                      onClick={() => {
                        setShowDate(!showDate);
                      }}
                    >
                      취소
                    </button>
                    <button
                      className="select btn -regular"
                      onClick={handleConfirm}
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              type="button"
              className="search_btn btn -regular"
              onClick={handleSearch}
            >
              조회
            </div>
          </InputDate>

          <Row className="mt-5">
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문번호</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문상태</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문시간</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문상품</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">결제금액</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">닉네임</p>
            </Col>
            {/* <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">상세보기</p>
            </Col> */}
          </Row>
          <ListGroup>
            {prevOrderList &&
              prevOrderList.map((item) => {
                return <PrevOrderList item={item} />;
              })}
          </ListGroup>
        </Container>
      </PrevOrderWrapper>
    </>
  );
};

export default PrevOrder;

const PrevOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
  .fs-1 {
    margin-bottom: 12px;
  }
`;

const DateRangePicker = styled.div`
  position: absolute;
  z-index: 9999;
  top: 50px;
  left: -35px;
  border-radius: 8px;
  display: flex;
`;
const InputDate = styled.div`
  display: flex;
  justify-content: flex-end;

  .btn {
    display: flex;
    //overflow: hidden;

    font-family: "Do Hyeon", sans-serif;
    cursor: pointer;
    user-select: none;
    transition: all 150ms linear;
    text-align: center;
    white-space: nowrap;
    text-decoration: none !important;
    text-transform: none;
    text-transform: capitalize;
    word-spacing: 1.5px;
    color: #fff;
    border: 0 none;
    border-radius: 36px;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    justify-content: center;
    align-items: center;
    flex: 0 0 80px;

    box-shadow: 2px 5px 10px #e4e4e4;

    &:hover {
      transition: all 150ms linear;

      opacity: 0.85;
    }

    &:active {
      transition: all 150ms linear;
      opacity: 0.75;
    }

    &:focus {
      outline: 1px dotted #959595;
      outline-offset: -4px;
    }
  }
  .showDateRange {
    padding: 6px 20px;
  }
  .search_btn {
    display: inline-block;
    margin-left: 12px;
    display: flex;
    align-items: center;
  }

  .btn.-regular {
    color: #202129;
    background-color: #f2f2f2;

    &:hover {
      color: #202129;
      background-color: #e1e2e2;
      opacity: 1;
    }

    &:active {
      background-color: #d5d6d6;
      opacity: 1;
    }
  }

  label {
    font-size: 12px;
  }
  .dateWrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    .cancleAndSelect {
      display: flex;
      position: absolute;
      top: 400px;
      left: 30px;
      .cancel {
        flex-grow: 1;
        margin-right: 60px;
        padding: 10px;
        outline: none;
      }
      .select {
        flex-grow: 1;
        outline: none;
      }
    }
  }
`;
