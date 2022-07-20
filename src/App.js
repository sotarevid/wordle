import { useState } from 'react';
import Alert from './components/Alert';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { generateWord, generateMatrix, checkRow, isWordAllowed } from './scripts/GameLogic';


const App = () => {
    const [word, setWord] = useState(generateWord());
    const [matrix, setMatrix] = useState(generateMatrix(6, 5));
    const [currentRow, setRow] = useState(0);
    const [currentColumn, setColumn] = useState(0);

    const [letters, setLetters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').reduce((a, v) => ({ ...a, [v]: undefined })));

    const [isGameOver, setIsGameOver] = useState(false);

    const [winAlertHidden, setWinAlertHidden] = useState(true);
    const winAlert = <Alert hidden={winAlertHidden}>Congratulations, you got it!</Alert>
    const [loseAlertHidden, setLoseAlertHidden] = useState(true);
    const loseAlert = <Alert hidden={loseAlertHidden}>{`Nice try! The word was "${word}".`}</Alert>
    const [wordAlertHidden, setWordAlertHidden] = useState(true);
    const wordAlert = <Alert hidden={wordAlertHidden}>This word is not in the words list!</Alert>

    const handleGameOver = (win) => {
        setIsGameOver(true);

        showGameOverAlert(win);
    }

    const showGameOverAlert = (win) => {
        if (win) {
            setWinAlertHidden(false);

            setTimeout(() => setWinAlertHidden(true), 2500);
        } else {
            setLoseAlertHidden(false);

            setTimeout(() => setLoseAlertHidden(true), 2500);
        }
    }

    const showWordAlert = () => {
        setWordAlertHidden(false);

        setTimeout(() => setWordAlertHidden(true), 1000);
    }

    const reset = () => {
        setWord(generateWord());
        setMatrix(generateMatrix(6, 5));
        setIsGameOver(false);
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
                    showWordAlert();
                    return;
                }

                let rowCheckResult = checkRow(matrix[currentRow], word);
                matrix[currentRow] = rowCheckResult.row;
                let newLetters = { ...letters }
                rowCheckResult.row.forEach(e => {
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
            {winAlert}
            {loseAlert}
            {wordAlert}
            <Keyboard keyHandler={handleKeyDown} letters={letters} />
            <button className={`bg-correct border-2 border-[#464f51] rounded h-10 font-medium px-4 mx-1 my-1 ${isGameOver ? "" : "hidden"}`} onClick={reset}>Play again</button>
        </div >
    );
}

export default App;
