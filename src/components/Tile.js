import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Piece from "./Piece";

export default ({ tile, handleClick, row, column }) => {
  const tileClass = (row + column) % 2;
  if (!tile.value)
    return (
      <div className={"tile empty p" + tileClass} onClick={handleClick}>
        {tile.moves.length > 0 && tile.moves.length}
      </div>
    );
  return (
    <div className={"tile filled p" + tileClass}>
      <ReactCSSTransitionGroup
        transitionName="flip"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <Piece key={tile.value} piece={tile.value} />
      </ReactCSSTransitionGroup>
    </div>
  );
};
