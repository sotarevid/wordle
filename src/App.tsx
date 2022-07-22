import React from 'react'
import { useState } from 'react';
import Alert from './components/Alert';
import GameOverCard from './components/GameOverCard';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { generateWord, generateMatrix, checkRow, isWordAllowed } from './scripts/GameLogic';
import { getStatsFromLocalStorage, saveStatsToLocalStorage, Stats } from './types/Stats';
import { TileStatus } from './types/Tile';

const getKeyboardLetters: () => Record<string, TileStatus> = () => {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split('')
        .map(l => ({ letter: l, status: undefined }))
        .reduce((obj, l) => ({ ...obj, [l.letter]: l.status }), {});
}

const App = () => {
    const [word, setWord] = useState(generateWord());
    const [matrix, setMatrix] = useState(generateMatrix(6, 5));
    const [currentRow, setRow] = useState(0);
    const [currentColumn, setColumn] = useState(0);

    const [letters, setLetters] = useState(getKeyboardLetters());
    const [stats, setStats] = useState(getStatsFromLocalStorage());

    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    const [gameOverCardHidden, setGameOverCardHidden] = useState(true);
    const [wordAlertHidden, setWordAlertHidden] = useState(true);

    const handleGameOver = (win: boolean) => {
        let newStats: Stats = { ...stats };
        if (win)
            newStats[currentRow + 1] += 1;
        else
            newStats["Loss"] += 1;
        setStats(newStats);
        saveStatsToLocalStorage(newStats);

        setIsGameOver(true);
        setIsGameWon(win);

        setTimeout(() => showGameOverCard(), 1150);
    }

    const showGameOverCard = () => {
        setGameOverCardHidden(false);
    }

    const showWordAlert = () => {
        setWordAlertHidden(false);

        setTimeout(() => setWordAlertHidden(true), 1000);
    }

    const reset = () => {
        setWord(generateWord());
        setMatrix(generateMatrix(6, 5));
        setLetters(getKeyboardLetters());
        setIsGameOver(false);
        setIsGameWon(false);
        setGameOverCardHidden(true);
        setColumn(0);
        setRow(0);

        document.getElementById('game')?.focus();
    }

    const handleKeyDown = (e: { key: string }) => {
        if (isGameOver)
            return;

        if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
            if (currentColumn <= 4) {
                matrix[currentRow][currentColumn].letter = e.key.toUpperCase();
                setColumn(currentColumn + 1);
            }
        }

        if (e.key === "Enter")
            if (currentColumn === 5) {
                if (!isWordAllowed(matrix[currentRow])) {
                    showWordAlert();
                    return;
                }

                let rowCheckResult = checkRow(matrix[currentRow], word);
                matrix[currentRow] = rowCheckResult.row;
                let newLetters = { ...letters }
                rowCheckResult.row.forEach(e => {
                    if (newLetters[e.letter] < e.status)
                        newLetters[e.letter] = e.status;
                });
                setLetters(newLetters);

                if (rowCheckResult.win) {
                    handleGameOver(true);
                }
                else if (currentRow === 5) {
                    handleGameOver(false);
                }

                setColumn(0);
                setRow(currentRow + 1);
            }

        if (e.key === "Backspace") {
            if (currentColumn === 0)
                matrix[currentRow][currentColumn].letter = "";
            else if (currentColumn <= 5)
                matrix[currentRow][currentColumn - 1].letter = "";
            if (currentColumn !== 0)
                setColumn(currentColumn - 1);
        }
    }

    return (
        <div id="game" className="py-4 px-2 flex flex-col gap-2 items-center h-screen w-screen outline-none" onKeyDown={handleKeyDown} tabIndex={-1}>
            <GameBoard matrix={matrix} />
            <Alert hidden={wordAlertHidden}>This word is not in the words list!</Alert>
            <GameOverCard stats={stats} resetHandler={reset} win={isGameWon} word={word} hidden={gameOverCardHidden} tries={currentRow} />
            <Keyboard keyHandler={handleKeyDown} letters={letters} />
        </div>
    );
}

export default App;
