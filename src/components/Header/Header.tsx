import React from "react";
import AddSnippet from "./AddSnippet";
import "./styles.css";

const Header = () => {
  return (
    <header className="header-container">
      <div>
        <h3>Sniperium</h3>
        <p>Add, describe, and run JS code snippets</p>
      </div>
      <AddSnippet nextSnippetId={null} />
    </header>
  );
};

export default Header;
