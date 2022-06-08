function getRandomInt(min, max) {
  if (max <= min) {
    throw new Error('Измените значение max. Оно должно быть больше значения min');
  }

  if (max < 0, min < 0) {
    throw new Error('Значение min и max должно быть не отрицательным');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

getRandomInt(0, 9);


function getLengthComment(line, length) {
  const lineLength = line.length;
  const lengthComment = (lineLength> length) ? false : true;
  return lengthComment;
}

getLengthComment(5, 10);
