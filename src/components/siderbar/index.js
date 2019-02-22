import React, { Component } from "react";

import { Container } from "./styles";
import { Nav, NavItem, NavLink, NavbarToggler, Collapse } from "reactstrap";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Container>
        {/* <h1>List Based</h1> */}
        <Nav vertical>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <NavItem>
              <NavLink href="users">Usuários</NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="category">Categorias</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="roles">Postagem</NavLink>
            </NavItem>
          </Collapse>
        </Nav>
      </Container>
    );
  }
}
