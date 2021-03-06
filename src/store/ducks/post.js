import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getPostRequest: null,
  getPostSuccess: ["data"],
  openPostModal: null,
  closePostModal: null,
  createPostRequest: [
    "title",
    "description",
    "url",
    "file_id",
    "sub_category_id",
    "type_post"
  ],
  createPostSuccess: ["post"]
});

export const PostTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  PostModalOpen: false
});

/* Reducers */

export const success = (state, { data }) => state.merge({ data });

export const openModal = state => state.merge({ PostModalOpen: true });

export const closeModal = state => state.merge({ PostModalOpen: false });

export const createSuccess = (state, { post }) =>
  state.merge({ data: [...state.data, post] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POST_SUCCESS]: success,
  [Types.CREATE_POST_SUCCESS]: createSuccess,
  [Types.OPEN_POST_MODAL]: openModal,
  [Types.CLOSE_POST_MODAL]: closeModal
});
