import React from "react";

export default ({ label, handleClick }) => (
  <button onClick={handleClick}>{label} </button>
);
