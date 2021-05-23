export const REACT_TEMPLATE = `
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <h3>Pickle rick</h3>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)
`;

export const JS_TEMPLATE = `document.getElementById("root").innerHTML = \`
<h1>Hello to Snipper!</h1>
\`;
`;

// ReactDom.render(<App />, document.querySelector("#root"));
// ReactDOM.render(<App />, document.querySelector("#root"));
// ReactDom.render(<App />, document.querySelector("#root"));
