import React from 'react'
import Board from './Board'

function caclulateWinner(squares) {
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
            // return squares[a];
            return { winner: squares[a], winnerRow: lines[i] };
        }
    }
    // return null;
    return { winner: null, winnerRow: null };
}

const getLocation = (move) => {
    const locationMap = {
      0: 'col: 1, row: 1',
      1: 'col: 2, row: 1',
      2: 'col: 3, row: 1',
      3: 'col: 1, row: 2',
      4: 'col: 2, row: 2',
      5: 'col: 3, row: 2',
      6: 'col: 1, row: 3',
      7: 'col: 2, row: 3',
      8: 'col: 3, row: 3',
    };
  
    return locationMap[move];
};


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            isReversed: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (caclulateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                currentLocation: getLocation(i),
                symbol: this.state.xIsNext ? 'X' : 'O',
            }]),
            
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    sortMoves() {
        this.setState({
          history: this.state.history.reverse(),
          isReversed: !this.state.isReversed,
        });
      }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const {winner, winnerRow} = caclulateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
            const currentLocation = step.currentLocation ?
                step.symbol + " at " + step.currentLocation + " " :
                'Start ';
            const currentMove = this.state.stepNumber === move;
            return (
              <li key={move}>
                {currentMove 
                ? <strong>{currentLocation}</strong> 
                : <div>{currentLocation}<button onClick={() => this.jumpTo(move)}>{desc}</button></div> }
              </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (history.length === 10) {
            status = 'Draw. No moves left.';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winnerSquares={winnerRow}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    {/* <button className="button" onClick={() => this.sortMoves()}>
                        Sort moves
                    </button> */}
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;