/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_2021_2_GORYACHIE_MEKSIKANSI"]("main",{

/***/ "./src/components/navbar/navbar.hbs":
/*!******************************************!*\
  !*** ./src/components/navbar/navbar.hbs ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ \"./node_modules/handlebars/runtime.js\");\nfunction __default(obj) { return obj && (obj.__esModule ? obj[\"default\"] : obj); }\nmodule.exports = (Handlebars[\"default\"] || Handlebars).template({\"1\":function(container,depth0,helpers,partials,data) {\n    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"                        \"\n    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,\"address\") : depth0)) != null ? lookupProperty(stack1,\"addr\") : stack1), depth0))\n    + \"\\n\";\n},\"3\":function(container,depth0,helpers,partials,data) {\n    return \"                       Кликни на меня, чтобы найти свой дом!\\n\";\n},\"5\":function(container,depth0,helpers,partials,data) {\n    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"                        <div class=\\\"navbar__button-cart-number-wrapper\\\">\"\n    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,\"itemNum\") || (depth0 != null ? lookupProperty(depth0,\"itemNum\") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === \"function\" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{\"name\":\"itemNum\",\"hash\":{},\"data\":data,\"loc\":{\"start\":{\"line\":68,\"column\":72},\"end\":{\"line\":68,\"column\":83}}}) : helper)))\n    + \"</div>\\n\";\n},\"7\":function(container,depth0,helpers,partials,data) {\n    return \"                <a href=\\\"login\\\">\\n                    <button class=\\\"right-box__spacer button button_shape_rounded button_width_s button_hover_gray\\\">\\n                    Войти\\n                </button>\\n                </a>\\n\";\n},\"9\":function(container,depth0,helpers,partials,data) {\n    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"            <div class=\\\"nav-profile\\\">\\n                <div class=\\\"nav-profile__img-box\\\">\\n                    <img class=\\\"nav-profile__img\\\" src=\\\"/static/img/profile.png\\\" alt=\\\"Profile image\\\"/>\\n                </div>\\n                <div class=\\\"nav-profile__text-box\\\">\\n                    \"\n    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,\"user\") : depth0)) != null ? lookupProperty(stack1,\"name\") : stack1), depth0))\n    + \"<br>\\n                    <a class=\\\"nav-profile__link\\\" href=\\\"profile\\\">Просмотреть аккаунт</a>\\n                </div>\\n            </div>\\n\\n            <a href=\\\"history\\\">\\n                <button class=\\\"button navbar__button button_color_white button_hover_disabled\\\">\\n                <svg class=\\\"button__icon\\\" width=\\\"20\\\" height=\\\"20\\\" viewBox=\\\"0 0 20 20\\\" fill=\\\"none\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                    <path fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\" d=\\\"M9.57487 3.42572C7.24095 2.02537 4.38656 1.79666 1.85944 2.80751C1.49136 2.95474 1.25 3.31123 1.25 3.70767V13.4234C1.25 14.0742 1.9073 14.5192 2.51156 14.2775C4.58101 13.4497 6.91846 13.637 8.8297 14.7838L9.77576 15.3514C9.84791 15.3947 9.92509 15.4136 10 15.4123C10.0749 15.4136 10.1521 15.3947 10.2242 15.3514L11.1703 14.7838C13.0815 13.637 15.419 13.4497 17.4884 14.2775C18.0927 14.5192 18.75 14.0742 18.75 13.4234V3.70767C18.75 3.31123 18.5086 2.95474 18.1406 2.80751C15.6134 1.79666 12.759 2.02537 10.4251 3.42572L10 3.6808L9.57487 3.42572ZM10.625 5.41671C10.625 5.07153 10.3452 4.79171 10 4.79171C9.65482 4.79171 9.375 5.07153 9.375 5.41671V13.3334C9.375 13.6786 9.65482 13.9584 10 13.9584C10.3452 13.9584 10.625 13.6786 10.625 13.3334V5.41671Z\\\" fill=\\\"black\\\"/>\\n                    <path d=\\\"M2.2707 15.8686C3.95725 14.8848 6.04275 14.8848 7.7293 15.8686L8.63535 16.3971C9.47862 16.889 10.5214 16.889 11.3647 16.3971L12.2707 15.8686C13.9572 14.8848 16.0428 14.8848 17.7293 15.8686L17.8149 15.9185C18.1131 16.0924 18.2138 16.4751 18.0399 16.7733C17.8659 17.0715 17.4832 17.1722 17.1851 16.9982L17.0995 16.9483C15.8021 16.1915 14.1979 16.1915 12.9005 16.9483L11.9945 17.4768C10.762 18.1958 9.23799 18.1958 8.00551 17.4768L7.09946 16.9483C5.80212 16.1915 4.19788 16.1915 2.90054 16.9483L2.81492 16.9982C2.51676 17.1722 2.13406 17.0715 1.96014 16.7733C1.78621 16.4751 1.88692 16.0924 2.18508 15.9185L2.2707 15.8686Z\\\" fill=\\\"black\\\"/>\\n                </svg>\\n                История заказов\\n            </button>\\n            </a>\\n            <a href=\\\"/\\\">\\n                <button class=\\\"button navbar__button button_color_white button_hover_disabled\\\">\\n                <svg class=\\\"button__icon\\\" width=\\\"20\\\" height=\\\"20\\\" viewBox=\\\"0 0 20 20\\\" fill=\\\"none\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                    <path d=\\\"M7.00016 4.375C4.68278 4.375 2.7085 6.10775 2.7085 8.35816C2.7085 9.91062 3.43545 11.2177 4.3989 12.3004C5.35905 13.3793 6.59778 14.285 7.71764 15.043L9.64982 16.3509C9.86142 16.4941 10.1389 16.4941 10.3505 16.3509L12.2827 15.043C13.4025 14.285 14.6413 13.3793 15.6014 12.3004C16.5649 11.2177 17.2918 9.91062 17.2918 8.35816C17.2918 6.10775 15.3175 4.375 13.0002 4.375C11.8056 4.375 10.7545 4.93512 10.0002 5.65986C9.24586 4.93512 8.19472 4.375 7.00016 4.375Z\\\" fill=\\\"black\\\"/>\\n                </svg>\\n\\n                Избранное\\n            </button>\\n            </a>\\n        <a href=\\\"/\\\">\\n            <button class=\\\"button navbar__button button_color_white button_hover_disabled\\\">\\n                <svg class=\\\"button__icon\\\" width=\\\"16\\\" height=\\\"16\\\" viewBox=\\\"0 0 16 16\\\" fill=\\\"none\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                    <path d=\\\"M14.506 3.73882C14.7545 3.9435 14.9613 4.19734 15.1116 4.48634C15.1592 4.57779 15.1235 4.68851 15.0359 4.74276L9.81427 7.9752C8.69438 8.66847 7.28228 8.68301 6.14835 8.01296L0.89183 4.90683C0.806905 4.85665 0.767923 4.75335 0.806196 4.66243C0.958369 4.30095 1.19552 3.98574 1.49221 3.7407L1.49192 3.73822L1.50214 3.73254C1.72168 3.55318 1.97338 3.41205 2.24704 3.3187L5.67194 1.41598C7.11913 0.61199 8.87883 0.611989 10.326 1.41598L13.7469 3.31647C14.0254 3.41055 14.2812 3.55405 14.5038 3.73695L14.506 3.73882Z\\\" fill=\\\"black\\\"/>\\n                    <path d=\\\"M0.490963 6.46168C0.506113 6.31148 0.671949 6.22883 0.801919 6.30563L5.51244 9.08912C7.04658 9.99566 8.95707 9.97598 10.4722 9.03803L15.176 6.12615C15.3054 6.04607 15.474 6.12719 15.4904 6.27846C15.7238 8.43468 15.679 10.6134 15.356 12.761C15.1906 13.8611 14.2928 14.7045 13.1845 14.8008L11.926 14.9102C9.31375 15.1373 6.68677 15.1373 4.07457 14.9102L2.81605 14.8008C1.70776 14.7045 0.809919 13.8611 0.644491 12.761C0.330693 10.6742 0.279517 8.55804 0.490963 6.46168Z\\\" fill=\\\"black\\\"/>\\n                </svg>\\n\\n                Кошельки\\n            </button>\\n        </a>\\n        <a href=\\\"logout\\\">\\n            <button class=\\\"button navbar__button button_color_white navbar__gray-button button_hover_disabled\\\">Выйти</button>\\n        </a>\\n\";\n},\"11\":function(container,depth0,helpers,partials,data) {\n    return \"        <a class=\\\"hamburger__a\\\" href=\\\"login\\\">\\n            <button class=\\\"button button_shape_rounded navbar__button_align-text_center navbar__button button_color_black\\\">Войти</button>\\n        </a>\\n\";\n},\"compiler\":[8,\">= 4.3.0\"],\"main\":function(container,depth0,helpers,partials,data) {\n    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    };\n\n  return \"<div class=\\\"header lock-padding\\\">\\n    <div class=\\\"header__content lock-padding\\\">\\n        <div class=\\\"left-box\\\">\\n            <button class=\\\"button button_color_white nav-button\\\">\\n                <svg href=\\\"navbar\\\" class=\\\"button__icon_nav\\\" width=\\\"26\\\" height=\\\"20\\\" viewBox=\\\"0 0 26 20\\\" fill=\\\"none\\\"\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                    <path href=\\\"navbar\\\" fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\"\\n                          d=\\\"M25.9163 10.0001C25.9163 9.30973 25.3567 8.75008 24.6663 8.75008H1.33301C0.642651 8.75008 0.0830078 9.30973 0.0830078 10.0001C0.0830078 10.6904 0.642651 11.2501 1.33301 11.2501H24.6663C25.3567 11.2501 25.9163 10.6904 25.9163 10.0001Z\\\"\\n                          fill=\\\"black\\\"/>\\n                    <path href=\\\"navbar\\\" fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\"\\n                          d=\\\"M25.9163 1.66675C25.9163 0.976392 25.3567 0.416748 24.6663 0.416748H1.33301C0.642651 0.416748 0.0830078 0.976392 0.0830078 1.66675C0.0830078 2.3571 0.642651 2.91675 1.33301 2.91675H24.6663C25.3567 2.91675 25.9163 2.3571 25.9163 1.66675Z\\\"\\n                          fill=\\\"black\\\"/>\\n                    <path href=\\\"navbar\\\" fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\"\\n                          d=\\\"M25.9163 18.3334C25.9163 17.6431 25.3567 17.0834 24.6663 17.0834H1.33301C0.642651 17.0834 0.0830078 17.6431 0.0830078 18.3334C0.0830078 19.0238 0.642651 19.5834 1.33301 19.5834H24.6663C25.3567 19.5834 25.9163 19.0238 25.9163 18.3334Z\\\"\\n                          fill=\\\"black\\\"/>\\n                </svg>\\n            </button>\\n\\n            <a href=\\\"/\\\">\\n                <img class=\\\"header__logo\\\" src=\\\"/static/img/logo1.svg\\\" height=\\\"56\\\" alt=\\\"logo\\\"/>\\n            </a>\\n        </div>\\n\\n        <div class=\\\"right-box\\\">\\n                <button class=\\\"right-box__spacer button button_shape_rounded button_color_gray button_hover_gray\\\">\\n                    <svg class=\\\"button__icon\\\" width=\\\"11\\\" height=\\\"14\\\" viewBox=\\\"0 0 11 14\\\" fill=\\\"none\\\"\\n                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                        <path d=\\\"M3.46851 6.25C3.46851 5.12817 4.37793 4.21875 5.49976 4.21875C6.62158 4.21875 7.53101 5.12817 7.53101 6.25C7.53101 7.37183 6.62158 8.28125 5.49976 8.28125C4.37793 8.28125 3.46851 7.37183 3.46851 6.25Z\\\"\\n                              fill=\\\"black\\\"/>\\n                        <path fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\"\\n                              d=\\\"M0.35822 5.54837C0.572994 2.94278 2.75036 0.9375 5.36479 0.9375H5.63475C8.24918 0.9375 10.4265 2.94278 10.6413 5.54837C10.757 6.95124 10.3236 8.34424 9.43258 9.43395L6.43692 13.0976C5.95256 13.6899 5.04698 13.6899 4.56262 13.0976L1.56696 9.43395C0.675922 8.34424 0.242584 6.95124 0.35822 5.54837ZM5.49976 3.28125C3.86016 3.28125 2.53101 4.6104 2.53101 6.25C2.53101 7.8896 3.86016 9.21875 5.49976 9.21875C7.13935 9.21875 8.46851 7.8896 8.46851 6.25C8.46851 4.6104 7.13935 3.28125 5.49976 3.28125Z\\\"\\n                              fill=\\\"black\\\"/>\\n                    </svg>\\n                    <a href=\\\"#popup\\\" class=\\\"map-popup__address map-popup__link\\\">\\n\"\n    + ((stack1 = lookupProperty(helpers,\"if\").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,\"address\") : depth0)) != null ? lookupProperty(stack1,\"addr\") : stack1),{\"name\":\"if\",\"hash\":{},\"fn\":container.program(1, data, 0),\"inverse\":container.program(3, data, 0),\"data\":data,\"loc\":{\"start\":{\"line\":35,\"column\":20},\"end\":{\"line\":39,\"column\":27}}})) != null ? stack1 : \"\")\n    + \"                    </a>\\n                </button>\\n\\n            <label class=\\\"right-box__spacer search-input__label search-input__label_size_m\\\">\\n                <svg class=\\\"search-label__icon\\\" width=\\\"24\\\" height=\\\"24\\\" viewBox=\\\"0 0 24 24\\\" fill=\\\"none\\\"\\n                     xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                    <path fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\"\\n                          d=\\\"M14.3854 15.4458C11.7351 17.5685 7.85569 17.4014 5.3989 14.9446C2.76287 12.3086 2.76287 8.0347 5.3989 5.39866C8.03494 2.76262 12.3088 2.76262 14.9448 5.39866C17.4016 7.85544 17.5687 11.7349 15.446 14.3851L20.6017 19.5408C20.8946 19.8337 20.8946 20.3085 20.6017 20.6014C20.3088 20.8943 19.8339 20.8943 19.541 20.6014L14.3854 15.4458ZM6.45956 13.8839C4.40931 11.8337 4.40931 8.50957 6.45956 6.45932C8.50982 4.40907 11.8339 4.40907 13.8842 6.45932C15.9329 8.50807 15.9344 11.8288 13.8887 13.8794C13.8872 13.8809 13.8857 13.8824 13.8842 13.8839C13.8827 13.8854 13.8812 13.8869 13.8797 13.8884C11.8291 15.9342 8.50831 15.9327 6.45956 13.8839Z\\\"\\n                          fill=\\\"black\\\"/>\\n                </svg>\\n                <input class=\\\"search-input\\\" placeholder=\\\"Что-то ищите?\\\"/>\\n            </label>\\n\\n            <a href=\\\"checkout\\\">\\n                <button class=\\\"right-box__spacer button button_shape_rounded button_color_black\\\">\\n                <div class=\\\"button__container\\\">\\n                    <svg class=\\\"button__icon\\\" width=\\\"20\\\" height=\\\"20\\\" viewBox=\\\"0 0 20 20\\\" fill=\\\"none\\\"\\n                         xmlns=\\\"http://www.w3.org/2000/svg\\\">\\n                        <path fill-rule=\\\"evenodd\\\" clip-rule=\\\"evenodd\\\"\\n                              d=\\\"M18.1477 3.25H4.33514L3.15497 1.1346C3.0225 0.897154 2.7719 0.75 2.5 0.75H1C0.585786 0.75 0.25 1.08579 0.25 1.5C0.25 1.91421 0.585786 2.25 1 2.25H2.0596L3.22429 4.33765L5.91037 10.2809L5.91312 10.2869L6.14971 10.8104L3.45287 13.687C3.25895 13.8939 3.19825 14.1924 3.29599 14.4585C3.39372 14.7247 3.63317 14.913 3.91486 14.9452L6.37299 15.2261C9.44767 15.5775 12.5524 15.5775 15.627 15.2261L18.0852 14.9452C18.4967 14.8981 18.7922 14.5264 18.7452 14.1148C18.6981 13.7033 18.3264 13.4078 17.9149 13.4549L15.4567 13.7358C12.4952 14.0742 9.50481 14.0742 6.54331 13.7358L5.56779 13.6243L7.54717 11.513C7.56632 11.4925 7.5841 11.4713 7.60052 11.4494L8.35334 11.5474C9.40826 11.6847 10.4746 11.7116 11.5351 11.6277C14.0086 11.4321 16.301 10.2551 17.9015 8.35907L18.4795 7.67425C18.499 7.65125 18.517 7.62711 18.5335 7.60194L19.6109 5.96009C20.3745 4.79633 19.5397 3.25 18.1477 3.25ZM7.65627 9.94405C7.49086 9.92253 7.34823 9.81745 7.27858 9.66604L7.27725 9.66311L5.05674 4.75H18.1477C18.3466 4.75 18.4658 4.9709 18.3567 5.13716L17.3042 6.74123L16.7552 7.39152C15.4132 8.98139 13.4909 9.96832 11.4169 10.1324C10.4603 10.208 9.49842 10.1837 8.54688 10.0599L7.65627 9.94405Z\\\"\\n                              fill=\\\"white\\\"/>\\n                        <path d=\\\"M5.5 16.5C4.67157 16.5 4 17.1716 4 18C4 18.8284 4.67157 19.5 5.5 19.5C6.32843 19.5 7 18.8284 7 18C7 17.1716 6.32843 16.5 5.5 16.5Z\\\"\\n                              fill=\\\"white\\\"/>\\n                        <path d=\\\"M15 18C15 17.1716 15.6716 16.5 16.5 16.5C17.3284 16.5 18 17.1716 18 18C18 18.8284 17.3284 19.5 16.5 19.5C15.6716 19.5 15 18.8284 15 18Z\\\"\\n                              fill=\\\"white\\\"/>\\n                    </svg>\\n                    Корзина\\n\"\n    + ((stack1 = lookupProperty(helpers,\"if\").call(alias1,(depth0 != null ? lookupProperty(depth0,\"itemNum\") : depth0),{\"name\":\"if\",\"hash\":{},\"fn\":container.program(5, data, 0),\"inverse\":container.noop,\"data\":data,\"loc\":{\"start\":{\"line\":67,\"column\":20},\"end\":{\"line\":69,\"column\":27}}})) != null ? stack1 : \"\")\n    + \"                </div>\\n            </button>\\n            </a>\\n\"\n    + ((stack1 = lookupProperty(helpers,\"unless\").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,\"user\") : depth0)) != null ? lookupProperty(stack1,\"auth\") : stack1),{\"name\":\"unless\",\"hash\":{},\"fn\":container.program(7, data, 0),\"inverse\":container.noop,\"data\":data,\"loc\":{\"start\":{\"line\":73,\"column\":12},\"end\":{\"line\":79,\"column\":23}}})) != null ? stack1 : \"\")\n    + \"        </div>\\n    </div>\\n</div>\\n\\n<div class=\\\"navbar-wrapper\\\">\\n    <div class=\\\"navbar\\\">\\n\"\n    + ((stack1 = lookupProperty(helpers,\"if\").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,\"user\") : depth0)) != null ? lookupProperty(stack1,\"auth\") : stack1),{\"name\":\"if\",\"hash\":{},\"fn\":container.program(9, data, 0),\"inverse\":container.program(11, data, 0),\"data\":data,\"loc\":{\"start\":{\"line\":86,\"column\":8},\"end\":{\"line\":132,\"column\":15}}})) != null ? stack1 : \"\")\n    + \"        <hr class=\\\"navbar__line\\\">\\n        <a href=\\\"/\\\">\\n            <button class=\\\"button navbar__button button_color_white button_hover_disabled\\\">Войти как ресторан</button>\\n        </a>\\n        <a href=\\\"/\\\">\\n            <button class=\\\"button navbar__button button_color_white button_hover_disabled\\\">Войти как доставщик</button>\\n        </a>\\n    </div>\\n</div>\";\n},\"useData\":true});\n\n//# sourceURL=webpack://2021_2_GORYACHIE_MEKSIKANSI/./src/components/navbar/navbar.hbs?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3e2b28e204fc731340a2")
/******/ })();
/******/ 
/******/ }
);