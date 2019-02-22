import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getUsersRequest: null,
  getUsersSuccess: ["data"],
  openUsersModal: null,
  closeUsersModal: null,
  createUsersRequest: ["username", "email", "password", "roles"],
  createUsersSuccess: ["users"]
});

export const UsersTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  UsersModalOpen: false
});

/* Reducers */

export const success = (state, { data }) => state.merge({ data });

export const openModal = state => state.merge({ UsersModalOpen: true });

export const closeModal = state => state.merge({ UsersModalOpen: false });

export const createSuccess = (state, { users }) =>
  state.merge({ data: [...state.data, users] });
/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_USERS_SUCCESS]: success,
  [Types.OPEN_USERS_MODAL]: openModal,
  [Types.CLOSE_USERS_MODAL]: closeModal,
  [Types.CREATE_USERS_SUCCESS]: createSuccess
});
