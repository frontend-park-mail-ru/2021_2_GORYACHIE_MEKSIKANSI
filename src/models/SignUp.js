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
            eventBus.emitEventListener(SignUpEvents.userSignUpSuccess,
                urls.home.url);
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


  checkAuth() {
    profileGet({url: '/user'})
        .then((response) => {
          if (response.status === ResponseEvents.OK) {
            eventBus.emitEventListener(SignUpEvents.userCheckDone, urls.home.url);
            return;
          }

          eventBus.emitEventListener(SignUpEvents.userCheckFailed, {});
        });
  }
}

export default new SignUpModel();
