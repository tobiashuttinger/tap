if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceworker.js');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', handleTapClick);
    document.addEventListener('keydown', handleTapClick);
});

let lastTapTime = 0;
let currentTapDelta = 0;
let currentTapDeltaAverage = 0;
let currentBpm = 0;
let totalTaps = 0;
let firstStart = true;

const minuteMillis = 60000;

function handleTapClick() { 
    
    if (firstStart) {
        document.getElementById('tapnotice').classList.add('hidden');
        firstStart = false;
    }

    if ((Date.now() - lastTapTime) > 6000) {
        lastTapTime = 0;
        currentTapDelta = 0;
        currentTapDeltaAverage = 0;
        currentBpm = 0;
        totalTaps = 0;
    }
    
    if (totalTaps > 0) {
        currentTapDelta = Date.now() - lastTapTime;
    } 
    
    lastTapTime = Date.now();

    currentTapDeltaAverage = average(currentTapDelta, currentTapDeltaAverage);
    currentBpm = (minuteMillis/currentTapDeltaAverage).toFixed(2);
    document.getElementById('bpmcount').innerHTML = currentBpm;

    totalTaps++;

}

function average(a, b) {
    return ((a*1 + b*1)/2);
}