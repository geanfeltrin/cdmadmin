import styled from "styled-components";

// const sizes = {
//   desktop: 992,
//   tablet: 768,
//   phone: 576
// };

// // Iterate through the sizes and create a media template
// const media = Object.keys(sizes).reduce((acc, label) => {
//   acc[label] = (...args) => css`
//     @media (max-width: ${sizes[label] / 16}em) {
//       ${css(...args)}
//     }
//   `;

//   return acc;
// }, {});

export const Container = styled.aside`
  display: flex;
  padding-left: 30px;
  margin-top: 0px;
  padding-top: 0px;
  max-width: 200px;
  height: 100%;
  background-color: transparent;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: #3c8d9f;

  /* h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    font-size: 24px;
    color: #000000;
  } */
  div {
    display: flex;
    flex-direction: column;
    border-width: 3px;
    border-color: #ffffff;
    margin: 10px;
    margin-top: 0px;

    &:first-child {
      border-bottom: 1px solid #e7e7e7;
    }
  }

  /* strong {
    font-family: "Lato";
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    font-size: 20px;
    color: #000000;
  } */
  /* ul {
    display: flex;
    text-decoration: none;
    flex-direction: column;
    margin: 0px;
    list-style-type: none;
  }
  li {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 16px;
    text-decoration: none;
    margin: 0px;
    margin-bottom: 0px;
    margin-top: 0px;
    color: #646464;
    &:first-child {
      margin-top: 12px;
    }
  } */
  a {
    font-family: "Lato";
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 16px;
    text-decoration: none;

    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: none;
      color: #646464;
      font-weight: bold;
    }
  }
`;
