import React from 'react'

const getBackgroundColor = (status) => {
    if (status === "wrong")
        return "bg-wrong"
    if (status === "partial")
        return "bg-partial"
    if (status === "correct")
        return "bg-correct"
    return "bg-white"
}

const Keyboard = ({ keyHandler, letters }) => {
    const keyboard = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ]

    return (
        <div className="flex flex-col items-center">
            {
                keyboard.map((row, rowIndex) =>
                    <div key={rowIndex} className="flex flex-row">
                        {
                            row.split("").map((letter, letterIndex) =>
                                <div key={letterIndex}>
                                    <button key={letter} className={`rounded border-2 border-empty w-7 h-8 md:w-10 md:h-10 ${getBackgroundColor(letters[letter])} font-medium mx-0.5 my-0.5`} onClick={() => keyHandler({ key: letter })}>
                                        {letter}
                                    </button>
                                </div>
                            )
                        }
                    </div>
                )
            }
            <div key={3}>
                <button key={"Backspace"} className="rounded h-10 border-2 border-empty bg-white font-medium px-4 mx-1 my-1" onClick={() => keyHandler({ key: "Backspace" })}>
                    {"Backspace"}
                </button>
                <button key={"Enter"} className="rounded h-10 border-2 border-empty bg-white font-medium px-4 mx-1 my-1" onClick={() => keyHandler({ key: "Enter" })}>
                    {"Enter"}
                </button>
            </div>
        </div>
    )
}

export default Keyboard