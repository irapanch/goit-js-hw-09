

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]')
};

refs.startBtn.addEventListener('click', onClick);
refs.stopBtn.addEventListener('click', onStopClick);

let intervalId;

function onClick() {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
    intervalId = setInterval(() => {
        const newColor = getRandomHexColor();
        document.body.style.backgroundColor = newColor;
    }, 1000); // інтервал 1сек
}
function onStopClick() {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
     refs.stopBtn.disabled = true;
}

// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.

// УВАГА
// Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів. Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).

// Для генерування випадкового кольору використовуй функцію getRandomHexColor.