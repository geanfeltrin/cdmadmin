import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../../../services/api";
import Select from "react-select";

import { Container } from "./styles";
import {
  Table,
  Button,
  Row,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Badge
} from "reactstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import UsersActions from "../../../store/ducks/users";

import Modal from "../Modal";
class users extends Component {
  static propTypes = {
    // Pass in a Component to override default element
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    size: PropTypes.string,
    bordered: PropTypes.bool,
    borderless: PropTypes.bool,
    striped: PropTypes.bool,
    dark: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.bool,
    // Custom ref handler that will be assigned to the "ref" of the inner <table> element
    innerRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
      PropTypes.object
    ]),
    getUsersRequest: PropTypes.func.isRequired,
    openUsersModal: PropTypes.func.isRequired,
    createUsersRequest: PropTypes.func.isRequired
  };

  state = {
    username: "",
    email: "",
    password: "",
    roles: [],
    selectedOption: null
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  handleCreateUser = e => {
    e.preventDefault();

    const { createUsersRequest } = this.props;
    const { username, email, password, selectedOption } = this.state;
    const rolesId = selectedOption.map(selected => selected.id);

    createUsersRequest(username, email, password, rolesId);
  };

  async componentDidMount() {
    const { getUsersRequest } = this.props;

    const response = await api.get("roles");
    this.setState({ roles: response.data });

    getUsersRequest();
  }

  render() {
    const { users, openUsersModal, closeUsersModal } = this.props;
    const { username, email, password, roles, selectedOption } = this.state;
    return (
      <Container>
        <Row>
          <h1>Usuários</h1>
          <Button color="primary" onClick={openUsersModal}>
            Criar novo Usuário
          </Button>
          {users.UsersModalOpen && (
            <Modal size="big">
              <Form onSubmit={this.handleCreateUser}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Username">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleInputChange}
                        id="usernameId"
                        placeholder="Username"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                        id="Email"
                        placeholder="e-mail"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="Password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleInputChange}
                        id="Password"
                        placeholder="password placeholder"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <Label for="Permissoes">Permissões</Label>

                    <Select
                      isMulti
                      options={roles}
                      getOptionLabel={role => role.name}
                      getOptionValue={role => role.id}
                      value={selectedOption}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Button color="primary" size="big" type="Submit">
                    Salvar
                  </Button>
                  <Button
                    color="secondary"
                    size="big"
                    onClick={closeUsersModal}
                  >
                    Cancelar
                  </Button>
                </Row>
              </Form>
            </Modal>
          )}
        </Row>

        <Table bordered hover size="sm" responsive="md" className="mx-auto">
          <thead>
            <tr className="mx-auto">
              <th>id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Permissões</th>
            </tr>
          </thead>
          {users.data.map(users => (
            <tbody key={users.id}>
              <tr>
                <th scope="row">{users.id}</th>
                <td>{users.username}</td>
                <td>{users.email}</td>
                <td>
                  {users.roles.map(roles => (
                    <Badge className="m-1" key={roles.id}>
                      {roles.name}
                    </Badge>
                  ))}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(users);
