export type Stats = Record<string | number, number>

export const getStatsFromLocalStorage: () => Stats = () => {
    let stats = localStorage.getItem("stats");
    if (stats === null)
        return generateStats();

    return JSON.parse(stats);
}

export const saveStatsToLocalStorage = (stats: Stats) => {
    localStorage.setItem("stats", JSON.stringify(stats));
}

export const generateStats: () => Stats = () => {
    return {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        "Loss": 0
    }
}