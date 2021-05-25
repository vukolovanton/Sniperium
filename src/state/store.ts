import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "./reducers";
// import { ActionType } from "./action-types";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

const persistor = persistStore(store);
export { store, persistor };

// store.dispatch({
//   type: ActionType.INSERT_SNIPPET_BEFORE,
//   payload: {
//     id: null,
//     type: "code",
//   },
// });
