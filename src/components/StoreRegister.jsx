import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ImgUpload from "./ImgUpload";
import AWS from "aws-sdk";

const StoreRegister = () => {
  // 유저 정보
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };

  // 변수 초기화
  const [inputs, setInputs] = useState({
    store: "",
    phone: "",
    notice: "",
    address: "",
    calendar: "",
  });
  const { store, phone, notice, address, calendar } = inputs; // 비구조화 할당을 통해 값 추출
  //img 상태
  const [imgURL, setImgURL] = useState(""); // image 상태
  const [fileURL, setFileURL] = useState("img/default_image.png"); //미리보기
  const [loaded, setLoaded] = useState(false);
  const [reviewLocation, setReviewLocation] = useState("");
  // S3 환경 설정
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_REGION,
  });
  // InputBox Change Event
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 저장 후 텍스트 ""로 초기화
  const onReset = () => {
    setInputs({
      ...inputs,
      store: "",
      phone: "",
      notice: "",
      address: "",
      calendar: "",
    });
  };

  // const postStore = () => {
  //   console.log({ inputs });
  //   console.log(cate);
  //   onReset();
  //   setCate(false);
  // };

  const navigate = useNavigate();

  // //상점 등록
  async function onClickJoin(e) {
    e.preventDefault();
    if (store === "") {
      alert("상점 이름을 입력해주세요");
    } else if (phone === "") {
      alert("핸드폰 번호 입력해주세요");
    } else if (notice === "") {
      alert("공지사항을 입력해주세요");
    } else if (cate == null) {
      alert("카테고리를 선택해주세요");
    } else if (!(store && phone && notice && cate)) {
      alert("양식에 맞게 다시 기입해주세요");
    } else {
      axios
        // .post("https://apifood.blacksloop.com/item-service/items/v1/owner/stores", {
        // .post("https://apifood.blacksloop.com/item-service/items/v1/owner/stores", {
        .post(
          "https://apifood.blacksloop.com/item-service/items/v1/owner/stores",
          {
            user_id: userId,
            store_name: store,
            phone_num: phone,
            notice: notice,
            category_name: cate,
            store_img_url: reviewLocation,
            // store_img_url:"imgUrl2",
            // open_time: "2018-12-15T10:00:00",
            // address: "서울시 구로구 공원로길",
            // zip_code: "06666",
            // latitude: 1782.93,
            // longitude: 168.156,
            // b_no:"1348639909222222",
            // s_dt:"20070523",
            // p_name:"이한종99"
          },
          {
            headers: headers,
          }
        )
        .then(function (res) {
          if (res.data.result === "success") {
            alert("상점 등록 성공");
            navigate("/", { replace: true });
          } else {
            alert("상점 등록에 실패하였습니다. 관리자에게 문의해주세여");
            // setCate(false);
            onReset();
          }
        })
        .catch((err) => console.log("return error" + err));
    }
  }

  // 가게명 중복체크 이벤트
  async function validateName(e) {
    e.preventDefault();
    console.log("중복체크 전 가게명 : " + inputs.store);
    await axios.post(`https://apifood.blacksloop.com/item-service/items/v1/validation/name`,
      {
        store_name: inputs.store
      }, {
        headers: headers
      }
    ).then( res => {
      if (res.data.result === "success") {
        alert(res.data.messge);
      } else if(res.data.result === "fail") {
        alert(res.data.message);
      } else {
        alert("오류가 발생하였습니다. 관리자에게 문의하세요");
        }
    })
  }

  //카테고리
  const [cate, setCate] = useState(null);
  const handlecate = (e) => {
    console.log(`선택한 radio 값 : ${e.target.value}`);

    setCate(e.target.value);
  };
  const category = [
    { id: 1, name: "치킨" },
    { id: 2, name: "피자" },
    { id: 3, name: "햄버거" },
    { id: 4, name: "스테이크" },
    { id: 5, name: "닭강정" },
    { id: 6, name: "핫도그" },
    { id: 7, name: "중식" },
    { id: 8, name: "디저트" },
    { id: 9, name: "일식" },
    { id: 10, name: "기타" },
    { id: 11, name: "한식" },
    { id: 12, name: "분식" },
  ];

  // img input
  const handleImgInput = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      setLoaded("loading");
      fileReader.readAsDataURL(file);
    }
    fileReader.onload = () => {
      //미리보기
      setFileURL(fileReader.result);
      //s3
      setImgURL(e.target.files[0]);
      setLoaded(true);
    };
  };

  // 이미지 업로드 진행
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Body: file,
        Bucket: process.env.REACT_APP_S3_BUCKET,
        Key: "store/" + file.name,
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        setReviewLocation(data.Location);
        console.log(data.Location + "업로드 성공");
      },

      function (err) {
        console.log(err);
        console.log("env, ", process.env.AWS_CONFIG);
        return console.log("오류가 발생했습니다");
      }
    );
  };
  return (
    <MemberRegisterContainer>
      <form className="container">
        <div className="head">
          <h1>Store Register</h1>
        </div>
        <div className="store">
          <div className="form-floating">
            <input
              type="text"
              name="store"
              //   value={inputEmail}
              className="form-control"
              id="storelabel"
              placeholder="상점 이름을 입력하세요."
              value={store}
              onChange={onChange}
            />
            <label htmlFor="storelabel">StoreName</label>
          </div>
        </div>
        <div className="storeDuplicate">
          <button onClick={validateName} type="submit" className=" btn btn-lg btn-outline-secondary">
            check
          </button>
        </div>
        <div className="phonenumber">
          <div className="form-floating">
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phonelabel"
              placeholder="휴대전화 번호를 입력하세요."
              value={phone}
              onChange={onChange}
            />
            <label htmlFor="phonelabel">PhoneMessage</label>
          </div>
        </div>
        {/*TODO 주소*/}
        <div className="address">
          <div className="form-floating">
            <input
              type="text"
              name="address"
              className="form-control"
              id="addresslabel"
              placeholder="주소를 입력하세요."
              onChange={onChange}
              value={address}
            />
            <label htmlFor="addresslabel">Address</label>
          </div>
        </div>
        {/* notice */}
        <div className="notice form-group">
          <div className="form-floating">
            <textarea
              name="notice"
              className="form-control textarea"
              id="noticelabel"
              placeholder="공지사항을 입력하세요."
              value={notice}
              onChange={onChange}
            />
            <label className="form-label" htmlFor="noticelabel">
              Notice
            </label>
          </div>
        </div>
        {/*TODO 달력변경 오픈 시간 */}
        <div className="openTime">
          <div className="form-floating">
            <input
              type="text"
              name="calendar"
              className="form-control"
              id="calendarlabel"
              placeholder="오픈 시간을 입력하세요."
              onChange={onChange}
              value={calendar}
            />
            <label htmlFor="calendarlabel">OpenTime</label>
          </div>
        </div>
        {/* 라디오 버튼 시작 */}
        <div className="radiobutton radio form-group">
          {category.map((item) => (
            <div key={item.id} className="form-check">
              <label className="form-check-label" htmlfor={item.name}>
                {item.name}
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="storeRadio"
                id={item.name}
                value={item.name}
                onChange={handlecate}
              />
            </div>
          ))}
        </div>

        {/*TODO AWS이미지 업데이트 변경  Logo */}
        <div className="form-group logo">
          <label htmlfor="formFile" className="form-label mt-2 mb-3 ">
            Logo
          </label>
          {/* img */}
          <div class="upload_img">
        
            <ImgUpload
              setState={setInputs}
              loaded={loaded}
              fileURL={fileURL}
              handleImgInput={handleImgInput}
              handleImgUpload={handleImgUpload}
            />
          </div>
          {/* <input className="form-control" type="file" id="formFile" /> */}
          {/* img */}
        </div>
        {/* store push 버튼 */}
        <div className="join">
          <button
            type="button"
            className=" btn btn-lg btn-outline-secondary"
            onClick={onClickJoin}
          >
            Store Push
          </button>
        </div>
      </form>
    </MemberRegisterContainer>
  );
};

