import React, { useState } from "react";
import { useActions } from "../../hooks/useActions";
import "./styles.css";
import { JS_TEMPLATE, REACT_TEMPLATE } from "../../constants/snippetTemplates";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const [template, setTemplate] = useState("default");
  const { moveSnippet, deleteSnippet, updateSnippet, createBundle } =
    useActions();
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

  const handleTemplateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTemplate(event.target.value);
    updateSnippet(id, getTemplate(event.target.value));
  };

  return (
    <div className="action-bar-container">
      <div>
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
      </div>
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
