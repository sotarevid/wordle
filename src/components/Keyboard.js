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

    const renderKeyboard = (letters) => {
        let result = []

        for (let i = 0; i < keyboard.length; i++) {
            result.push(
                <div key={i} className="">
                    {keyboard[i].split("").map(e =>
                        <button key={e} className={`rounded border-2 border-empty w-7 h-8 md:w-10 md:h-10 ${getBackgroundColor(letters[e])} font-medium mx-0.5 my-0.5`} onClick={() => keyHandler({ key: e })}>
                            {e}
                        </button>
                    )}
                </div>
            )
        }

        result.push(
            <div key={3} className="d-flex justify-content-center">
                <button key={"Backspace"} className="rounded h-10 border-2 border-empty bg-white font-medium px-4 mx-1 my-1" onClick={() => keyHandler({ key: "Backspace" })}>
                    {"Backspace"}
                </button>
                <button key={"Enter"} className="rounded h-10 border-2 border-empty bg-white font-medium px-4 mx-1 my-1" onClick={() => keyHandler({ key: "Enter" })}>
                    {"Enter"}
                </button>
            </div>
        )

        return result;
    }

    return (
        <div className="flex flex-col items-center">
            {renderKeyboard(letters)}
        </div>
    )
}

export default Keyboard