export const getStatsFromLocalStorage = () => {
    let stats = localStorage.getItem("stats");
    if (stats === null)
        return generateStats();

    return JSON.parse(stats);
}

export const saveStatsToLocalStorage = (stats) => {
    localStorage.setItem("stats", JSON.stringify(stats));
}

export const generateStats = () => {
    let result = {};
    for (let i = 1; i <= 6; i++) {
        result[i] = 0;
    }
    result["loss"] = 0;

    return result;
}