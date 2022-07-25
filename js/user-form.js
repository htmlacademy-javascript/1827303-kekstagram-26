// import { showAlert } from './util.js';
// import { sendData } from './api.js';

// Показывает окно загрузки фото
const formOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadPhotoImg = document.querySelector('.img-upload__preview img');
const uploadPhoto = document.querySelector('#upload-file');

function openUploadPhoto() {
  uploadPhoto.addEventListener('change', () => {
    document.body.classList.add('modal-open');
    formOverlay.classList.remove('hidden');

    const selectedFile = uploadPhoto.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);

    uploadPhotoImg.src = fileUrl;
  });
}

openUploadPhoto();

// Скрывает окно загрузки фото
const buttonCloseUpload = document.querySelector('#upload-cancel');
const inputHashtag = form.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');

function closenUploadPhoto() {
  buttonCloseUpload.addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    formOverlay.classList.add('hidden');
  });

  uploadPhoto.value = '';

  function clickHandlerUploadByEsc(e) {
    if (e.key === 'Escape') {
      if (document.activeElement === inputHashtag || document.activeElement === inputComment) {
        return;
      }

      formOverlay.classList.add('hidden');
    }
  }

  if (formOverlay.classList.contains('hidden') === true) {
    document.removeEventListener('keydown', clickHandlerUploadByEsc);
  }

  document.addEventListener('keydown', clickHandlerUploadByEsc);
}

// closenUploadPhoto();

// Проверка формы с помощью Pristine
const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,20}$/;

function emailTest(value) {
  const hashtags = value.split(' ');

  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
}

function validateHashtagMaxLength(value) {
  const hashtags = value.split(' ');

  return hashtags.length <= 5;
}

function validateHashtagIsUnique(value) {
  const hashtags = value.split(' ');
  const hashtagSet = new Set(hashtags);

  return hashtags.length === hashtagSet.size;
}

// Кэмел кэйс
// function validateHashtagCamalCase(input) {
//   return input == input.toUpperCase();
// }

// Комментарий
function validateCommentMaxLength(value) {
  return value.length <= 140;
}

const pristine = new Pristine(form);

// Валидаторы поля хэштега
pristine.addValidator(inputHashtag, emailTest);
pristine.addValidator(inputHashtag, validateHashtagMaxLength);
pristine.addValidator(inputHashtag, validateHashtagIsUnique);

// Валидаторы поля комментария
pristine.addValidator(inputComment, validateCommentMaxLength);

// const submitButton = document.querySelector('.img-upload__submit');

// const blockSubmitButton = () => {
//   submitButton.disabled = true;
//   submitButton.textContent = 'Сохраняю...';
// };

// const unblockSubmitButton = () => {
//   submitButton.disabled = false;
//   submitButton.textContent = 'Сохранить';
// };

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(evt.target);

      fetch(
        'https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          // Content-Type; multipart/form-data,
          body: formData,
        },
      ).then(() => onSuccess());

      // blockSubmitButton();
      // sendData(
      //   () => {
      //     onSuccess();
      //     unblockSubmitButton();
      //   },
      //   () => {
      //     showAlert('Не удалось отправить форму. Попробуйте ещё раз');
      //     unblockSubmitButton();
      //   },
      //   new FormData(evt.target),
      // );
    }
  });
};

export { setUserFormSubmit, closenUploadPhoto};
