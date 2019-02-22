import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;

  button {
    display: flex;

    justify-content: center;
    align-items: center;
    margin: 20px;
  }
  h1 {
    margin: 20px;
  }
  .thumbnail {
    width: 64px;
  }
`;
