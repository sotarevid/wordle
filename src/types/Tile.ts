export enum TileStatus {
    Unchecked,
    Wrong,
    Partial,
    Correct
}

export type Tile = {
    letter: string;
    status: TileStatus;
}