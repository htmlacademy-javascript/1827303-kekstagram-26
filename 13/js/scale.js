// Изменеят значение Scale
const uploadPhotoImg = document.querySelector('.img-upload__preview img');
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
