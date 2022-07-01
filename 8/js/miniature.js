import {simylarData} from './data.js';

const simylarListElement = document.querySelector('.pictures');
const simylarPhotoTempalate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const modalWindow = document.querySelector('.big-picture');
const bigPhoto = document.querySelector('.big-picture__img');
const commentCount = document.querySelector('.comments-count');
const likesCount = document.querySelector('.likes-count');

function openModalWindow () {
  const likesCounter = document.querySelector('.social__comment-count');
  likesCounter.classList.add('hidden');

  const uploadComment = document.querySelector('.comments-loader');
  uploadComment.classList.add('hidden');

  const tegBody = document.querySelector('body');
  tegBody.classList.add('modal-open');
}

const simylarPhoto = simylarData();

const miniatureList = document.createDocumentFragment();

simylarPhoto.forEach(({url, likes, comments}) => {
  const simylarElement = simylarPhotoTempalate.cloneNode(true);
  simylarElement.querySelector('.picture__img').src = url;
  simylarElement.querySelector('.picture__likes').textContent = likes;
  simylarElement.querySelector('.picture__comments').textContent = comments.length;

  simylarElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    modalWindow.classList.remove('hidden');
    bigPhoto.children[0].src = url;
    commentCount.textContent = comments.length;
    likesCount.textContent = likes;
    openModalWindow();
  });

  miniatureList.appendChild(simylarElement);
});

simylarListElement.appendChild(miniatureList);
