import React from "react";
import TextEditor from "../../TextEditor";
import SnippetEditor from "../../SnippetEditor";
import { Snippet } from "../../../state/Snippet";
import ActionBar from "../../ActionBar";
import "./styles.css";

interface SnippetListItemProps {
  snippet: Snippet;
}

const SnippetListItem: React.FC<SnippetListItemProps> = ({ snippet }) => {
  let child: JSX.Element;

  if (snippet.type === "code") {
    child = <SnippetEditor snippet={snippet} />;
  } else {
    child = <TextEditor snippet={snippet} />;
  }

  return (
    <div className="snippet-list-item-container">
      <ActionBar id={snippet.id} />
      {child}
    </div>
  );
};

export default SnippetListItem;
