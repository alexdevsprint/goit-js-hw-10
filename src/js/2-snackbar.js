import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const sumbmitForm = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stateInputs = document.querySelectorAll('input[name="state"]');

sumbmitForm.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const delay = Number(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadio.value === 'fulfilled') {
        resolve(delay);
      } else if (selectedRadio.value === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      console.log(`Fulfilled ${value}`);
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${value}ms`,
        icon: false
      });
    })
    .catch(value => {
      console.log(`Rejected ${value}`);
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${value}ms`,
        icon: false
      });
    });
}
