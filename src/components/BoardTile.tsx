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

type BoardTileProps = {
    tile: Tile;
}

const BoardTile = ({ tile }: BoardTileProps) => {
    return (
        <div className={`flex justify-center border-2 h-12 w-12 rounded-lg transition-bg duration-1200 ${getBorderColor(tile.letter, tile.status)} ${getBackgroundColor(tile.status)}`}>
            <span className="absolute text-4xl font-medium">
                {tile.letter}
            </span>
        </div>
    )
}

export default BoardTile