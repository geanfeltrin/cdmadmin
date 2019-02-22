import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { reducer as toastr } from "react-redux-toastr";
import { reducer as auth } from "./auth";
import { reducer as category } from "./category";
import { reducer as subCategory } from "./subCategory";
import { reducer as post } from "./post";
import { reducer as users } from "./users";

export default history =>
  combineReducers({
    auth,
    users,
    category,
    subCategory,
    post,
    toastr,
    router: connectRouter(history)
  });
