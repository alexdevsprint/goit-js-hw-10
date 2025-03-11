import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const sumbmitForm = document.querySelector('.form');

sumbmitForm.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  console.log('hello');
}
