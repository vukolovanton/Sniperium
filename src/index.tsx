import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./state";
import Header from "./components/Header";
import SnippetsList from "./components/SnippetsList";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <Header />
          <SnippetsList />
        </div>
      </PersistGate>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
