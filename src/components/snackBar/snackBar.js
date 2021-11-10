/**
 * Snackbar class, be carefull, containts jss
 */
export class SnackBar {
  /**
   * snackbar constructor
   * @param {object} userOptions
   */
  constructor(userOptions) {
    this.userOptions = userOptions;
  }

  /**
   * setting up snackbar options
   */
  settingUp() {
    this.applyUserOptions();
    this.setContainer();
    this.applyPositionClasses();

    this.Element = this.createMessage();
    this.Container.appendChild(this.Element);

    if (this.Options.timeout !== false && this.Options.timeout > 0) {
      this.Interval = setTimeout(this.Close, this.Options.timeout);
    }
  }

  /**
   * writing flags options to snackbar options
   */
  applyUserOptions() {
    this.Options = {
      message: this.userOptions?.message ?? 'Operation performed successfully.',
      dismissible: this.userOptions?.dismissible ?? true,
      timeout: this.userOptions?.timeout ?? 5000,
      status: this.userOptions?.status ? this.userOptions.status.toLowerCase().trim() : '',
      fixed: this.userOptions?.fixed ?? false,
      position: this.userOptions?.position ?? 'br',
      container: this.userOptions?.container ?? document.body,
      width: this.userOptions?.width,
      speed: this.userOptions?.speed,
    };
  }

  /**
   * making conatainer to snackbar
   */
  setContainer() {
    let target = this.getOrFindContainer();

    if (target === undefined) {
      console.log('Could not find target container ' + this.Options.container);
      target = document.body;
    }

    this.Container = this.getOrAddContainerIn(target);
  }

  /**
   * adding container to a target or creating new one
   * @param {HTMLElement} target
   * @return {HTMLElement}
   */
  getOrAddContainerIn(target) {
    const positionClass = this.getPositionClass();

    const listArray = [...target.children];
    const index = listArray.findIndex((node) => {
      return node.nodeType === 1 &&
                node.classList.length > 0 &&
                node.classList.contains('js-snackbar-container') &&
                node.classList.contains(positionClass);
    });

    if (index > -1) {
      return target.children.item(index);
    }

    return this.createNewContainer(target);
  }

  /**
   * switching position by user settings
   * @return {string}
   */
  getPositionClass() {
    switch (this.Options.position) {
      case 'bl':
        return 'js-snackbar-container__bottom-left';
      case 'tl':
        return 'js-snackbar-container__top-left';
      case 'tr':
        return 'js-snackbar-container__top-right';
      case 'tc':
        return 'js-snackbar-container__top-center';
      case 'bc':
        return 'js-snackbar-container__bottom-center';
      default:
        return 'js-snackbar-container--bottom-right';
    }
  }

  /**
   * creating new container to snackbar in calss container
   * @param {HTMLElement} target
   * @return {HTMLElement}
   */
  createNewContainer(target) {
    const container = document.createElement('div');
    container.classList.add('js-snackbar-container');

    if (this.Options.fixed) {
      container.classList.add('js-snackbar-container__fixed');
    }

    target.appendChild(container);
    return container;
  }

  /**
   * finding container on class container
   * @return {type}
   */
  getOrFindContainer() {
    return typeof this.Options.container === 'object' ?
            this.Options.container :
            document.getElementById(this.Options.container);
  }

  /**
   * applying positions classes to containers
   */
  applyPositionClasses() {
    this.Container.classList.add(this.getPositionClass());

    const fixedClassName = 'js-snackbar-container__fixed';

    if (this.Options.fixed) {
      this.Container.classList.add(fixedClassName);
    } else {
      this.Container.classList.remove(fixedClassName);
    }
  }

  /**
   * setting message to snackbar
   * @return {HTMLElement}
   */
  createMessage() {
    const outerElement = this.createWrapper();

    const innerSnack = this.createInnerSnackbar();

    outerElement.appendChild(innerSnack);

    return outerElement;
  }

  /**
   * creating wrapper to snack container
   * @return {HTMLElement}
   */
  createWrapper() {
    const outerElement = document.createElement('div');

    outerElement.classList.add('js-snackbar__wrapper');
    outerElement.style.height = '0px';
    outerElement.style.opacity = '0';
    outerElement.style.marginTop = '0px';
    outerElement.style.marginBottom = '0px';

    this.setWidth(outerElement);
    this.setSpeed(outerElement);

    return outerElement;
  }

