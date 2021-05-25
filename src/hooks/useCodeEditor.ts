import { useRef } from "react";
import { EditorDidMount } from "@monaco-editor/react";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";
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
    const babelParse = (code: string) =>
      parse(code, {
        sourceType: "module",
        plugins: ["jsx"],
      });
    const highlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,
      babelParse,
      traverse,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(100);
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
