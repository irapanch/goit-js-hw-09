import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),
  field: document.querySelector('.field'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.addEventListener('click', onStartClick);

refs.start.setAttribute('disabled', '');
// refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), //встановлює поточну дату в інпут
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future', {
        buttonBackground: '#242424',
      });
      // refs.start.setAttribute('disabled', "");
      refs.start.disabled = true;
    } else {
      refs.start.classList.add('button');
      // refs.start.removeAttribute('disabled');
      refs.start.disabled = false;
      Notify.success('Are you ready? Click to start!');
    }
  },
};

flatpickr(refs.inputData, options);

let isActive = false;
function render({ days, hours, minutes, seconds }) {
  refs.days.textContent = days.toString().padStart(2, '0');
  refs.hours.textContent = hours.toString().padStart(2, '0');
  refs.minutes.textContent = minutes.toString().padStart(2, '0');
  refs.seconds.textContent = seconds.toString().padStart(2, '0');
}

function onStartClick() {
  // refs.start.setAttribute('disabled', "");
  refs.start.disabled = true;
  if (isActive) {
    Notify.warning('Wait until the timer ends and try again');
    return;
  }
  const interval = setInterval(() => {
    isActive = true;
    const dateToday = Date.now();

    const diff = new Date(refs.inputData.value) - dateToday;
    if (diff >= 0) {
      const resTime = convertMs(diff);
      render(resTime);
    } else {
      clearInterval(interval);
      Notify.success('The end. Try again!');
      setTimeout(function () {
        location.reload();
      }, 3000);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
