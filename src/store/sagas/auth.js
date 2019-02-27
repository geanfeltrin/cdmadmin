import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import { actions as toastrActions } from "react-redux-toastr";
import api from "../../services/api";

import AuthActions from "../ducks/auth";

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, "sessions", { email, password });
    console.log(response.data);
    localStorage.setItem("@cdm-adm:token", response.data.token);
    yield put(AuthActions.signInSuccess(response.data.token));

    /* Permissao */

    /*fim Permissao */

    yield put(push("/"));
  } catch (error) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Falha no login",
        message: "Verifique seu e-mail/senha!"
      })
    );
  }
}

export function* signOut() {
  localStorage.removeItem("@cdm-adm:token");
  yield put(push("/"));
}

export function* getPermission() {
  const response = yield call(api.get, "sessions");
  localStorage.setItem("@cdm-adm:permission", response.data);
  yield put(AuthActions.getPermissionSuccess(response.data));
}
