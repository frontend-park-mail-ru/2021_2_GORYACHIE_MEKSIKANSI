import {signupPost} from '../modules/api.js';
import {SignUpEvents} from '../events/SignUp.js';
import eventBus from '../modules/eventBus.js';
import {ResponseEvents} from '../events/Responses.js'

/**
 * Class SignUp Model
 */
class SignUpModel {
  /**
   * Make request for signUp and emit userSignUp events
   * with a response status result
   * @param {string} type user type
   * @param {string} name user name
   * @param {string} email user email
   * @param {string} phone user phone
   * @param {string} password user password
   */
  signUp({type, name, email, phone, password}) {
    signupPost({type, name, email, phone, password})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(SignUpEvents.userSignUpSuccess, {});
          } else {
            eventBus.emitEventListener(SignUpEvents.userSignUpFailed, response);
          }
        })
        .catch((response) => {
          eventBus.emitEventListener(SignUpEvents.userSignUpFailed, response);
        });
  }
}

export default new SignUpModel();
