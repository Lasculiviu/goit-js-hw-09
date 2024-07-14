function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}


const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.body;

let colorInterval = null;



function startColorChange() {
    startButton.disabled = true;
    stopButton.disabled = false;

    colorInterval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}


function stopColorChange() {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(colorInterval);
}
{}

startButton.addEventListener('click', startColorChange);
stopButton.addEventListener('click', stopColorChange);
