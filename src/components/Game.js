import React, { Component } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import Button from "./Button";
const SIZE = 8;
const MIDDLE1 = SIZE / 2;
const MIDDLE2 = SIZE / 2 - 1;
export const PLAYER_BLUE = -1;
export const PLAYER_RED = 1;

export default class Game extends Component {
  constructor() {
    super();
    let currentPlayer = PLAYER_RED;
    let board = this.initBoard(currentPlayer);
    this.state = {
      board,
      currentPlayer,
      score: { blue: 2, red: 2 },
      gameOver: false
    };
  }

  initBoard = player => {
    let board = [];
    for (var row = 0; row < SIZE; row++) {
      board[row] = [];
      for (var col = 0; col < SIZE; col++) {
        board[row][col] = { moves: [], value: 0 };
      }
    }
    board[MIDDLE1][MIDDLE2].value = board[MIDDLE2][MIDDLE1].value = PLAYER_BLUE;
    board[MIDDLE2][MIDDLE2].value = board[MIDDLE1][MIDDLE1].value = PLAYER_RED;
    return this.scanNextMoves(board, player);
  };

  scanNextMoves = (board, player) => {
    for (let row = 0; row < SIZE; row++) {
      for (let column = 0; column < SIZE; column++) {
        board[row][column].moves = this.findFlips(row, column, board, player);
      }
    }
    return board;
  };

  getUpdatedScore = (changes, score, currentPlayer) => {
    return {
      blue:
        currentPlayer === PLAYER_BLUE
          ? score.blue + changes
          : score.blue - changes + 1,
      red:
        currentPlayer === PLAYER_RED
          ? score.red + changes
          : score.red - changes + 1
    };
  };

  positionInBoard = ({ r, c }) => {
    if (r < 0 || r === SIZE || c < 0 || c === SIZE) {
      return false;
    }
    return true;
  };

  updateGame = (flips, updateScore = true) => {
    this.setState(prevState => {
      let nextPlayer = prevState.currentPlayer * -1;
      let updatedBoard = this.getUpdatedBoard(
        flips,
        prevState.currentPlayer,
        prevState.board
      );
      updatedBoard = this.scanNextMoves(updatedBoard, nextPlayer);

      let updatedScore = updateScore
        ? this.getUpdatedScore(
            flips.length,
            prevState.score,
            prevState.currentPlayer
          )
        : prevState.score;

      let gameOver = updatedScore.blue + updatedScore.red === SIZE * SIZE;
      let newState = {
        board: updatedBoard,
        currentPlayer: nextPlayer,
        score: updatedScore,
        gameOver
      };
      return newState;
    });
  };

  getUpdatedBoard = (changes, player, board) => {
    var newBoard = board.map(row => {
      return row.slice();
    });
    changes.forEach(({ r, c }) => {
      newBoard[r][c].value = player;
    });
    return newBoard;
  };

  findFlips = (row, column, board, player) => {
    //for each direction
    let directions = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1]
    ];
    return directions.reduce((flips, direction) => {
      flips.push(
        ...this.findFlipsForDirection(row, column, direction, board, player)
      );
      return flips;
    }, []);
  };

  findFlipsForDirection = (row, column, [rChange, cChange], board, player) => {
    let flips = [];
    let position = { r: row, c: column };
    while (true) {
      position.r = position.r + rChange;
      position.c = position.c + cChange;
      if (
        !this.positionInBoard(position) ||
        !board[position.r][position.c].value
      ) {
        flips = [];
        break;
      }
      if (board[position.r][position.c].value === player) {
        break;
      }
      if (board[position.r][position.c].value === player * -1) {
        flips.push({ ...position });
      }
    }
    return flips;
  };

  handleMove = (row, column) => {
    let flips = this.state.board[row][column].moves;
    if (flips.length) {
      flips.push({ r: row, c: column });
      this.updateGame(flips);
    }
  };

  skipTurn = () => {
    this.updateGame([], false);
  };

  render() {
    console.log("score", this.state.score);
    return (
      <div className="game">
        <GameStatus
          score={this.state.score}
          gameOver={this.state.gameOver}
          turn={this.state.currentPlayer}
        />
        <Button label="Skip Turn" handleClick={this.skipTurn} />
        {this.state.board && (
          <Board board={this.state.board} handleMove={this.handleMove} />
        )}
      </div>
    );
  }
}
