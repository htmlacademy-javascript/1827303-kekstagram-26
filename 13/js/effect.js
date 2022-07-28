const uploadPhotoImg = document.querySelector('.img-upload__preview img');
const rangeSlider = document.querySelector('.effect-level');

// Добавляет эффект на фото
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
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  for (let i = 0; i < effectControlItem.length; i++) {
    effectControlItem[i].addEventListener('click', () => {

      uploadPhotoImg.className = '';
      const cssEffectByPhoto = `effects__preview--${effectControlItem[i].value}`;
      uploadPhotoImg.classList.add(cssEffectByPhoto);

      if (cssEffectByPhoto === 'effects__preview--none') {
        rangeSlider.classList.add('hidden');

        rangeSlider.noUiSlider.off();
        uploadPhotoImg.style.filter = '';
      }

      if (cssEffectByPhoto === 'effects__preview--chrome') {
        rangeSlider.classList.remove('hidden');

        rangeSlider.noUiSlider.off();

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
          const valueSlider = `grayscale(${values})`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--sepia') {
        rangeSlider.classList.remove('hidden');

        rangeSlider.noUiSlider.off();

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
          const valueSlider = `sepia(${values})`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--marvin') {
        rangeSlider.classList.remove('hidden');

        rangeSlider.noUiSlider.off();

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
          const valueSlider = `invert(${values}%)`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--phobos') {
        rangeSlider.classList.remove('hidden');

        rangeSlider.noUiSlider.off();

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
          const valueSlider = `blur(${values}px)`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }

      if (cssEffectByPhoto === 'effects__preview--heat') {
        rangeSlider.classList.remove('hidden');

        rangeSlider.noUiSlider.off();

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
          const valueSlider = `brightness(${values})`;
          uploadPhotoImg.style.filter = valueSlider;
        });
      }
    });
  }
}

createEffect();
