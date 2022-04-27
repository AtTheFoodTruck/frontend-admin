import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Card = styled.div`
  img {
    width: 230px;
    height: 200px;
    margin-bottom: 15px;
  }
`;

export default function ImgUpload({
  loaded,
  fileURL,
  handleImgUpload,
  handleImgInput,
}) {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3 ">
        <Card class="card">
          {loaded === false || loaded === true ? (
            <img src={fileURL}></img>
          ) : (
            <span>이미지 불러오는 중</span>
          )}
        </Card>
        <Form.Control
          type="file"
          accept="image/jpg,image/jpeg"
          // onChange={handleImgInput}
          onChange={(e) => {
            handleImgUpload(e);
            handleImgInput(e);
          }}
        />
      </Form.Group>
    </>
  );
}
