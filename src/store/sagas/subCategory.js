import { call, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import api from "../../services/api";
import { actions as toastrActions } from "react-redux-toastr";
import SubCategoryAction from "../ducks/subCategory";

export function* getSubCategory() {
  const response = yield call(api.get, "subcategory");

  yield put(SubCategoryAction.getSubCategorySuccess(response.data));
}

export function* createSubCategory({ name, category_id }) {
  try {
    const response = yield call(api.post, "subcategory", {
      name,
      category_id
    });

    yield put(SubCategoryAction.createSubCategorySuccess(response.data));
    yield put(SubCategoryAction.closeModal());
    yield put(push("/"));
    console.log("foi");
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
