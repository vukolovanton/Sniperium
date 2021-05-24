import React from "react";
import AddSnippet from "./AddSnippet";
import "./styles.css";

const Header = () => {
  return (
    <div className="header-container">
      <div>
        <h3>Snipper</h3>
        <p>Add, describe, and run JS code snippets</p>
      </div>
      <AddSnippet nextSnippetId={null} />
    </div>
  );
};

export default Header;
