import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const StoreWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 100%;
  top: 25%;
`;

const StoreRegister = () => {
  return (
    <StoreWrapper>
      <Container>
        <p className="fs-1">가게 정보 등록</p>
      </Container>
    </StoreWrapper>
  );
};

export default StoreRegister;
