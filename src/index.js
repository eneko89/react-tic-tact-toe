import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  return (
    <div>
      <div className="board-row">
        <Square value={props.squares[0]} onClick={() => props.onClick(0)} />
        <Square value={props.squares[1]} onClick={() => props.onClick(1)} />
        <Square value={props.squares[2]} onClick={() => props.onClick(2)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onClick={() => props.onClick(3)} />
        <Square value={props.squares[4]} onClick={() => props.onClick(4)} />
        <Square value={props.squares[5]} onClick={() => props.onClick(5)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onClick={() => props.onClick(6)} />
        <Square value={props.squares[7]} onClick={() => props.onClick(7)} />
        <Square value={props.squares[8]} onClick={() => props.onClick(8)} />
      </div>
    </div>
  );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      turn: 'X',
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);;
    const current = history[history.length - 1];

    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    const next = { squares: current.squares.slice() };
    next.squares[i] = this.state.turn;
    this.setState({
      history: history.concat(next),
      stepNumber: history.length,
      turn: (history.length % 2) === 0 ? 'X' : 'O'
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      turn: (step % 2) === 0 ? 'X' : 'O'
    });
  }

  render() {
    let status;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.turn);
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            turn={this.props.turn}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
