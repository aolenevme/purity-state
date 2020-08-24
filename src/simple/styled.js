import styled from "styled-components";

const ClockS = styled.div`
  color: ${(props) => props.timeColor};
`;

const UIS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
`;

export {
    ClockS,
    UIS
};
