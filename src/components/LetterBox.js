import React from 'react'

const getBorderColor = (letter, status) => {
    return status === "unchecked"
        ? letter
            ? "border-letter"
            : "border-empty "
        : "border-dark"
}

const getBackgroundColor = (status) => {
    if (status === "wrong")
        return "bg-wrong"
    if (status === "partial")
        return "bg-partial"
    if (status === "correct")
        return "bg-correct"
    return "bg-white"
}

const LetterBox = ({ letter }) => {
    return (
        <div className={`flex justify-center border-2 h-12 w-12 rounded-lg transition-bg duration-1200 ${getBorderColor(letter.letter, letter.status)} ${getBackgroundColor(letter.status)}`}>
            <span className="absolute text-4xl font-medium">
                {letter.letter}
            </span>
        </div>
    )
}

export default LetterBox