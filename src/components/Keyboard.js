import React from 'react'

const Keyboard = ({ keyHandler }) => {
    const keyboard = [
        "QWERTYUIOP",
        "ASDFGHJKL",
        "ZXCVBNM"
    ]

    const renderKeyboard = () => {
        let result = []

        for (let i = 0; i < keyboard.length; i++) {
            result.push(
                <div key={i} className="">
                    {keyboard[i].split("").map(e =>
                        <button key={e} className="rounded w-6 h-8 md:w-10 md:h-10 text-white bg-dark font-medium mx-0.5 my-0.5" onClick={() => keyHandler({ key: e })}>
                            {e}
                        </button>
                    )}
                </div>
            )
        }

        result.push(
            <div key={3} className="d-flex justify-content-center">
                <button key={"Backspace"} className="rounded h-10 text-white bg-dark font-medium px-4 mx-1 my-1" onClick={() => keyHandler({ key: "Backspace" })}>
                    {"Backspace"}
                </button>
                <button key={"Enter"} className="rounded h-10 text-white bg-dark font-medium px-4 mx-1 my-1" onClick={() => keyHandler({ key: "Enter" })}>
                    {"Enter"}
                </button>
            </div>
        )

        return result;
    }

    return (
        <div className="contents">
            {renderKeyboard()}
        </div>
    )
}

export default Keyboard