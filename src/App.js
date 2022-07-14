import { useState } from 'react';
import Alert from './components/Alert';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Warning from './components/Warning';
import { generateWord, generateMatrix, checkRow, checkWin, isWordAllowed } from './scripts/GameLogic';


const App = () => {
    const [word, setWord] = useState(generateWord());
    const [matrix, setMatrix] = useState(generateMatrix(6, 5));
    const [currentRow, setRow] = useState(0);
    const [currentColumn, setColumn] = useState(0);

    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);

    const [alertHidden, setAlertHidden] = useState(true);
    const [warningHidden, setWarningHidden] = useState(true);

    const showAlert = (win) => {
        setIsGameOver(true);
        setIsGameWon(win);
        setAlertHidden(false);

        setTimeout(() => setAlertHidden(true), 2500);
    }

    const showWarning = () => {
        setWarningHidden(false);

        setTimeout(() => setWarningHidden(true), 1000);
    }

    const reset = () => {
        setWord(generateWord());
        setMatrix(generateMatrix(6, 5));
        setIsGameOver(false);
        setIsGameWon(false);
        setColumn(0);
        setRow(0);
    }

    const handleKeyDown = (e) => {
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
                    showWarning();
                    return;
                }

                matrix[currentRow] = checkRow(matrix[currentRow], word);

                if (checkWin(matrix[currentRow])) {
                    showAlert(true);
                }

                if (currentRow === 5) {
                    showAlert(false);
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
        <div id="game" className="py-4 px-2 flex flex-col items-center h-screen w-screen outline-none" onKeyDown={handleKeyDown} tabIndex={-1}>
            <GameBoard matrix={matrix} />
            <Alert hidden={alertHidden} win={isGameWon} word={word} />
            <Warning hidden={warningHidden} />
            <Keyboard keyHandler={handleKeyDown} />
            <button className={`bg-correct border-2 border-[#464f51] rounded h-10 font-medium px-4 mx-1 my-1 ${isGameOver ? "" : "hidden"}`} onClick={reset}>Play again</button>
        </div >
    );
}

export default App;
