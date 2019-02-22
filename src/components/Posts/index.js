import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PostActions from "../../store/ducks/post";

import Modal from "../Modal";
import {
  Table,
  Button,
  Row,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  Badge,
  Media
} from "reactstrap";

import { Container } from "./styles";

class Posts extends Component {
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
    ])
  };
  componentDidMount() {
    const { getPostRequest } = this.props;

    getPostRequest();
  }

  render() {
    const { post } = this.props;
    return (
      <Container>
        <Table bordered hover size="sm" responsive="md" className="mx-auto">
          <thead>
            <tr className="mx-auto">
              <th>id</th>
              <th>Titulo</th>
              <th>Sub Categorias</th>
              <th>Status</th>
              <th>Imagem</th>
              <th>Link Download</th>
              <th>Excluir Publicação</th>
            </tr>
          </thead>
          {post.data.map(post => (
            <tbody key={post.id}>
              <tr>
                <th scope="row">{post.id}</th>
                <td>{post.title}</td>
                <td>{post.subcategories.name}</td>
                <td>{post.type}</td>
                <td>
                  <img
                    className="thumbnail"
                    src={post.imagem}
                    alt="Thumbnail"
                  />
                </td>
                <td>
                  <a href={post.url} alt={post.title}>
                    Link
                  </a>
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
  post: state.post
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PostActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
