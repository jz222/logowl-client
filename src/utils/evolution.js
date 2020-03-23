const computeEvolution = (data) => {
    const format = (key) => ({ day: key, count: data[key] });
    const ascending = (a, b) => a.day - b.day;
    
    const evolution = Object.keys(data).map(format).sort(ascending);
    const reducedEvolution = evolution.slice(Math.max(evolution.length - 15, 0));
    const largest = reducedEvolution.reduce((a, c) => c.count > a ? c.count : a, 0);
    
    const latestCount = (reducedEvolution[reducedEvolution.length - 1] || {}).count;
    const previousCount = (reducedEvolution[reducedEvolution.length - 2] || {}).count;
    
    const difference = Math.floor(((latestCount - previousCount) / previousCount * 100) || 0);
    
    return { evolution: reducedEvolution, largest, difference };
};

export default computeEvolution;