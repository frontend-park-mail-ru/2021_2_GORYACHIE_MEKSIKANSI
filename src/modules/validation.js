const emailRegExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const phoneRegExpression = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const emptyResult = {
  validationResult: false,
  validationText: 'Необходимо заполнить поле',
};

const validResult = {
  validationResult: true,
  validationText: '',
};

export class Validation {
  /**
     * Validating passed email with RegExp
     *
     * @param {string} email
     * @return {Object}
     *
     */
  static validateEmail(email) {
    if (email === '') {
      return emptyResult;
    }

    if (!emailRegExpression.test(email)) {
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

    if (!phoneRegExpression.test(phone)) {
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

    if (password.length > 28 || password.length < 8) {
      return {
        validationResult: false,
        validationText: 'Введите пароль от 8 до 28 символов',
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
   * @param name
   * @return {{validationText: string, validationResult: boolean}}
   */
  static validateName(name) {
    if (name === '') {
      return emptyResult;
    }

    return validResult;
  }
}
