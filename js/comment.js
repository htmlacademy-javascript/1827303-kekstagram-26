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

    for (let i = 5; i <= commentList.length; i++) {
      if (commentList[i]) {
        commentList[i].classList.remove('hidden');
      }
    }

    commentVisible.textContent = commentList.length;

    const visibleNumber = parseInt(commentVisible.textContent, 10);

    if (visibleNumber === commentList.length) {
      buttonLoadComment.classList.add('hidden');
    }
  });
}

// Новый вариант по 5 штук
// function getVisibleComment() {

//   const countComment = 5;


//   buttonLoadComment.addEventListener('click', () => {
//     for (let i = 0; i <= n + 5; i++) {
//       if (commentList[i]) {
//         commentList[i].classList.remove('hidden');
//         n = n + 5;
//       }
//     }
//   });
// }

export { getInvsibleComment, countvisibleComment, getVisibleComment };
