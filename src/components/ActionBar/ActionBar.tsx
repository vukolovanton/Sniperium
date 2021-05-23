import React from "react";
import { useActions } from "../../hooks/useActions";
import "./styles.css";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveSnippet, deleteSnippet } = useActions();

  return (
    <div className="action-bar-container">
      <button className="action-button" onClick={() => moveSnippet(id, "up")}>
        Up
      </button>
      <button className="action-button" onClick={() => moveSnippet(id, "down")}>
        Down
      </button>
      <button className="action-button" onClick={() => deleteSnippet(id)}>
        Delete
      </button>
    </div>
  );
};

export default ActionBar;
