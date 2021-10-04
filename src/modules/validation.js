import {ValidationLength} from '../events/Validation.js';

// eslint-disable-next-line max-len
const emailRegExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// eslint-disable-next-line max-len
const phoneRegExpression = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const emptyResult = {
  validationResult: false,
  validationText: 'Необходимо заполнить поле',
};

const validResult = {
  validationResult: true,
  validationText: '',
};

/**
 * Validation class
 */
export class Validation {
  /**
     * Validating passed email with RegExp
     *
     * @param {string} email
     * @return {Object}
     *
     */
  static validateEmail(email) {
    if (email === '' ) {
      return emptyResult;
    }

    if (!emailRegExpression.test(email) ||
      email.length > ValidationLength.MaxEmailLength ||
      email.length < ValidationLength.MinEmailLength) {
      return {
        validationResult: false,
        validationText: 'Введен неверный адрес электронной почты',
      };
    }

    return validResult;
  }

  /**
     * Validating passed phone number with RegExp
     *
     * @param {string} phone
     * @return {Object}
     *
     */
  static validatePhoneNumber(phone) {
    if (phone === '') {
      return emptyResult;
    }

    if (!phoneRegExpression.test(phone) ||
      phone.length > ValidationLength.MaxPhoneLength ||
      phone.length < ValidationLength.MinPhoneLength) {
      return {
        validationResult: false,
        validationText: 'Введен неверный номер телефона',
      };
    }

    return validResult;
  }

  /**
     * Validating passed password
     *
     * @param {string} password
     * @return {Object}
     *
     */
  static validatePassword(password) {
    if (password === '') {
      return emptyResult;
    }

    if (password.length > ValidationLength.MaxPasswordLength ||
      password.length < ValidationLength.MinPasswordLength) {
      return {
        validationResult: false,
        validationText: `Введите пароль от ${ValidationLength.MinPasswordLength}
         до ${ValidationLength.MaxPasswordLength} символов`,
      };
    }

    return validResult;
  }

  /**
     * Validating passed passwords on equal
     *
     * @param {string} password
     * @param {string} repeatPassword
     * @return {Object}
     *
     */
  static validatePasswordRepeat(password, repeatPassword) {
    if (password !== repeatPassword) {
      return {
        validationResult: false,
        validationText: 'Пароли не совпадают',
      };
    }

    return validResult;
  }

  /**
   * Validating name in form
   *
   * @param {string} name
   * @return {{validationText: string, validationResult: boolean}}
   */
  static validateName(name) {
    if (name === '') {
      return emptyResult;
    }

    return validResult;
  }
}
