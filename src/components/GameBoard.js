import React from 'react'
import LetterBox from './LetterBox';

const GameBoard = ({ matrix }) => {
    return (
        <div className="flex flex-col gap-2.5 md:gap-4 my-2">
            {
                matrix.map((row, rowIndex) =>
                    <div key={rowIndex} className="flex flex-row justify-center gap-2.5 md:gap-4">
                        {
                            row.map((tile, tileIndex) =>
                                <LetterBox key={tileIndex} letter={tile} />
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default GameBoard