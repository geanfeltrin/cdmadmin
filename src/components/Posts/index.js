import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import PostActions from "../../store/ducks/post";

import api from "../../services/api";
import Select from "react-select";
import { uniqueId } from "lodash";
import filesize from "filesize";

import Modal from "../Modal";
import {
  Table,
  Button,
  Row,
  Label,
  Form,
  FormGroup,
  Input,
  Col
} from "reactstrap";

import { Container } from "./styles";
import ImgDropAndCrop from "../ImgDropAndCrop";
import FileList from "../FileList";

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

  state = {
    postTitle: "",
    postDescription: "",
    postUrl: "",
    PostType: [{ id: 0, name: "public" }, { id: 1, name: "privado" }],
    category: "",
    subCategory: null,
    selectedCategory: null,
    selectedSubCategory: null,
    selectedType: null,
    uploadedFiles: []
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreatePost = e => {
    e.preventDefault();

    const { createPostRequest } = this.props;
    const {
      postTitle,
      postDescription,
      postUrl,
      selectedSubCategory,
      uploadedFiles,
      selectedType
    } = this.state;

    const [uploadedFilesId] = uploadedFiles;

    const title = postTitle;
    const description = postDescription;
    const url = postUrl;
    const sub_category_id = selectedSubCategory.id;
    const file_id = uploadedFilesId.id;
    const type = selectedType.name;

    console.log(title, description, url, sub_category_id, file_id, type);
    createPostRequest({
      title,
      description,
      url,
      sub_category_id,
      file_id,
      type
    });
  };

  handleChangeCategory = selectedCategory => {
    this.setState({
      selectedCategory,
      subCategory: selectedCategory.subCategories,
      selectedSubCategory: null
    });
  };

  handleChangeSubCategory = selectedSubCategory => {
    this.setState({
      selectedSubCategory
    });
  };
  handleChangeType = selectedType => {
    this.setState({
      selectedType
    });
  };
  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });
    uploadedFiles.forEach(this.processUpload);
    console.log(uploadedFiles);
  };
  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  processUpload = uploadedFiles => {
    const data = new FormData();

    data.append("file", uploadedFiles.file, uploadedFiles.name);

    api
      .post("files", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFiles.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFiles.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url
        });
      })
      .catch(response => {
        this.updateFile(uploadedFiles.id, {
          error: true
        });
      });
  };

  handleDeleteFile = async id => {
    await api.delete(`files/${id}`);
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  async componentDidMount() {
    const { getPostRequest } = this.props;

    getPostRequest();

    const response = await api.get("category");
    this.setState({ category: response.data });
  }

  render() {
    const { post, openPostModal, closePostModal } = this.props;
    const {
      postTitle,
      PostType,
      postUrl,
      postDescription,
      category,
      subCategory,
      selectedCategory,
      selectedType,
      selectedSubCategory,
      uploadedFiles
    } = this.state;

    return (
      <Container>
        <Row>
          <h1>Publicações</h1>
          <Button color="primary" onClick={openPostModal}>
            Criar nova Publicação
          </Button>
          {post.PostModalOpen && (
            <Modal size="big">
              <Form onSubmit={this.handleCreatePost}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="postTitle">Titulo da postagem</Label>
                      <Input
                        type="text"
                        name="postTitle"
                        value={postTitle}
                        onChange={this.handleInputChange}
                        id="postTitleId"
                        placeholder="Digite o titulo da postagem"
                      />
                      <Label for="postDescription">Descrição da postagem</Label>
                      <Input
                        type="text"
                        name="postDescription"
                        value={postDescription}
                        onChange={this.handleInputChange}
                        id="postDescriptionId"
                        placeholder="Digite o titulo da postagem"
                      />
                      <Label for="Permissoes">Tipo</Label>
                      <Select
                        options={PostType}
                        getOptionLabel={PostType => PostType.name}
                        getOptionValue={PostType => PostType.id}
                        value={selectedType}
                        onChange={this.handleChangeType}
                      />
                      <Label for="Permissoes">Categoria</Label>
                      <Select
                        options={category}
                        getOptionLabel={category => category.name}
                        getOptionValue={category => category.id}
                        value={selectedCategory}
                        onChange={this.handleChangeCategory}
                      />
                      {subCategory && (
                        <div>
                          <Label for="categorias">Sub-Categoria</Label>

                          <Select
                            options={subCategory}
                            getOptionLabel={subCategory => subCategory.name}
                            getOptionValue={subCategory => subCategory.id}
                            value={selectedSubCategory}
                            onChange={this.handleChangeSubCategory}
                          />
                        </div>
                      )}
                      <Label for="postUrl">Link Para o download</Label>
                      <Input
                        type="text"
                        name="postUrl"
                        value={postUrl}
                        onChange={this.handleInputChange}
                        id="postUrlId"
                        placeholder="Digite o link para o download"
                      />
                    </FormGroup>
                  </Col>
                  {!!uploadedFiles.length < 1 && (
                    <ImgDropAndCrop onUpload={this.handleUpload} />
                  )}

                  {!!uploadedFiles.length && (
                    <FileList
                      files={uploadedFiles}
                      onDelete={this.handleDeleteFile}
                    />
                  )}
                </Row>
                <Row>
                  <Button color="primary" size="big" type="Submit">
                    Salvar
                  </Button>
                  <Button color="secondary" size="big" onClick={closePostModal}>
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
