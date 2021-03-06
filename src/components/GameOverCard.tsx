import React from 'react'
import { Stats } from '../types/Stats';

type GameOverCardProps = {
    stats: Stats;
    resetHandler: () => void;
    hidden: boolean;
    win: boolean;
    tries: number;
    word: string;
}

const GameOverCard = ({ stats, resetHandler, hidden, win, tries, word }: GameOverCardProps) => {
    const findMax = (stats: Stats) => {
        let values = Object.values(stats)
        return Math.max(...values);
    }

    let max = findMax(stats);

    return (
        <div className={`flex flex-col w-72 md:w-80 h-96 py-4 px-4 bg-white rounded-lg border-2 shadow-md shadow-dark border-dark absolute translate-y-20 ${hidden ? "-z-10" : "z-10"} z-10 ${hidden ? "opacity-0" : "opacity-100"}`}>
            <div className="flex-none text-center">

                <h1 className="text-lg">{win ? "Congratulations!" : "Nice try!"}</h1>
                <p className="text-gray-500">
                    {
                        win
                            ? `You guessed the word in ${tries} ${tries > 1 ? "steps." : "step!"}`
                            : `The word was ${word}`
                    }
                </p>
            </div>
            <div className="flex flex-col gap-0.5 place-content-center flex-1">
                {
                    Object.keys(stats).map(key =>
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
            </div>
            <div className="flex-none text-center">
                <button className={`bg-correct border-2 w-10/12 border-dark rounded font-medium py-2`} onClick={resetHandler}>Play again</button>
            </div>
        </div>
    )
}

export default GameOverCard