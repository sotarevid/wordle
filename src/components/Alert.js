import React from 'react'

const Alert = ({ hidden, win, word }) => {
    return (
        <span className={`py-4 px-8 bg-white rounded-lg border-2 border-dark self-center absolute translate-y-48 opacity-${hidden ? 0 : 100} z-10 transition-opacity duration-700`}>
            {win ? "Congratulations, you got it!" : `Nice try! The word was "${word}".`}
        </span>
    )
}

export default Alert