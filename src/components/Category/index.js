import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CategoryActions from "../../store/ducks/category";

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
  Badge
} from "reactstrap";

import SubCategory from "../subCategory";

import { Container } from "./styles";

class Category extends Component {
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
    createCategoryRequest: PropTypes.func.isRequired,
    openCategoryModal: PropTypes.func.isRequired,
    closeCategoryModal: PropTypes.func.isRequired
  };
  state = {
    categoryName: "",
    subCategoryName: "",
    categoryId: [],
    selectedOption: null
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateCategory = e => {
    e.preventDefault();

    const { createCategoryRequest } = this.props;
    const { categoryName } = this.state;

    createCategoryRequest(categoryName);
  };

  componentDidMount() {
    const { getCategoryRequest } = this.props;

    getCategoryRequest();
  }
  render() {
    const { openCategoryModal, closeCategoryModal, category } = this.props;

    const { categoryName } = this.state;

    return (
      <Container>
        <Row>
          <h1>Categorias</h1>
          <Button color="primary" onClick={openCategoryModal}>
            Criar nova Categoria
          </Button>
          {category.CategoryModalOpen && (
            <Modal size="big">
              <Form onSubmit={this.handleCreateCategory}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="categoryName">Nome da categoria</Label>
                      <Input
                        type="text"
                        name="categoryName"
                        value={categoryName}
                        onChange={this.handleInputChange}
                        id="categoryNameId"
                        placeholder="Digite o nome da categoria"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Button color="primary" size="big" type="Submit">
                    Salvar
                  </Button>
                  <Button
                    color="secondary"
                    size="big"
                    onClick={closeCategoryModal}
                  >
                    Cancelar
                  </Button>
                </Row>
              </Form>
            </Modal>
          )}
          <SubCategory />
        </Row>

        <Table bordered hover size="sm" responsive="md" className="mx-auto">
          <thead>
            <tr className="mx-auto">
              <th>id</th>
              <th>Categoria</th>
              <th>Sub Categorias</th>
            </tr>
          </thead>
          {category &&
            category.data.map(category => (
              <tbody key={category.id}>
                <tr>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>

                  <td>
                    {category.subCategories &&
                      category.subCategories.length > 0 &&
                      category.subCategories.map(subCategories => (
                        <Badge className="m-1" key={subCategories.id}>
                          {subCategories.name}
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
  category: state.category
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(CategoryActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
