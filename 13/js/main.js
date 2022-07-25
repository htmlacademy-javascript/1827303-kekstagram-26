import './miniature.js';
import './big-photo.js';
import './user-form.js';
import './scale.js';
import './effect.js';
import {renderSimilarList} from './miniature.js';
import {createLoader, showAlert} from './api.js';

// аргументы передать то что нужно, и сделать сообщение об ошибке
const loadPhoto = createLoader(renderSimilarList, showAlert);
loadPhoto();
