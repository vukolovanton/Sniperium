import ReactDom from "react-dom";
import { Provider } from "react-redux";

import { store } from "./state";
import Header from "./components/Header";
import SnippetsList from "./components/SnippetsList";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <SnippetsList />
      </div>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
