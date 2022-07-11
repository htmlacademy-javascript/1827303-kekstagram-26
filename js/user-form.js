// Показывает окно загрузки фото
const form = document.querySelector('.img-upload__overlay');
form.classList.remove('hidden');

const uploadPhotoImg = document.querySelector('.img-upload__preview img');
const uploadPhoto = document.querySelector('#upload-file');

function openUploadPhoto () {
  uploadPhoto.addEventListener('change', () => {
    document.body.classList.add('modal-open');
    form.classList.remove('hidden');

    // Подставляет изображение в инпут
    // const fileReader = new FileReader();
    // fileReader.onload = function () {
    //   uploadPhotoImg.src = fileReader.result;
    // };
  });
}

openUploadPhoto();

// Скрывает окно загрузки фото
const buttonCloseUpload = document.querySelector('#upload-cancel');

function closenUploadPhoto () {
  buttonCloseUpload.addEventListener('click', ()=> {
    document.body.classList.remove('modal-open');
    form.classList.add('hidden');
  });

  function clickHandlerUploadByEsc(e) {
    if (e.key === 'Escape') {
      form.classList.add('hidden');
    }
  }

  if (form.classList.contains('hidden') === true) {
    document.removeEventListener('keydown', clickHandlerUploadByEsc);
  }

  document.addEventListener('keydown', clickHandlerUploadByEsc);

  uploadPhoto.value = '';
}

closenUploadPhoto();

// Изменеят знаяение Scale
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
let scaleValueNumber = parseInt(inputScale.value, 10);
const scaleContolStep = 25;

function changeScaleValue () {

  buttonScaleSmaller.addEventListener('click', () => {
    scaleValueNumber = scaleValueNumber - scaleContolStep;
    inputScale.value = `${scaleValueNumber}%`;
    return inputScale.value;
  });

  buttonScaleBigger.addEventListener('click', () => {
    scaleValueNumber = scaleValueNumber + scaleContolStep;
    inputScale.value = `${scaleValueNumber}%`;
    return inputScale.value;
  });

  if (scaleValueNumber <= 25) {
    buttonScaleSmaller.disabled = true;
  } else {
    buttonScaleSmaller.disabled = false;
  }

  // if (scaleValueNumber >= 100) {
  //   buttonScaleBigger.disabled = true;
  // } else {
  //   buttonScaleSmaller.disabled = false;
  // }
}

changeScaleValue();

// Добавляет эффект на фото
function createEffect () {
  const effectControlItem = document.querySelectorAll('.effects__radio');
  for (let i = 0; i < effectControlItem.length; i++) {
    effectControlItem[i].addEventListener('click', () => {
      uploadPhotoImg.className = '';
      const cssEffectByPhoto = `effects__preview--${effectControlItem[i].value}`;
      uploadPhotoImg.classList.add(cssEffectByPhoto);

      if (cssEffectByPhoto === 'effects__preview--none') {
        uploadPhotoImg.className = '';
      }
    });
  }
}

createEffect ();

// Проверка формы
const pristine = new Pristine(form);

// Проверка поля хэштег
function validateHashtag (value) {
  return value.length <= 20;
}

pristine.addValidator(form.querySelector('.text__hashtags'), validateHashtag);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
