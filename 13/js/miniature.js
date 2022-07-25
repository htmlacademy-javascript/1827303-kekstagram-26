import { openModalWindow } from './big-photo.js';
import { getInvsibleComment, countvisibleComment, getVisibleComment } from './comment.js';

const simylarListElement = document.querySelector('.pictures');
const simylarPhotoTempalate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// const similarPhoto = simylarData();
const miniatureList = document.createDocumentFragment();

// Создание миниатюры
const renderSimilarList = (similarPhoto) => {
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
};

export {renderSimilarList};
