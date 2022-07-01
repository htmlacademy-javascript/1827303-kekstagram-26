import {simylarData} from './data.js';

const modalWindow = document.querySelector('.big-picture');
const tegBody = document.querySelector('body');
const commentDescription = document.querySelector('.social__caption');

const buttonClose = document.querySelector('#picture-cancel');
buttonClose.addEventListener('click', () => {
  modalWindow.classList.add('hidden');
  tegBody.classList.remove('modal-open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modalWindow.classList.add('hidden');
  }
});

const commentList = document.querySelector('.social__comments');
const tempalteCommentItem = document.querySelector('#comment-item')
  .content
  .querySelector('.social__comment');

const simylarNewComment = simylarData();

const addCommentList = document.createDocumentFragment();

simylarNewComment.forEach(({comments, description}) => {
  const simylarComment = tempalteCommentItem.cloneNode(true);
  simylarComment.querySelector('.social__picture').src = comments.avatar;
  simylarComment.querySelector('.social__picture').alt = comments.name;
  simylarComment.querySelector('.social__text').textContent = comments.message;
  commentDescription.textContent = description;

  addCommentList.appendChild(simylarComment);
});

commentList.appendChild(addCommentList);