  /**
   * create inner div
   * @return {HTMLElement}
   */
  createInnerSnackbar() {
    const innerSnack = document.createElement('div');
    innerSnack.classList.add('js-snackbar', 'js-snackbar--show');

    this.applyColorAndIconTo(innerSnack);
    this.insertMessageTo(innerSnack);
    this.addDismissButtonTo(innerSnack);

    return innerSnack;
  }

  /**
   * editing snackbar color
   * @param {HTMLElement} element
   */
  applyColorAndIconTo(element) {
    if (!this.Options.status) return;

    const status = document.createElement('span');
    status.classList.add('js-snackbar__status');

    switch (this.Options.status) {
      case 'success':
      case 'green':
        status.classList.add('js-snackbar--success');
        break;
      case 'warning':
      case 'alert':
      case 'orange':
        status.classList.add('js-snackbar--warning');
        break;
      case 'danger':
      case 'error':
      case 'red':
        status.classList.add('js-snackbar--danger');
        break;
      default:
        status.classList.add('js-snackbar--info');
        break;
    }

    element.appendChild(status);
  }

  /**
   * inserting message to snackbar
   * @param {HTMLElement} element
   */
  insertMessageTo(element) {
    this.MessageWrapper = document.createElement('div');
    this.MessageWrapper.classList.add('js-snackbar__message-wrapper');

    this.Message = document.createElement('span');
    this.Message.classList.add('js-snackbar__message');
    this.Message.innerHTML = this.Options.message;

    this.MessageWrapper.appendChild(this.Message);
    element.appendChild(this.MessageWrapper);
  }

  /**
   * adding close button to snackbar
   * @param {HTMLElement} element
   */
  addDismissButtonTo(element) {
    if (!this.Options.dismissible) {
      return;
    }

    const closeButton = document.createElement('span');
    closeButton.classList.add('js-snackbar__close');
    closeButton.innerText = '\u00D7';
    closeButton.onclick = this.Close;

    element.appendChild(closeButton);
  }

  /**
   * setting width to snackbar
   * @param {HTMLElement} element
   */
  setWidth(element) {
    if (!this.Options.width) return;

    element.style.width = this.Options.width;
  }

  /**
   * set constainer closing speed
   * @param {HTMLElement} element
   */
  setSpeed(element) {
    const {speed} = this.Options;

    switch (typeof speed) {
      case 'number':
        element.style.transitionDuration = speed + 'ms';
        break;
      case 'string':
        element.style.transitionDuration = speed;
        break;
    }
  }

  /**
   * open snackbar
   */
  Open = () => {
    const contentHeight = this.getMessageHeight();

    this.Element.style.height = contentHeight + 'px';
    this.Element.style.opacity = 1;
    this.Element.style.marginTop = '5px';
    this.Element.style.marginBottom = '5px';

    this.Element.addEventListener('transitioned', this.setStyleFunc);
  }

  /**
   * getting summary snackbar messages height
   * @return {float}
   */
  getMessageHeight() {
    const wrapperStyles = window.getComputedStyle(this.MessageWrapper);

    return this.Message.scrollHeight +
          parseFloat(wrapperStyles.getPropertyValue('padding-top')) +
          parseFloat(wrapperStyles.getPropertyValue('padding-bottom'));
  }

  /**
   * setting height style
   */
  setStyleFunc = () => {
    this.Element.style.height = null;
  }

  /**
   * close snackbar
   */
  Close = () => {
    if (this.Interval) {
      clearInterval(this.Interval);
    }

    const snackbarHeight = this.Element.scrollHeight;
    const snackbarTransitions = this.Element.style.transition;
    this.Element.style.transition = '';

    requestAnimationFrame(() => {
      this.Element.style.height = snackbarHeight + 'px';
      this.Element.style.opacity = 1;
      this.Element.style.marginTop = '0px';
      this.Element.style.marginBottom = '0px';
      this.Element.style.transition = snackbarTransitions;

      requestAnimationFrame(() => {
        this.Element.style.height = '0px';
        this.Element.style.opacity = 0;
      });
    });

    setTimeout(() => {
      this.Container.removeChild(this.Element);
      this.Container.remove();
    }, 1000);
    this.Element.removeEventListener('transitioned', this.setStyleFunc);
  };
}
