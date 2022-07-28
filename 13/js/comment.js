const buttonLoadComment = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments').children;
const commentVisible = document.querySelector('.comments-visible');

let visibleCommentAmount = 5;
const commenstToShow = 5;

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

    for (let i = visibleCommentAmount; i <= visibleCommentAmount + commenstToShow; i++) {
      if (commentList[i]) {
        commentList[i].classList.remove('hidden');
      }
    }

    commentVisible.textContent = Math.min(visibleCommentAmount + commenstToShow, commentList.length);
    visibleCommentAmount = visibleCommentAmount + commenstToShow;

    const visibleNumber = parseInt(commentVisible.textContent, 10);

    if (visibleNumber === commentList.length) {
      buttonLoadComment.classList.add('hidden');
    }
  });
}

export { getInvsibleComment, countvisibleComment, getVisibleComment };
