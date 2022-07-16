// Показывает окно загрузки фото
const form = document.querySelector('.img-upload__overlay');
form.classList.remove('hidden');

const uploadPhotoImg = document.querySelector('.img-upload__preview img');
const uploadPhoto = document.querySelector('#upload-file');

function openUploadPhoto() {
  uploadPhoto.addEventListener('change', () => {
    document.body.classList.add('modal-open');
    form.classList.remove('hidden');

    let selectedFile = uploadPhoto.files[0];
    let fileUrl = URL.createObjectURL(selectedFile);

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
    form.classList.add('hidden');
  });

  uploadPhoto.value = '';

  function clickHandlerUploadByEsc(e) {
    if (e.key === 'Escape') {
      if (document.activeElement === inputHashtag || document.activeElement === inputComment) {
        return;
      }

      form.classList.add('hidden');
    }
  }

  if (form.classList.contains('hidden') === true) {
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
  if (scaleValueNumber === 100) {
    buttonScaleBigger.disabled = true;
  }

  buttonScaleSmaller.addEventListener('click', () => {
    scaleValueNumber = scaleValueNumber - scaleContolStep;
    inputScale.value = `${scaleValueNumber}%`;

    // Проверка соответсвия условию от 25% до 100%
    if (scaleValueNumber === 25) {
      buttonScaleSmaller.disabled = true;
    }

    if (scaleValueNumber < 100) {
      buttonScaleBigger.disabled = false;
    }

    uploadPhotoImg.style.transform = `scale(${scaleValueNumber / 100})`;
    return inputScale.value;
  });

  buttonScaleBigger.addEventListener('click', () => {
    scaleValueNumber = scaleValueNumber + scaleContolStep;
    inputScale.value = `${scaleValueNumber}%`;

    // Проверка соответсвия условию от 25% до 100%
    if (scaleValueNumber === 100) {
      buttonScaleBigger.disabled = true;
    }

    if (scaleValueNumber > 25) {
      buttonScaleSmaller.disabled = false;
    }

    uploadPhotoImg.style.transform = `scale(${scaleValueNumber / 100})`;
    return inputScale.value;
  });

}

changeScaleValue();

// Добавляет эффект на фото
const rangeSlider = document.querySelector('.effect-level');

let currentEffect;

function createEffect() {
  const effectControlItem = document.querySelectorAll('.effects__radio');
  for (let i = 0; i < effectControlItem.length; i++) {
    effectControlItem[i].addEventListener('click', () => {
      uploadPhotoImg.className = '';
      const cssEffectByPhoto = `effects__preview--${effectControlItem[i].value}`;
      uploadPhotoImg.classList.add(cssEffectByPhoto);

      if (cssEffectByPhoto === 'effects__preview--none') {
        uploadPhotoImg.className = '';
      }

      const settingOfRangeTen = {
        start: [1],
        connect: 'lower',
        step: 0.1,
        range: {
          'min': 0,
          'max': 1
        }
      };

      const settingOfRangethirty = {
        start: [3],
        connect: 'lower',
        step: 0.1,
        range: {
          'min': 0,
          'max': 3
        }
      };

      if (cssEffectByPhoto === 'effects__preview--chrome') {
        // rangeSlider.noUiSlider.off();

        noUiSlider.create(rangeSlider, settingOfRangeTen);


//  ДОДЕЛАТЬ


        // currentEffect = (values) => `grayscale(${values})`;

        // rangeSlider.noUiSlider.on('update', (values) => {
        //   let valueSlider = `grayscale(${values})`;
        //   console.log(valueSlider);
        //   console.log(values);
        //   uploadPhotoImg.style.filter = valueSlider;
        // });
      }

      if (cssEffectByPhoto === 'effects__preview--sepia') {
        noUiSlider.create(rangeSlider, settingOfRangeTen);

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `sepia(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--marvin') {
        noUiSlider.create(rangeSlider, {
          start: [100],
          connect: 'lower',
          step: 1,
          range: {
            'min': 0,
            'max': 100
          }
        });

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `invert(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--phobos') {
        noUiSlider.create(rangeSlider, settingOfRangethirty);

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `blur(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--heat') {
        noUiSlider.create(rangeSlider, settingOfRangethirty);

        rangeSlider.noUiSlider.on('update', (values) => {
          let valueSlider = `brightness(${values})`;
          console.log(valueSlider);
          uploadPhotoImg.style.filter = valueSlider;
        });
      }
    });
  }
}

// function getFilter () {
//   rangeSlider.noUiSlider.on('update', () => {
//     uploadPhotoImg.style.filter = currentEffect;
//   });
// }

createEffect();

// Проверка формы с помощью Pristine
// const inputHashtag = form.querySelector('.text__hashtags');

// Хэштег
const HASHTAG_REGEX = /^#(?=.*[^0-9])[a-zа-яё0-9]{1,20}$/;

function emailTest(value) {
  const hashtags = value.split(' ');

  return hashtags.every((hashtag) => HASHTAG_REGEX.test(hashtag));
}

function validateHashtagMinLength(value) {
  const hashtags = value.split(' ');

  return hashtags.length >= 1;
}

function validateHashtagMaxLength(value) {
  const hashtags = value.split(' ');

  return hashtags.length <= 5;
}

function validateHashtagIsUnique(value) {
  const hashtags = value.split(' ');
  const hashtagSet = new Set(hashtags);

  return hashtags.length == hashtagSet.size;
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

pristine.addValidator(inputHashtag, emailTest);
pristine.addValidator(inputHashtag, validateHashtagMinLength);
pristine.addValidator(inputHashtag, validateHashtagMaxLength);
pristine.addValidator(inputHashtag, validateHashtagIsUnique);

pristine.addValidator(inputComment, validateCommentMaxLength);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


