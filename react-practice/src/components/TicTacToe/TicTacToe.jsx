import React, { useState } from 'react';
import './TicTacToe.css'; // 👈 CSS file yahan include ho gayi!

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const checkWinner = (squares) => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  return (
    <div className="game-container">
      <h1 className="heading">Tic-Tac-Toe</h1>
      
      <div className="status">
        {winner ? (
          <span className="text-winner">Winner is: {winner} 🎉</span>
        ) : isDraw ? (
          <span className="text-draw">Game Draw! 🤝</span>
        ) : (
          <span>Next Player: <b>{isXTurn ? "X" : "O"}</b></span>
        )}
      </div>

      <div className="board">
        {board.map((cell, index) => (
          <button 
            key={index} 
            className="cell" 
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
}