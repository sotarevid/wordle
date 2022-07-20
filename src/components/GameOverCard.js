import React from 'react'

const GameOverCard = ({ stats, resetHandler, hidden, win, tries, word }) => {
    const renderStats = (stats) => {
        let values = Object.values(stats)
        let max = Math.max(...values);
        return Object.keys(stats).map(key =>
            <div key={key} className="flex flex-row">
                <strong className="mr-2" style={{ flex: "1" }}>{key}</strong>
                <div style={{ flex: "5" }}>
                    <div className={`bg-dark h-full text-center text-white`} style={{ width: `${stats[key] / max * 100}%` }}>
                        {stats[key]}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-col w-72 md:w-80 h-96 py-4 px-4 bg-white rounded-lg border-2 shadow-md shadow-dark border-dark absolute translate-y-20 z-10 ${hidden ? "opacity-0" : "opacity-100"} transition-opacity duration-150`}>
            <div className="flex-none text-center">

                <h1 className="text-lg">{win ? "Congratulations!" : "Nice try!"}</h1>
                <p className="text-gray-500">
                    {
                        win
                            ? `You solved the wordle in ${tries} steps.`
                            : `The word was ${word}`
                    }
                </p>
            </div>
            <div className="flex flex-col gap-0.5 place-content-center flex-1">
                {renderStats(stats)}
            </div>
            <div className="flex-none text-center">
                <button className={`bg-correct border-2 w-10/12 border-dark rounded font-medium py-2`} onClick={resetHandler}>Play again</button>
            </div>
        </div>
    )
}

export default GameOverCard