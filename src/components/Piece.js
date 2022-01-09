import React from "react";

export default ({ piece }) => (
  <div className="piece">{piece === 1 ? "🔴" : "🔵"}</div>
);
