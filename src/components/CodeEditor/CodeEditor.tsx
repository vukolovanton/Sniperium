import React from "react";
import MonacoEditor from "@monaco-editor/react";

import "./styles.css";
import { useCodeEditor } from "../../hooks/useCodeEditor";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  onClickSubmit(): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  onClickSubmit,
}) => {
  const { onEditorDidMount, onFormatClick } = useCodeEditor(onChange);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div className="code-editor-button-container">
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
          minimap: { enabled: false },
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
