import {profileGet, signupPost} from 'Modules/api.js';
import {SignUpEvents} from 'Events/SignUp.js';
import eventBus from 'Modules/eventBus.js';
import {ResponseEvents} from 'Events/Responses.js';
import {ErrorsText} from 'Events/Errors.js';
import {urls} from 'Modules/urls.js';

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
          if (response.status === ResponseEvents.CREATED) {
            this.getProfile();
            return;
          }
          eventBus.emitEventListener(SignUpEvents.userSignUpFailed,
              response.explain);
        })
        .catch(() => {
          eventBus.emitEventListener(SignUpEvents.userSignUpFailed,
              ErrorsText.FailedToFetch);
        });
  }

  /**
   * getting user profile
   */
  getProfile() {
    profileGet({})
        .then((response) => {
          if (response.status !== ResponseEvents.OK) {
            eventBus.emitEventListener(SignUpEvents.signUpGetProfileFailed, {}); // TODO: add toast...
          }
        });
  }
}

export default new SignUpModel();