export default StoreRegister;

const MemberRegisterContainer = styled.div`
  position: absolute;
  align-items: center;
  top: 10%;
  left: 46%;
  width: 25em;
  margin: auto;

  .container {
    display: grid;
    grid-template-rows: 1fr 0.2fr;
    grid-template-columns: 1fr 0.2fr;

    grid-template-areas:
      "head ."
      "store storeDuplicate"
      "phonenumber ."
      "address ."
      "notice ."
      "openTime ."
      "radiobutton radiobutton2"
      "logo ."
      "join .";
  }

  .head {
    grid-area: head;
    margin-top: 0.5em;
    text-align-last: center;
  }
  .store {
    grid-area: store;
    margin-top: 0.5em;
  }
  .storeDuplicate {
    grid-area: storeDuplicate;
  }
  .phonenumber {
    grid-area: phonenumber;
    margin-top: 0.5em;
  }
  .address {
    grid-area: address;
    margin-top: 0.5em;
  }
  .notice {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-area: notice;
    margin-top: 0.5em;
  }
  .textarea {
    height: 200px;
    resize: none;
  }
  .openTime {
    grid-area: openTime;
    margin-top: 0.5em;
  }
  .radiobutton {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-area: radiobutton;
    margin-top: 0.5em;
  }
  .logo {
    grid-area: logo;
    margin-top: 0.5em;
  }

  .join {
    grid-area: join;
    margin-top: 0.5em;
  }

  .btn {
    margin-top: 0.5em;
    width: 100%;
  }
`;
