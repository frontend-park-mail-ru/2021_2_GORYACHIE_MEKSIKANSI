import {YandexMap} from '../../modules/yMaps.js';
import address from '../../modules/lsAddress.js';
import eventBus from '../../modules/eventBus.js';
import {AuthStatus} from '../../events/Auth.js';

export class MapPopup {
    constructor({
                    parent: parent = document.body,
                    routeTo: routeTo = () => {
                    },
                    controller: controller,
                }) {
        this.parent = parent;
        this.unlock = true;
        this.timeout = 800;
    }

    render() {
        const div = document.createElement('div');
        div.classList.add('map-popup-div');
        div.innerHTML = Handlebars.templates['mapPopup.hbs']({});
        document.body.appendChild(div);
        this.lockPadding = document.querySelectorAll('.lock-padding');
        this.mapPopupCloseIcon = document.querySelectorAll('.close-popup');
        this.mapPopupLinks = document.querySelectorAll('.map-popup__link');

        if (this.mapPopupLinks.length > 0) {
            this.mapPopupLinks.forEach((link) => {
                link.addEventListener('click', this.eventPopupOpen)
            });
        }

        if (this.mapPopupCloseIcon.length > 0) {
            this.mapPopupCloseIcon.forEach((icon) => {
                icon.addEventListener('click', this.eventPopupClose)
            });
        }

        this.yaMap = new YandexMap();
        this.yaMap.render({ id: 'js__map', isStatic: false }, (address, isRenew) => {
            if (isRenew) {
                document.getElementById('js__map-add-address').value = address.name;
            }
            this.setCoords(address.latitude, address.longitude);
        });

        this.yaMap.addSearch('js__map-add-address');
        const address_ = address.getAddress();
        if (address_.name) {
            document.getElementById('js__map-add-address').value = address_.name;
            this.yaMap.addPointCustom(address_);
        }
        this.addCloseConfirmationEventListeners(div);
    }

    setCoords (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    settingUp() {
    }

    eventPopupOpen = (e) => {
        console.log(e.target);
        const mapPopupName = e.target.getAttribute('href').replace('#', '');
        const mapCurrentPopup = document.getElementById(mapPopupName);
        this.mapPopupOpen(mapCurrentPopup);
        e.preventDefault();
    }

    eventPopupClose = (e) => {
        this.mapPopupClose(e.target.closest('.map-popup'));
        e.preventDefault();
    }

    remove = () => {
        if (this.mapPopupLinks.length > 0) {
            this.mapPopupLinks.forEach((link) => {
                link.removeEventListener('click', this.eventPopupOpen)
            });
        }

        if (this.mapPopupCloseIcon.length > 0) {
            this.mapPopupCloseIcon.forEach((icon) => {
                icon.removeEventListener('click', this.eventPopupClose)
            });
        }

        const mapPopupName = link.getAttribute('href').replace('#', '');
        const mapCurrentPopup = document.getElementById(mapPopupName);
        mapCurrentPopup.removeEventListener('click', this.popupOutsideClickEvent);
    }

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

    popupOutsideClickEvent = (e) => {
        if (!e.target.closest('.map-popup__content')) {
            this.mapPopupClose(e.target.closest('.map-popup'));
        }
    }

    mapPopupClose(popupActive, doUnlock = true) {
        if (this.unlock) {
            popupActive.classList.remove('open');

            if (doUnlock) {
                this.bodyUnlock();
            }
        }
    }

    addCloseConfirmationEventListeners (confirmationItem) {
        const close = this.parent.querySelector('.map-popup');
        if (!close) {
            return;
        }

        close.querySelector('#js__add-new-address__btn')
            .addEventListener('click', () => {
                YandexMap.isAddressCorrect(document.getElementById('js__map-add-address').value)
                    .then(isCorrect => {
                        if (isCorrect) {
                            const address = document.getElementById('js__map-add-address');
                            if (address.value) {
                                eventBus.emitEventListener(AuthStatus.changeAddress, {
                                    longitude: this.longitude,
                                    latitude: this.latitude,
                                    name: address.value
                                });
                                this.mapPopupClose(document.querySelector('.map-popup'));
                            } else {
                                // TODO нужно сделть ошибку...
                            }
                        }
                    })
            });
    }

    bodyLock() {
        this.parent.style.paddingRight =  String(this.getScrollbarWidth()) + 'px';
        this.parent.style.overflow = 'hidden';

        this.unlock = false;
        setTimeout(() => {
            this.unlock = true;
        }, this.timeout);
    }

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
