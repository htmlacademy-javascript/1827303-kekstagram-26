const NAME = [
  'Олег',
  'Миша',
  'Никита',
  'Вероника',
  'Андрей',
  'Петр',
];

const DESCRIPTIONS = [
  'Море',
  'Вода',
  'Зелье',
  'Набережная',
  'Кот',
  'Лучший момент',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// function checkStringLength (string, length) {
//   return string.length <= length;
// }

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function createComment (index) {
  return {
    id: index + 1,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAME),
  };
}

const createData = function (index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger (15, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 10)}, (_, index) => createComment(index)),
  };
};

const simylarData = Array.from({length: 25}, (_, index) => createData(index));

// console.log(simylarData);
