import {signupPost} from '../modules/api.js';
import {SignUpEvents} from '../events/SignUp.js';
import eventBus from '../modules/eventBus.js';
import {debugFunc} from '../modules/debugMod.js';

class SignUpModel {
  signUp({type, name, email, phone, password}) {
    signupPost({type, name, email, phone, password})
        .then((response) => {
          if (response.status === 200) {
            eventBus.emitEventListener(SignUpEvents.userSignUpSuccess, {});
            debugFunc(response, 'signup success message from server');
          } else {
            eventBus.emitEventListener(SignUpEvents.userSignUpFailed, response);
            debugFunc(response, 'signup fail message from server');
          }
        })
        .catch((response) => {
          eventBus.emitEventListener(SignUpEvents.userSignUpFailed, response);
          debugFunc(response, 'signup fail message from server');
        });
  }
}

export default new SignUpModel();
