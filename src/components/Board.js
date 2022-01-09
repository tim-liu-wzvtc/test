import React from "react";
import Tile from "./Tile";

export default ({ board, handleMove }) => (
  <div className="game-board">
    {board.map((row, r) =>
      row.map((tile, c) => (
        <Tile
          row={r}
          column={c}
          key={`${r}${c}`}
          tile={tile}
          handleClick={() => handleMove(r, c)}
        />
      ))
    )}
  </div>
);
