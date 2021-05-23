import React from "react";
import { useActions } from "../../../hooks/useActions";
import "./styles.css";

interface AddSnippetProps {
  nextSnippetId: string | null;
}

const AddSnippet: React.FC<AddSnippetProps> = ({ nextSnippetId }) => {
  const { insertSnippetBefore } = useActions();

  return (
    <div className="container">
      <button
        className="button icon-slide-right"
        onClick={() => insertSnippetBefore(nextSnippetId, "code")}
      >
        <span>Code</span>
      </button>
      <button
        className="button icon-slide-right"
        onClick={() => insertSnippetBefore(nextSnippetId, "text")}
      >
        <span>Text</span>
      </button>
    </div>
  );
};

export default AddSnippet;
