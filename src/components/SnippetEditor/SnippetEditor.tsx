import React from "react";

import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Resizable from "../Resizable";
import { Snippet } from "../../state/Snippet";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./styles.css";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

interface SnippetEditorProps {
  snippet: Snippet;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({ snippet }) => {
  const cumulativeCode = useCumulativeCode(snippet.id);
  const { updateSnippet, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[snippet.id]);

  const onClickSubmit = async () => {
    createBundle(snippet.id, cumulativeCode);
  };

  // Todo: refactor to run on typing?
  // React.useEffect(() => {
  //   if (!bundle) {
  //     createBundle(snippet.id, cumulativeCode);
  //     return;
  //   }
  //   const timer = setTimeout(async () => {
  //     createBundle(snippet.id, cumulativeCode);
  //   }, 1000);
  //
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line
  // }, [snippet.id, cumulativeCode, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="editor-container">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={snippet.content}
            onChange={(value) => updateSnippet(snippet.id, value)}
            onClickSubmit={onClickSubmit}
            snippetId={snippet.id}
          />
        </Resizable>

        {!bundle || bundle.loading ? (
          <div className="snippet-editor-container">
            <div className="spinner">
              <div className="dot1" />
              <div className="dot2" />
            </div>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default SnippetEditor;
