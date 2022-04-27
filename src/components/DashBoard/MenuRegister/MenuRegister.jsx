import { Container, Col, Row, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useRef, useState } from "react";

const MenuRegister = () => {
  // 토큰
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  // const headers = {
  //   Authorization: `Bearer ${authorization}`,
  // };
  const nameInput = useRef();

  const [inputs, setInputs] = useState({
    menuname: "",
    description: "",
    price: "",
  });

  const { menuname, description, price } = inputs; // 비구조화 할당을 통해 값 추출

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  // // 메뉴등록 POST
  // async function postMneuPush() {
  //   const data = {
  //     user_id: 34,
  //     item_name: menuname,
  //     description: description,
  //     price: price,
  //     item_img_url: "url",
  //   };

  //   await axios.post(
  //     "http://localhost:8000/item-service/items/v1/owner/item",
  //     data,
  //     {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0b3duZXJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfTUFOQUdFUiIsImV4cCI6MTY1MTQ1NTczNH0.42U6zmvsPIqiy4WPDfSu2WTO67lQU1jtwwj4ers4P6KroiCEYG-HzdZZAx29Cuq5zrH5Db2x6aVHl7D7rbfrxA`,
  //       },
  //     }
  //     // { headers }
  //   );

  //   console.log(data);
  // }
  const postMneuPush = async () => {
    await axios
      .post(
        `http://localhost:8000/items/v1/owner/item`,
        {
          user_id: 34,
          store_id: 40,
          item_name: menuname,
          description: description,
          price: price,
          item_img_url: "img/food1.jpg",
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0b3duZXJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfTUFOQUdFUiIsImV4cCI6MTY1MTQ1NTczNH0.42U6zmvsPIqiy4WPDfSu2WTO67lQU1jtwwj4ers4P6KroiCEYG-HzdZZAx29Cuq5zrH5Db2x6aVHl7D7rbfrxA`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("메뉴 등록 성공");
      })
      .catch((err) => console.log("return error" + err));
  };

  return (
    <Container className="text-center">
      <p className="fs-1">메뉴관리</p>
      {menuname} / {price} / {description}
      <Row className="d-flex align-items-center">
        <Col>
          <div className="form-group ">
            <label htmlFor="formFile" className="form-label mt-4">
              사진
            </label>
            <input className="form-control" type="file" id="formFile" />
          </div>
        </Col>

        <Col>
          <label htmlFor="menuName">메뉴명</label>
          <input
            className="form-control"
            name="menuname"
            onChange={onChange}
            value={menuname}
            id="menuName"
            ref={nameInput}
          />
        </Col>
        <Col>
          <label htmlFor="menuPrice">가격</label>
          <input
            className="form-control"
            name="price"
            onChange={onChange}
            value={price}
            id="menuPrice"
          />
        </Col>
        <Col>
          <label htmlFor="description">설명</label>
          <input
            className="form-control"
            name="description"
            onChange={onChange}
            value={description}
            id="description"
          />
        </Col>
        <Col>
          <Button onClick={postMneuPush}>등록</Button>
        </Col>
      </Row>
      {/* <img src="img/food1.jpg" alt="하이" /> */}
    </Container>
  );
};

export default MenuRegister;
