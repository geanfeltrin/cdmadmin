import React, { Component } from "react";
import Proptypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AuthActions from "../../store/ducks/auth";

import { Container, Form, Content } from "./styles";
import BackgroundImg from "../../assets/background.jpg";
import logo from "../../assets/logo.png";
import logoRese from "../../assets/logoRese.png";
// import user from "../../assets/userlogin.png";

class SignIn extends Component {
  static propTypes = {
    signInRequest: Proptypes.func.isRequired
  };

  state = {
    email: "",
    password: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container img={BackgroundImg}>
        <Content>
          <img src={logoRese} alt="logo Residencia" />
          <h1>
            A força da marca <br />{" "}
            <b>
              <strong>Residência</strong>
            </b>{" "}
            criando <br />
            oportunidades para você.
          </h1>
        </Content>

        <Form onSubmit={this.handleSubmit}>
          <img src={logo} alt="Logo" />

          <h1>Faça Seu login</h1>
          <div className="user-email">
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              placeholder="Nome de Usuário"
            />
          </div>
          <div className="user-password">
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              placeholder="Senha"
            />
          </div>
          <button type="submit">Entrar</button>
          <a href="/" alt="Recuperar senha">
            Esqueceu sua senha
          </a>
        </Form>
      </Container>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
