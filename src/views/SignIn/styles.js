import styled from "styled-components";
import device from "../../styles/devices";
import userIcon from "../../assets/userlogin.png";
import passwordIcon from "../../assets/password.png";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  /* background */
  background: ${props => `url(${props.img}) no-repeat top center`};
  background-color: #008296;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;

  min-height: 100vh;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;

  /* Now we have our methods on media and can use them instead of raw queries */
`;

export const Content = styled.div`
  margin-bottom: 30px;

  ${device.tablet`margin-bottom: 0px;`}
  ${device.laptop`margin-bottom: 0px;`}
  ${device.phone`margin-bottom: 0px;`}
  img {
    width: 305px;
    margin-bottom: 100px;
    ${device.tablet`margin-bottom: 0px;`}
    ${device.laptop`margin-bottom: 0px;`}
    ${device.phone`margin-bottom: 0px;`}
  }
  h1 {
    font-size: 50px;
    color: #fff;
    width: 677px;
    flex-wrap: 1;
    margin-bottom: 200px;
    text-align: justify;
    letter-spacing: 3px;
    font-family: "Lato", sans-serif;

    ${device.tablet`display: none;`}
    ${device.laptop`margin-bottom: 0px;`}
    ${device.phone`display: none;`}
  }
`;

export const Form = styled.form`
  margin: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 500px;
  background-color: #fff;

  -webkit-box-shadow: 3px 6px 6px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 3px 6px 6px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 3px 6px 6px 0px rgba(0, 0, 0, 0.2);
  flex-wrap: 1;
  justify-content: center;
  align-content: center;

  ${device.mobileL`
      padding: 20px;
      width: 100%;
      `}
  ${device.mobileM`
      padding: 20px;
      width: 100%;
      `}
  ${device.mobileS`
      padding: 0px;
      width: 100%;
      `}


  img {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    width: 305px;
    ${device.mobileS`
        margin-bottom: 0px;      
      `}
  }

  h1 {
    font-size: 40px;
    text-align: center;
    margin: 10px;
    font-family: "Lato bold", sans-serif;

    ${device.mobileS`
        font-size: 35px;     
      `}
  }

  .user-email {
    background: #fff url(${userIcon}) no-repeat 10px center;
    margin: 6px 7px 6px 10px;
  }
  .user-password {
    background: #fff url(${passwordIcon}) no-repeat 10px center;
    margin: 6px 7px 6px 10px;
  }
  input {
    margin: 5px;
    margin-top: 10px;
    padding-left: 30px;
    width: 100%;
    height: 70px;
    background: ${props => `url(${props.img}) no-repeat top center`};
    -webkit-box-shadow: 6px 3px 6px 0px rgba(230, 230, 230, 1);
    -moz-box-shadow: 6px 3px 6px 0px rgba(230, 230, 230, 1);
    box-shadow: 6px 3px 6px 0px rgba(230, 230, 230, 1);
    border: none;
    border-color: #e6e6e6;
    color: #a2a2a2;
    font-size: 15px;
    font-family: "Lato", sans-serif;
    &::-webkit-input-placeholder {
      color: #a2a2a2;
    }
    ${device.mobileS`
    width: 90%;
    `}
  }

  button {
    margin-left: 14px;
    margin-top: 10px;
    align-items: center;
    height: 70px;
    background-color: #008296;
    color: #fff;
    -webkit-box-shadow: 6px 3px 6px 1px rgba(230, 230, 230, 1);
    -moz-box-shadow: 6px 3px 6px 1px rgba(230, 230, 230, 1);
    box-shadow: 6px 3px 6px 1px rgba(230, 230, 230, 1);
    font-family: "Lato", sans-serif;
    outline: none;
    border: none;
    &:hover {
      background-color: #016f80;
    }

    ${device.mobileS`
    width: 85%;
    `}
  }

  a {
    color: #a2a2a2;
    text-align: center;
    margin-bottom: 20px;

    &:hover {
      text-decoration: none;
      color: #0000;
    }
  }
`;
