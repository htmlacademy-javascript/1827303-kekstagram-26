import { simylarData } from './data.js';
import { openModalWindow } from './big-photo.js';

const simylarListElement = document.querySelector('.pictures');
const simylarPhotoTempalate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhoto = simylarData();

const miniatureList = document.createDocumentFragment();

const buttonLoadComment = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments').children;
const commentVisible = document.querySelector('.comments-visible');

function getInvsibleComment() {
  for (let i = 0; i <= commentList.length; i++) {

    if (commentList.length > 5) {
      for (let j = 5; j <= commentList.length; j++) {
        if (commentList[j]) {
          commentList[j].classList.add('hidden');
        }
      }
    }

    if (commentList.length <= 5) {
      buttonLoadComment.classList.add('hidden');
    }

    if (commentList.length > 5) {
      buttonLoadComment.classList.remove('hidden');
    }
  }
}

function countvisibleComment() {
  let invisibleNumber = 0;

  for (let i = 0; i <= commentList.length; i++) {
    if (commentList[i]) {
      if (commentList[i].classList.contains('hidden')) {
        invisibleNumber++;
      }
    }
  }

  commentVisible.textContent = commentList.length - invisibleNumber;
}

function getVisibleComment() {
  buttonLoadComment.addEventListener('click', () => {

    for (let i = 0; i <= commentList.length; i++) {
      if (commentList[i]) {
        commentList[i].classList.remove('hidden');
      }
    }

    commentVisible.textContent = commentList.length;

    let visibleNumber = parseInt(commentVisible.textContent, 10);

    if (visibleNumber === commentList.length) {
      buttonLoadComment.classList.add('hidden');
    }
  });
}

function createSimilarPhoto({ url, likes, comments, description }) {
  const simylarElement = simylarPhotoTempalate.cloneNode(true);
  simylarElement.querySelector('.picture__img').src = url;
  simylarElement.querySelector('.picture__likes').textContent = likes;
  simylarElement.querySelector('.picture__comments').textContent = comments.length;

  simylarElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openModalWindow(url, likes, comments, description);
    getInvsibleComment();
    countvisibleComment();
    getVisibleComment();
  });

  miniatureList.appendChild(simylarElement);
}

similarPhoto.forEach(createSimilarPhoto);

simylarListElement.appendChild(miniatureList);
