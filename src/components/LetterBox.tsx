import React from 'react'
import { Tile, TileStatus } from '../types/Tile'

const getBorderColor = (letter: string, status: TileStatus) => {
    return status === TileStatus.Unchecked
        ? letter
            ? "border-letter"
            : "border-empty "
        : "border-dark"
}

const getBackgroundColor = (status: TileStatus) => {
    if (status === TileStatus.Wrong)
        return "bg-wrong"
    if (status === TileStatus.Partial)
        return "bg-partial"
    if (status === TileStatus.Correct)
        return "bg-correct"
    return "bg-white"
}

type LetterBoxProps = {
    letter: Tile;
}

const LetterBox = ({ letter }: LetterBoxProps) => {
    return (
        <div className={`flex justify-center border-2 h-12 w-12 rounded-lg transition-bg duration-1200 ${getBorderColor(letter.letter, letter.status)} ${getBackgroundColor(letter.status)}`}>
            <span className="absolute text-4xl font-medium">
                {letter.letter}
            </span>
        </div>
    )
}

export default LetterBox