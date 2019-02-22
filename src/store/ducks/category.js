import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getCategoryRequest: null,
  getCategorySuccess: ["data"],
  selectCategory: ["category"],
  openCategoryModal: null,
  closeCategoryModal: null,
  createCategoryRequest: ["name"],
  createCategorySuccess: ["category"]
});

export const CategoryTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  active: JSON.parse(localStorage.getItem("@Cdm:category")) || null,
  CategoryModalOpen: false
});

/* Reducers */

export const getSuccess = (state, { data }) => state.merge({ data });

export const selectCategory = (state, { category }) => {
  localStorage.setItem("@Cdm:category", JSON.stringify(category));

  return state.merge({ active: category });
};

export const openModal = state => state.merge({ CategoryModalOpen: true });

export const closeModal = state => state.merge({ CategoryModalOpen: false });

export const createSuccess = (state, { category }) =>
  state.merge({ data: [...state.data, category] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_CATEGORY_SUCCESS]: getSuccess,
  [Types.SELECT_CATEGORY]: selectCategory,
  [Types.OPEN_CATEGORY_MODAL]: openModal,
  [Types.CLOSE_CATEGORY_MODAL]: closeModal,
  [Types.CREATE_CATEGORY_SUCCESS]: createSuccess
});
