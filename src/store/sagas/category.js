import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import { actions as toastrActions } from "react-redux-toastr";
import CategoryAction from "../ducks/category";

export function* getCategory() {
  try {
    const response = yield call(api.get, "category");

    yield put(CategoryAction.getCategorySuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createCategory({ name }) {
  try {
    const response = yield call(api.post, "category", {
      name
    });

    yield put(CategoryAction.createCategorySuccess(response.data));
    yield put(CategoryAction.closeCategoryModal());
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
