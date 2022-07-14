import { AllowedGuessesList } from "./AllowedGuessesList";
import { GetWordList } from "./WordList"

const generateWord = () => {
    let list = GetWordList()
    return list[Math.floor(Math.random() * list.length)].toUpperCase();
}

const generateMatrix = (rows, columns) => {
    let result = [];

    for (let i = 0; i < rows; i++) {
        let line = []

        for (let j = 0; j < columns; j++)
            line.push({ letter: "", status: "unchecked" })

        result.push(line);
    }

    return result;
}

const isWordAllowed = (word) => {
    return AllowedGuessesList().indexOf(word.map(e => e.letter).join("").toLowerCase()) > -1;
}

const checkRow = (actual, expected) => {
    let result = [];
    let expectedCopy = [...expected]

    let actualIndex = 0;
    let expectedIndex = 0;
    while (actualIndex < actual.length && expectedIndex < expectedCopy.length) {
        if (actual[actualIndex].letter === expectedCopy[expectedIndex]) {
            result[actualIndex] = { letter: actual[actualIndex].letter, status: "correct" }
            expectedCopy = expectedCopy.slice(0, expectedIndex).concat(expectedCopy.slice(expectedIndex + 1))
        } else {
            expectedIndex++;
        }
        actualIndex++;
    }

    actualIndex = 0;
    expectedIndex = 0;
    while (actualIndex < actual.length || expectedIndex < expectedCopy.length) {
        let index = expectedCopy.indexOf(actual[actualIndex].letter);
        if (index > -1) {
            result[actualIndex] = { letter: actual[actualIndex].letter, status: "partial" }
            expectedCopy = expectedCopy.slice(0, index).concat(expectedCopy.slice(index + 1))
        } else {
            if (result[actualIndex] === undefined)
                result[actualIndex] = { letter: actual[actualIndex].letter, status: "wrong" }

            expectedIndex++;
        }
        actualIndex++;
    }

    return result;
}

const checkWin = (actual) => {
    for (let i = 0; i < actual.length; i++)
        if (actual[i].status !== "correct")
            return false;

    return true;
}

export { generateWord, generateMatrix, checkRow, checkWin, isWordAllowed };