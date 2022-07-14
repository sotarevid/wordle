import React from 'react'
import GameRow from './GameRow';

const RenderBoard = (matrix) => {
    let result = [];

    for (let i = 0; i < matrix.length; i++) {
        result.push(
            <li key={i}>
                <GameRow line={matrix[i]} />
            </li>
        );
    }

    return result;
}

const GameBoard = ({ matrix }) => {
    let board = RenderBoard(matrix);

    return (
        <div className="z-0">
            <ul className="list-none pl-0">
                {board}
            </ul>
        </div>
    )
}

export default GameBoard