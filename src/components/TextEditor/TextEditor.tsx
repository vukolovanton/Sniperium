import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./styles.css";
import { Snippet } from "../../state/Snippet";
import { useActions } from "../../hooks/useActions";

interface TextEditorProps {
  snippet: Snippet;
}

const TextEditor: React.FC<TextEditorProps> = ({ snippet }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateSnippet } = useActions();

  useEffect(() => {
    // Close editor if user click outside of it
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={snippet.content}
          onChange={(v) => updateSnippet(snippet.id, v || "")}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor-container">
      <div>
        <MDEditor.Markdown source={snippet.content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
