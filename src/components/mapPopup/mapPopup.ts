import {YandexMap} from 'Modules/yMaps.js';
import address from 'Modules/lsAddress.js';
import eventBus from 'Modules/eventBus.js';
import {AuthStatus} from 'Events/Auth.js';
import navbar from '../navbar/navbar.js';
import mapPopup from './mapPopup.hbs';

/**
 * Map class
 */
export class MapPopup {
  /**
   * Constructor for Map class
   *
   * @param {{parent: HTMLElement, routeTo: object, controller: Class}} params
   *
   */
  constructor({
    parent: parent = document.body,
    routeTo: routeTo = () => {
    },
    controller: controller,
  }) {
    this.parent = parent;
    this.unlock = true;
    this.timeout = 100;
  }

  /**
   * Rendering Map
   */
  render() {
    const div = document.createElement('div');
    div.classList.add('map-popup-div');
    div.innerHTML = mapPopup({});
    document.body.appendChild(div);
    this.mapPopupCloseIcon = document.querySelectorAll('.close-popup');
    this.mapPopupLinks = document.querySelectorAll('.map-popup__link');

    if (this.mapPopupLinks.length > 0) {
      this.mapPopupLinks.forEach((link) => {
        link.addEventListener('click', this.eventPopupOpen);
      });
    }

    if (this.mapPopupCloseIcon.length > 0) {
      this.mapPopupCloseIcon.forEach((icon) => {
        icon.addEventListener('click', this.eventPopupClose);
      });
    }

    this.yaMap = new YandexMap();
    this.yaMap.render({id: 'js__map', isStatic: false}, (address, isRenew) => {
      if (isRenew) {
        document.getElementById('js__map-add-address').value = address.name;
      }
      this.setCoords(address.latitude, address.longitude);
    });

    this.yaMap.addSuggestView('js__map-add-address');
    const address_ = address.getAddress();
    this.addCloseConfirmationEventListeners(div);

    if (address_.name) {
      this.yaMap.customPoint(address_);
    } else {
      const mapCurrentPopup = document.querySelector('.map-popup');
      this.mapPopupOpen(mapCurrentPopup);
    }
  }

  /**
   * Setting coordinates
   * @param {float} latitude
   * @param {float} longitude
   */
  setCoords(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * Event to open popup of map
   * @param {event} e
   */
  eventPopupOpen = (e) => {
    // const mapPopupName = e.target.getAttribute('href').replace('#', '');
    const mapCurrentPopup = document.getElementById(e.target.getAttribute('href'));
    this.mapPopupOpen(mapCurrentPopup);
    e.preventDefault();
  }

  /**
   * Event to close popup of map
   * @param {event} e
   */
  eventPopupClose = (e) => {
    this.mapPopupClose(e.target.closest('.map-popup'));
    e.preventDefault();
  }

  /**
   * Removing map from page
   */
  remove = () => {
    if (this.mapPopupLinks && this.mapPopupLinks.length > 0) {
      this.mapPopupLinks.forEach((link) => {
        link.removeEventListener('click', this.eventPopupOpen);
      });
    }

    if (this.mapPopupCloseIcon && this.mapPopupCloseIcon.length > 0) {
      this.mapPopupCloseIcon.forEach((icon) => {
        icon.removeEventListener('click', this.eventPopupClose);
      });
    }

    const close = this.parent.querySelector('.map-popup');
    if (close) {
      close.querySelector('#js__add-new-address__btn')
          .removeEventListener('click', this.addAddress);
    }
    if (this.parent.querySelector('.map-popup-div')) {
      this.parent.removeChild(this.parent.querySelector('.map-popup-div'));
    }
  }

  /**
   * popup open function
   * @param {HTMLElement} currentPopup
   */
  mapPopupOpen(currentPopup) {
    if (currentPopup && this.unlock) {
      const popupActive = document.querySelector('.map-popup.open');
      if (popupActive) {
        this.mapPopupClose(popupActive, false);
      } else {
        this.bodyLock();
      }

      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', this.popupOutsideClickEvent);
    }
  }

  /**
   * Closing popup on outside click
   * @param {event} e
   */
  popupOutsideClickEvent = (e) => {
    if (!e.target.closest('.modal')) {
      this.mapPopupClose(e.target.closest('.map-popup'));
    }
  }

  /**
   * Closing popup
   * @param {HTMLElement} popupActive
   * @param {boolean} doUnlock
   */
  mapPopupClose(popupActive, doUnlock = true) {
    if (this.unlock) {
      popupActive.classList.remove('open');

      if (doUnlock) {
        this.bodyUnlock();
      }
    }
  }

  /**
   * Closing popup after address confirmation
   */
  addCloseConfirmationEventListeners() {
    const close = this.parent.querySelector('.map-popup');
    if (!close) {
      return;
    }

    close.querySelector('#js__add-new-address__btn')
        .addEventListener('click', this.addAddress);
  }

  /**
   * Adding address from map
   */
  addAddress = () => {
    YandexMap.isAddressCorrect(document.getElementById('js__map-add-address').value)
        .then((isCorrect) => {
          if (isCorrect) {
            const address = isCorrect.properties._data.name;
            if (address) {
              eventBus.emitEventListener(AuthStatus.changeAddress, {
                longitude: this.longitude,
                latitude: this.latitude,
                name: isCorrect.properties._data.name,
                city: isCorrect.properties._data.metaDataProperty.GeocoderMetaData.Address.Components.find((element) => {
                  if (element.kind === 'province' && isCorrect.properties._data.text.includes(String(element.name))) {
                    return true;
                  }
                }).name,
                fullAddress: isCorrect.properties._data.text,
              });
              this.mapPopupClose(document.querySelector('.map-popup'));
              navbar.updateAddressName(address);
              if (this.parent.querySelector('.js-address')) {
                this.parent.querySelector('.js-address').value = String(isCorrect.properties._data.text);
              }
            } else {
              // TODO нужно сделать ошибку...
            }
          }
        });
  }

  /**
   * Blocking double map click
   */
  bodyLock() {
    this.parent.style.paddingRight = String(this.getScrollbarWidth()) + 'px';
    this.parent.style.overflow = 'hidden';

    this.unlock = false;
    setTimeout(() => {
      this.unlock = true;
    }, this.timeout);
  }

  /**
   * Getting width of scrollbar
   * @return {int} scrollbarWidth
   */
  getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  /**
   * Unlocking body
   */
  bodyUnlock() {
    setTimeout(() => {
      this.parent.style.paddingRight = '0';
      this.parent.style.paddingRight = '0';
      this.parent.style.overflowY = 'scroll';
    }, this.timeout);

    this.unlock = false;
    setTimeout(() => {
      this.unlock = true;
    }, this.timeout);
  }
}
