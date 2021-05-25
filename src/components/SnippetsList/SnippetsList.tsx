import React from "react";
import SnippetListItem from "./SnippetListItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "./syles.css";

const SnippetsList: React.FC = () => {
  const snippets = useTypedSelector(({ snippets }) => {
    return snippets?.order.map((id) => {
      return snippets.data[id];
    });
  });

  const renderedSnippets = snippets?.map((snippet) => (
    <React.Fragment key={snippet.id}>
      <SnippetListItem snippet={snippet} />
    </React.Fragment>
  ));
  return <div className="view-container">{renderedSnippets}</div>;
};

export default SnippetsList;
