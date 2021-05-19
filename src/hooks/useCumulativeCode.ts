import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (snippetId: string) => {
  // Share code between different instances of code editor
  return useTypedSelector((state) => {
    // @ts-ignore
    const { data, order } = state.snippets;
    const orderedSnippets = order.map((id: string) => data[id]);
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';
    var show = (value) => {
      const root = document.querySelector('#root');

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `;
    const showFuncNoOperation = `const show = () => {}`;
    const cumulativeCode = [];
    for (let c of orderedSnippets) {
      if (c.type === "code") {
        if (c.id === snippetId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoOperation);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === snippetId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
