import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import { actions as toastrActions } from "react-redux-toastr";

import PostAction from "../ducks/post";

export function* getPost() {
  const response = yield call(api.get, "post");

  yield put(PostAction.getPostSuccess(response.data));
}

export function* createPost({
  title,
  file_id,
  sub_category_id,
  description,
  url,
  type
}) {
  try {
    const response = yield call(api.post, "post", {
      title,
      file_id,
      sub_category_id,
      description,
      url,
      type
    });

    yield put(PostAction.createPostSuccess(response.data));
    yield put(PostAction.closePostModal());

    yield put(
      toastrActions.add({
        type: "success",
        title: "Post Criado com sucesso",
        message: "Post Criado com sucesso"
      })
    );
  } catch (error) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Erro na Operação",
        message: "Houve um erro , tente novamente"
      })
    );
  }
}
