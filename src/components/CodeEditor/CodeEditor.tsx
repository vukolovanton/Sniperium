import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

import "./styles.css";
import { useCodeEditor } from "../../hooks/useCodeEditor";
import { useActions } from "../../hooks/useActions";
import { JS_TEMPLATE, REACT_TEMPLATE } from "../../constants/snippetTemplates";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  onClickSubmit(): void;
  snippetId: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  onClickSubmit,
  snippetId,
}) => {
  const { updateSnippet } = useActions();
  const { onEditorDidMount, onFormatClick } = useCodeEditor(onChange);
  const [template, setTemplate] = useState("default");

  const getTemplate = (value: string) => {
    let t = "";
    switch (value) {
      case "react-template":
        return (t = REACT_TEMPLATE);
      case "js-template":
        return (t = JS_TEMPLATE);
      case "clear":
        setTemplate("default");
        return t;
    }
    return t;
  };

  const handleTemplateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTemplate(event.target.value);
    updateSnippet(snippetId, getTemplate(event.target.value));
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="code-editor-button-container">
        <select value={template} onChange={handleTemplateChange}>
          <option value="default" disabled={true}>
            Select template...
          </option>
          <option value="react-template">React App</option>
          <option value="js-template">JS</option>
          <option value="clear">Clear</option>
        </select>
        <button className="action-button" onClick={onFormatClick}>
          Format
        </button>
        <button className="action-button" onClick={onClickSubmit}>
          Submit
        </button>
      </div>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        options={{
          wordWrap: "on",
          minimap: { enabled: true },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            vertical: "hidden",
          },
          overviewRulerBorder: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;
