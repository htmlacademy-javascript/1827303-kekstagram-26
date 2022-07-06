const modalWindow = document.querySelector('.big-picture');
const commentCount = document.querySelector('.comments-count');
const bigPhoto = document.querySelector('.big-picture__img img');
const likesCount = document.querySelector('.likes-count');
const commentDescription = document.querySelector('.social__caption');
const commentListItem = document.querySelector('.social__comments');
const tempalteCommentItem = document.querySelector('#comment-item')
  .content
  .querySelector('.social__comment');


const likesCounter = document.querySelector('.social__comment-count');
likesCounter.classList.add('hidden');

const uploadComment = document.querySelector('.comments-loader');
uploadComment.classList.add('hidden');


// Открывает модальное окно
function openModalWindow(url, likes, comments, description) {
  document.body.classList.add('modal-open');
  modalWindow.classList.remove('hidden');

  bigPhoto.src = url;
  commentCount.textContent = comments.length;
  likesCount.textContent = likes;
  commentDescription.textContent = description;
  commentListItem.innerHTML = '';
  comments.forEach(createComment);
}

// Добавляет комментарии
function createComment({ avatar, name, message }) {
  const similarComment = tempalteCommentItem.cloneNode(true);

  similarComment.querySelector('.social__picture').src = avatar;
  similarComment.querySelector('.social__picture').alt = name;
  similarComment.querySelector('.social__text').textContent = message;

  commentListItem.appendChild(similarComment);
}

// Закрывает модальное окно
function closeModalWindow() {
  const buttonClose = document.querySelector('#picture-cancel');
  buttonClose.addEventListener('click', () => {
    modalWindow.classList.add('hidden');
    const tegBody = document.querySelector('body');
    tegBody.classList.remove('modal-open');
  });

  function clickHandlerByEsc(e) {
    if (e.key === 'Escape') {
      modalWindow.classList.add('hidden');
    }
  }

  if (modalWindow.classList.contains('hidden') === true) {
    document.removeEventListener('keydown', clickHandlerByEsc);
  }

  document.addEventListener('keydown', clickHandlerByEsc);
}

closeModalWindow();

export { openModalWindow };

