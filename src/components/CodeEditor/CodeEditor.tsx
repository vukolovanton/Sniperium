import React from "react";
import Editor from "@monaco-editor/react";
import { useCodeEditor } from "../../hooks/useCodeEditor";
import { useHotkeys } from "../../hooks/react-hotkeys-hook";
import "./styles.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const { onEditorDidMount, onFormatClick } = useCodeEditor(onChange);

  useHotkeys("command+s", () => onFormatClick());

  // Todo: Format code after 2 seconds, but skip initial render

  //   const isFirstRun = React.useRef(true);
  //   React.useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  //   const timer = setTimeout(async () => {
  //     onFormatClick();
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [initialValue, onFormatClick]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <Editor
        onMount={onEditorDidMount}
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
