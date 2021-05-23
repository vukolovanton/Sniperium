import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (snippetId: string) => {
  // Share code between different instances of code editor
  return useTypedSelector((state) => {
    const { data, order } = state.snippets;
    const orderedSnippets = order.map((id: string) => data[id]);
    //   const showFunc = `
    //   var show = (value) => {
    //     const root = document.querySelector('#root');
    //
    //     if (typeof value === 'object') {
    //       if (value.$$typeof && value.props) {
    //         _ReactDOM.render(value, root);
    //       } else {
    //         root.innerHTML = JSON.stringify(value);
    //       }
    //     } else {
    //       root.innerHTML = value;
    //     }
    //   };
    // `;
    // const showFuncNoOperation = `var show = () => {}`;
    const cumulativeCode = [
      `
      const show = (value) => {
      const root = document.querySelector('#root');
        if (typeof value === 'object') {
          root.innerHTML = JSON.stringify(value);
          } else {
            root.innerHTML = value;
          }
      }
    `,
    ];
    for (let s of orderedSnippets) {
      if (s.type === "code") {
        // if (s.id === snippetId) {
        //   cumulativeCode.push(showFunc);
        // } else {
        //   cumulativeCode.push(showFuncNoOperation);
        // }
        cumulativeCode.push(s.content);
      }
      if (s.id === snippetId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
