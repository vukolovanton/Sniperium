import { useRef } from "react";
import { EditorDidMount } from "@monaco-editor/react";
import Highlighter from "monaco-jsx-highlighter";
import codeShift from "jscodeshift";
import prettier from "prettier";
import parser from "prettier/parser-babel";

export const useCodeEditor = (onChange: (s: string) => void) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    // Highlight js code
    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    // Shitty code required by this library
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };

  const onFormatClick = () => {
    // Get current value
    const unformattedCode = editorRef.current.getModel().getValue();
    // Format value
    const formattedCode = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });
    // Set formatted value back in the editor
    editorRef.current.setValue(formattedCode);
  };

  return { onEditorDidMount, onFormatClick };
};
