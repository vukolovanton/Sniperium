import React from "react";

import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";
import { Snippet } from "../../state/Snippet";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
// import { useCumulativeCode } from "../../hooks/useCumulativeCode";

interface SnippetEditorProps {
  snippet: Snippet;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({ snippet }) => {
  // const cumulativeCode = useCumulativeCode(snippet.id);
  const { updateSnippet, createBundle } = useActions();
  const bundle = useTypedSelector(
    (state) => state.bundles && state.bundles[snippet.id]
  );

  const onClickSubmit = async () => {
    createBundle(snippet.id, snippet.content);
  };

  // Todo: refactor to run on typing?
  // useEffect(() => {
  //   if (!bundle) {
  //     createBundle(snippet.id, snippet.content);
  //     return;
  //   }
  //   const timer = setTimeout(async () => {
  //     createBundle(snippet.id, snippet.content);
  //   }, 1000);
  //
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line
  // }, [snippet.id, snippet.content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={snippet.content}
            onChange={(value) => updateSnippet(snippet.id, value)}
            onClickSubmit={onClickSubmit}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <span>Loading...</span>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default SnippetEditor;
