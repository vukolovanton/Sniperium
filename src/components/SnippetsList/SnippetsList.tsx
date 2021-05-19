import React from "react";
import SnippetListItem from "./SnippetListItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";

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
  return <div>{renderedSnippets}</div>;
};

export default SnippetsList;
