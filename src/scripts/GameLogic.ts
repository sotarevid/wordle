import { Tile, TileStatus } from "../types/Tile";
import { AllowedWordList } from "./AllowedWordList";
import { TargetWordList } from "./TargetWordList"

const generateWord = () => {
    let list = TargetWordList()
    return list[Math.floor(Math.random() * list.length)].toUpperCase();
}

const generateMatrix = (rows: number, columns: number) => {
    let result: Tile[][] = []

    for (let i = 0; i < rows; i++) {
        let line = []

        for (let j = 0; j < columns; j++)
            line.push({ letter: "", status: TileStatus.Unchecked })

        result.push(line);
    }

    return result;
}

const isWordAllowed = (word: Tile[]) => {
    return AllowedWordList().indexOf(word.map(e => e.letter).join("").toLowerCase()) > -1;
}

const checkRow = (actual: Tile[], expected: string) => {
    let result: Tile[] = [];
    let expectedCopy = [...expected]

    let actualIndex = 0;
    let expectedIndex = 0;
    while (actualIndex < actual.length && expectedIndex < expectedCopy.length) {
        if (actual[actualIndex].letter === expectedCopy[expectedIndex]) {
            result[actualIndex] = { letter: actual[actualIndex].letter, status: TileStatus.Correct }
            expectedCopy = expectedCopy.slice(0, expectedIndex).concat(expectedCopy.slice(expectedIndex + 1))
        } else {
            expectedIndex++;
        }
        actualIndex++;
    }

    if (expectedCopy.length === 0)
        return { row: result, win: true }

    actualIndex = 0;
    while (actualIndex < actual.length) {
        let index = expectedCopy.indexOf(actual[actualIndex].letter);
        if (index > -1) {
            if (result[actualIndex] === undefined) {
                result[actualIndex] = { letter: actual[actualIndex].letter, status: TileStatus.Partial }
                expectedCopy = expectedCopy.slice(0, index).concat(expectedCopy.slice(index + 1))
            }
        } else {
            if (result[actualIndex] === undefined)
                result[actualIndex] = { letter: actual[actualIndex].letter, status: TileStatus.Wrong }
        }
        actualIndex++;
    }

    return { row: result, win: false };
}


export { generateWord, generateMatrix, checkRow, isWordAllowed };