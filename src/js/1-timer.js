import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const dateTimePicker = document.querySelector('input#datetime-picker');
const dateTimeBtn = document.querySelector('button[data-start]');

const dateTimeElements = document.querySelectorAll('.value');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      userSelectedDate = selectedDates[0];
      dateTimeBtn.disabled = false;
    } else {
      dateTimeBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    }
  },
};

flatpickr(dateTimePicker, options);

dateTimeBtn.addEventListener('click', setTimer);

function setTimer() {
  dateTimePicker.disabled = true;
  dateTimeBtn.disabled = true;
  let intervalDate = userSelectedDate - new Date();

  let intervalId = setInterval(() => {
    const timeObj = convertMs(intervalDate);
    const timeArr = [
      timeObj.days,
      timeObj.hours,
      timeObj.minutes,
      timeObj.seconds,
    ];

    intervalDate = intervalDate - 1000;

    dateTimeElements.forEach((element, index) => {
      if (timeArr[index] < 10) {
        element.textContent = `0${timeArr[index]}`;
      } else {
        element.textContent = timeArr[index];
      }
    });

    if (intervalDate < 0) {
      clearInterval(intervalId);
      console.log('stop');
      dateTimePicker.disabled = false;
      dateTimeBtn.disabled = false;

      iziToast.warning({
        title: 'Attention',
        message: 'Time is up!',
      });
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
