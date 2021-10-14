export class MapPopup {
    constructor({
                    parent: parent = document.querySelector('body'),
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

    }

    settingUp() {
    }

    eventPopupOpen = (e) => {
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

    bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.app').offsetWidth + 'px';

        if (this.lockPadding.length > 0) {
            this.lockPadding.forEach((value) => {
                value.style.paddingRight = lockPaddingValue;
            });
        }

        this.parent.style.paddingRight = lockPaddingValue;
        this.parent.classList.add('lock');

        this.unlock = false;
        setTimeout(() => {
            this.unlock = true;
        }, this.timeout);
    }

    bodyUnlock() {
        setTimeout(() => {
            this.lockPadding.forEach((item) => {
                item.style.paddingRight = '0';
            });
            this.parent.style.paddingRight = '0';
            this.parent.classList.remove('lock');
        }, this.timeout);

        this.unlock = false;
        setTimeout(() => {
            this.unlock = true;
        }, this.timeout);
    }
}
