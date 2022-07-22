// Показывает окно загрузки фото
const formOverlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
formOverlay.classList.remove('hidden');

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

closenUploadPhoto();

// Изменеят значение Scale
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const inputScale = document.querySelector('.scale__control--value');
let scaleValueNumber = parseInt(inputScale.value, 10);
const scaleContolStep = 25;

function changeScaleValue() {
  buttonScaleSmaller.addEventListener('click', () => {
    if (scaleValueNumber === 25) {
      return;
    }

    scaleValueNumber = scaleValueNumber - scaleContolStep;
    inputScale.value = `${scaleValueNumber}%`;

    uploadPhotoImg.style.transform = `scale(${scaleValueNumber / 100})`;
    return inputScale.value;
  });

  buttonScaleBigger.addEventListener('click', () => {
    if (scaleValueNumber === 100) {
      return;
    }

    scaleValueNumber = scaleValueNumber + scaleContolStep;
    inputScale.value = `${scaleValueNumber}%`;

    uploadPhotoImg.style.transform = `scale(${scaleValueNumber / 100})`;
    return inputScale.value;
  });

}

changeScaleValue();

// Добавляет эффект на фото
const rangeSlider = document.querySelector('.effect-level');

// Делегирование
// function createEffect() {
//   form.addEventListener('change', (evt) => {
//     if (evt.target.name === 'effect') {
//       console.log(evt.target);
//     }
//   });
// }

// createEffect();

// Прошлый вариант
function createEffect() {
  const effectControlItem = document.querySelectorAll('.effects__radio');

  noUiSlider.create(rangeSlider, {
    range: {
      'min': 0,
      'max': 1
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  for (let i = 0; i < effectControlItem.length; i++) {
    effectControlItem[i].addEventListener('click', () => {
      uploadPhotoImg.className = '';
      const cssEffectByPhoto = `effects__preview--${effectControlItem[i].value}`;
      uploadPhotoImg.classList.add(cssEffectByPhoto);


      if (cssEffectByPhoto === 'effects__preview--none') {
        // rangeSlider.noUiSlider.destroy();
      }

      if (cssEffectByPhoto === 'effects__preview--chrome') {
        rangeSlider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 1
          },
          start: 1,
          step: 0.1,
          connect: 'lower',
        });

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `grayscale(${values})`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--sepia') {
        rangeSlider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 1
          },
          start: 1,
          step: 0.1,
          connect: 'lower',
        });

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `sepia(${values})`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--marvin') {
        rangeSlider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 100
          },
          start: 100,
          step: 1,
          connect: 'lower',
        });

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `invert(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--phobos') {
        rangeSlider.noUiSlider.updateOptions({
          range: {
            'min': 0,
            'max': 3
          },
          start: 3,
          step: 0.1,
          connect: 'lower',
        });

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `blur(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--heat') {
        rangeSlider.noUiSlider.updateOptions({
          range: {
            'min': 1,
            'max': 3
          },
          start: 3,
          step: 0.1,
          connect: 'lower',
        });

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `brightness(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }
    });
  }
}

createEffect();

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

form.addEventListener('submit', (evt) => {
  const valid = pristine.validate();

  if (!valid) {
    evt.preventDefault();
  }
});
