import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getSubCategoryRequest: null,
  getSubCategorySuccess: ["data"],
  openModal: null,
  closeModal: null,
  createSubCategoryRequest: ["name", "category_id"],
  createSubCategorySuccess: ["subCategory"]
});

export const SubCategoryTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  subModalOpen: false
});

/* Reducers */

export const getSuccess = (state, { data }) => state.merge({ data });

export const openSubModal = state => state.merge({ subModalOpen: true });

export const closeSubModal = state => state.merge({ subModalOpen: false });

export const createSuccess = (state, { subCategory }) =>
  state.merge({ data: [...state.data, subCategory] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SUB_CATEGORY_SUCCESS]: getSuccess,
  [Types.OPEN_MODAL]: openSubModal,
  [Types.CLOSE_MODAL]: closeSubModal,
  [Types.CREATE_SUB_CATEGORY_SUCCESS]: createSuccess
});
