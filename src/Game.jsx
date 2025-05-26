// src/Game.jsx
import { useState } from 'react';
import Board from './components/Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]             // diagonais
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const currentPlayer = xIsNext ? 'X' : 'O';

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <h2>{winner ? `Vencedor: ${winner}` : `Próximo jogador: ${currentPlayer}`}</h2>
      <Board squares={squares} onClick={handleClick} />
      {(winner || squares.every(Boolean)) && (
        <button id="reset-button" onClick={resetGame}>Reiniciar Jogo</button>
      )}
    </div>
  );
}
