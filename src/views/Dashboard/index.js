import React, { Component } from "react";

import { Container } from "./styles";
import Sidebar from "../../components/siderbar";
import Header from "../../components/header";
import { Row, Col } from "reactstrap";

// import Users from "../../components/Users";
// import Category from "../../components/Category";
import Posts from "../../components/Posts";
// import ImgDropAndCrop from "../../components/ImgDropAndCrop";

export default class Dashboard extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10}>
            <Posts />
          </Col>
        </Row>
      </Container>
    );
  }
}
