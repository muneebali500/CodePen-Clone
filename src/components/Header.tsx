import React from "react";

interface LocalStorageProps {
  saveToLocalStorage(): void;
  clearLocalStorage(): void;
}

function Header(props: LocalStorageProps) {
  console.log(`header called`);

  return (
    <nav>
      <h1>CodePen Clone</h1>

      <div className="nav-btns">
        <button
          className="save-btn nav-btn"
          onClick={() => props.saveToLocalStorage()}
        >
          Save
        </button>
        <button
          className="clear-btn nav-btn"
          onClick={() => props.clearLocalStorage()}
        >
          Clear
        </button>
      </div>
    </nav>
  );
}

const MemoizedHeader = React.memo(Header);
export default MemoizedHeader;
