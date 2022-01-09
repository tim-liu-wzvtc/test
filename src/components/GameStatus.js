import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Piece from "./Piece";
import Button from "./Button";
import { PLAYER_BLUE, PLAYER_RED } from "./Game";

export default ({ score: { red, blue }, gameOver, turn, skipTurn }) => {
  return (
    <div className="score">
      {gameOver && "GAME OVER"}
      <Piece piece={PLAYER_BLUE} />: {blue} | <Piece piece={PLAYER_RED} />:{" "}
      {red}
      <div className="next">
        Next player is:{" "}
        <ReactCSSTransitionGroup
          transitionName="flip"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          <Piece key={turn} piece={turn} />
        </ReactCSSTransitionGroup>
      </div>
    </div>
  );
};
