export const REACT_TEMPLATE = `import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <h3>I turned myself into a React template, Morty! </h3>
    )
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)
`;

export const JS_TEMPLATE = `document.getElementById("root").innerHTML = \`
<h1>I turned myself into a JS function, Morty!</h1>
\`;
`;
