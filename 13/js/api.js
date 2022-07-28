const getData = (onSuccess, onError) => () => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError('Не удалось загрузить данные. Попробуйте ещё раз');
    });
};

// const sendData = (onSuccess, onFail, body) => () => {
//   fetch(
//     'https://26.javascript.pages.academy/kekstagram',
//     {
//       method: 'POST',
//       body,
//     })
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//       } else {
//         onFail('Не удалось отправить форму. Попробуйте ещё раз');
//       }
//     })
//     .catch(() => {
//       onFail('Не удалось отправить форму. Попробуйте ещё раз');
//     });
// };


export { getData };
