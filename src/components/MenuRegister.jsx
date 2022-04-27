// import { Container, Col, Row, Button, Form } from "react-bootstrap";
// import axios from "axios";
// import { useState } from "react";
// import ImgUpload from "./ImgUpload";
// import AWS from "aws-sdk";

// const MenuRegister = () => {
//   // // // 유저 정보
//   // // const authorization = localStorage.getItem("Authorization");
//   // // const userId = localStorage.getItem("userId");
//   // const headers = {
//   //   Authorization: `Bearer ${authorization}`,
//   // };

//   // 변수 초기화
//   const [inputs, setInputs] = useState({
//     menuname: "",
//     description: "",
//     price: "",
//   });
//   const { menuname, description, price } = inputs; // 비구조화 할당을 통해 값 추출
//   // const [imgURL, setImgURL] = useState(""); // image 상태
//   // const [fileURL, setFileURL] = useState("img/default_image.png"); //미리보기
//   // const [reviewLocation, setReviewLocation] = useState("");
//   // const [loaded, setLoaded] = useState(false);

//   // InputBox Change Event
//   const onChange = (e) => {
//     const { value, name } = e.target;
//     setInputs({
//       ...inputs,
//       [name]: value,
//     });
//   };

//   // 저장 후 텍스트 ""로 초기화
//   const onReset = () => {
//     setInputs({
//       ...inputs,
//       menuname: "",
//       description: "",
//       price: "",
//     });
//   };

//   // // S3 환경 설정
//   // AWS.config.update({
//   //   accessKeyId: process.env.REACT_APP_ACCESS_KEY,
//   //   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
//   //   region: process.env.REACT_APP_REGION,
//   // });

//   // // img input
//   // const handleImgInput = (e) => {
//   //   e.preventDefault();
//   //   const fileReader = new FileReader();
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     setLoaded("loading");
//   //     fileReader.readAsDataURL(file);
//   //   }
//   //   fileReader.onload = () => {
//   //     //미리보기
//   //     setFileURL(fileReader.result);
//   //     //s3
//   //     setImgURL(e.target.files[0]);
//   //     setLoaded(true);
//   //   };
//   // };

//   // // 이미지 업로드 진행
//   // const handleImgUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   const upload = new AWS.S3.ManagedUpload({
//   //     params: {
//   //       ACL: "public-read",
//   //       Body: file,
//   //       Bucket: process.env.REACT_APP_S3_BUCKET,
//   //       Key: "menu/" + file.name,
//   //     },
//   //   });

//   //   const promise = upload.promise();

//   //   promise.then(
//   //     function (data) {
//   //       setReviewLocation(data.Location);
//   //       console.log(data.Location + "업로드 성공");
//   //     },

//   //     function (err) {
//   //       console.log(err);
//   //       console.log("env, ", process.env.AWS_CONFIG);
//   //       return console.log("오류가 발생했습니다");
//   //     }
//   //   );
//   // };

//   // 메뉴 등록 api
//   const postMenuPush = async () => {
//     await axios
//       .post(
//         `http://localhost:8000/item-service/items/v1/owner/item`,
//         {
//           // user_id: 2,
//           user_id: userId,
//           item_name: menuname,
//           description: description,
//           price: price,
//           item_img_url: reviewLocation,
//         },
//         {
//           headers: headers,
//         }
//       )
//       .then((res) => {
//         if (res.data.result === "success") {
//           console.log(res);
//           alert("메뉴 등록 성공");
//           onReset();
//         } else {
//           alert("메뉴 등록에 실패하였습니다. 관리자에게 문의해주세여");
//         }
//       })
//       .catch((err) => console.log("return error" + err));
//   };

//   return (
//     <Container className="text-center">
//       <p className="fs-1">메뉴관리</p>
//       <Row className="d-flex align-items-center">
//         <Col>
//           <ImgUpload
//             setState={setInputs}
//             // loaded={loaded}
//             // fileURL={fileURL}
//             // handleImgInput={handleImgInput}
//             // handleImgUpload={handleImgUpload}
//           />
//         </Col>

//         <Col>
//           <label htmlFor="menuName">메뉴명</label>
//           <input
//             className="form-control"
//             name="menuname"
//             onChange={onChange}
//             value={menuname}
//             id="menuName"
//           />
//         </Col>
//         <Col>
//           <label htmlFor="menuPrice">가격</label>
//           <input
//             className="form-control"
//             name="price"
//             onChange={onChange}
//             value={price}
//             id="menuPrice"
//           />
//         </Col>
//         <Col>
//           <label htmlFor="description">설명</label>
//           <input
//             className="form-control"
//             name="description"
//             onChange={onChange}
//             value={description}
//             id="description"
//           />
//         </Col>
//         <Col>
//           <Button onClick={postMenuPush}>등록</Button>
//         </Col>
//       </Row>
//       {/* <img src="img/food1.jpg" alt="하이" /> */}
//     </Container>
//   );
// };

        <Col>
          <label htmlFor="menuName">메뉴명</label>
          <input
            className="form-control"
            name="menuname"
            onChange={onChange}
            value={menuname}
            id="menuName"
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
        {/* <Col>
          <label htmlFor="description">설명</label>
          <input
            className="form-control"
            name="description"
            onChange={onChange}
            value={description}
            id="description"
          />
        </Col> */}
        <Col>
          <Button onClick={postMenuPush}>등록</Button>
        </Col>
      </Row>
      {/* <img src="img/food1.jpg" alt="하이" /> */}
    </Container>
  );
};
