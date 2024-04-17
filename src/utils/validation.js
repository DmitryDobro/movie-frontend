const regexEmail = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
const regexName = /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]*$/;
// Валидация
// сначала проверяем на undefaind, потому что в компонент Профиль сначала приходит undefaind и все падает, 
// потому что не может найти свойство message
export function validateEmail(email) {
  if (email !== undefined) {
    if (email.length === 0) {
      return {message: 'Поле не должно быть пустым'};
    } else if (!regexEmail.test(email)) {
      return {message: 'Введите корректный адрес'};
    } else if (regexEmail.test(email)) {
      return {message: ''};
    }
  } else {
    return {message: ''};
  }
}
export function validateName(name) {
  if (name !== undefined) {
    if (name.length === 0) {
      return {message: 'Поле не должно быть пустым'};
    } else if (!regexName.test(name)) {
      return {message: 'Введите корректное имя'};
    } else if (regexName.test(name)) {
      return {message: ''};
    }
  } else {
    return {message: ''};
  }
}
export function validatePassword(pass) {
  if (pass.length === 0) {
    return {message: 'Поле не должно быть пустым'};
  } else {
    return {message: ''};
  }
}
