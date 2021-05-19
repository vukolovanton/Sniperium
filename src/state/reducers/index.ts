import { combineReducers } from "redux";
import snippetReducer from "./snippetReducer";
import bundlesReducer from "./bundlesReducer";

const reducers = combineReducers({
  snippets: snippetReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
