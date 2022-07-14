import LetterBox from './LetterBox'

const renderRow = (letters) => {
    let result = [];

    for (let i = 0; i < letters.length; i++) {
        result.push(
            <li key={i} style={{ display: "inline-flex", padding: "0.5rem" }}>
                <LetterBox letter={letters[i]} />
            </li>
        )
    }

    return result;
}

const GameRow = ({ line }) => {
    return (
        <ul className="d-flex align-items-center justify-content-center" style={{ paddingLeft: "0px" }}>
            {renderRow(line)}
        </ul>
    )
}

export default GameRow