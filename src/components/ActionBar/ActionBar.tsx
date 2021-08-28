import React, { useState } from "react";
import { useActions } from "../../hooks/useActions";
import "./styles.css";
import { JS_TEMPLATE, REACT_TEMPLATE } from "../../constants/snippetTemplates";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";
import { Snippet } from "../../state/Snippet";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface ActionBarProps {
  snippet: Snippet;
}

const ActionBar: React.FC<ActionBarProps> = ({ snippet }) => {
  const { id, type } = snippet;
  const [template, setTemplate] = useState("default");
  const { moveSnippet, deleteSnippet, updateSnippet, createBundle } =
    useActions();
  const bundle = useTypedSelector(
      (state) => state.bundles && state.bundles[snippet.id]
  );
  const cumulativeCode = useCumulativeCode(id);

  const onClickSubmit = async () => {
    createBundle(id, cumulativeCode);
  };

  const getTemplate = (value: string) => {
    let t = "";
    switch (value) {
      case "react-template":
        return (t = REACT_TEMPLATE);
      case "js-template":
        return (t = JS_TEMPLATE);
    }
    return t;
  };

    React.useEffect(() => {
      if (!bundle) {
        createBundle(id, cumulativeCode);
      }
  }, [bundle, createBundle, cumulativeCode, id]);

  const handleTemplateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTemplate(event.target.value);
    updateSnippet(id, getTemplate(event.target.value));
  };

  const renderCodeActionButtons = () => {
    if (type === "code") {
      return (
        <>
          <select
            value={template}
            onChange={handleTemplateChange}
            className="template-select"
          >
            <option value="default" disabled={true}>
              Select template...
            </option>
            <option value="react-template">React App</option>
            <option value="js-template">JS</option>
          </select>
          <button className="action-button" onClick={onClickSubmit}>
            Submit
          </button>
        </>
      );
    }
  };

  return (
    <div className="action-bar-container">
      <div>{renderCodeActionButtons()}</div>
      <div>
        <button className="action-button" onClick={() => moveSnippet(id, "up")}>
          Up
        </button>
        <button
          className="action-button"
          onClick={() => moveSnippet(id, "down")}
        >
          Down
        </button>
        <button className="action-button" onClick={() => deleteSnippet(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
