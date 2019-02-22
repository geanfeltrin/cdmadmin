import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import PostAction from "../ducks/post";

export function* getPost() {
  const response = yield call(api.get, "post");

  yield put(PostAction.getPostSuccess(response.data));
}
