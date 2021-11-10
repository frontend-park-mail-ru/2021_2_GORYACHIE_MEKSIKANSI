(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['cart.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"cartId") || (depth0 != null ? lookupProperty(depth0,"cartId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cartId","hash":{},"data":data,"loc":{"start":{"line":20,"column":25},"end":{"line":20,"column":35}}}) : helper)))
    + "\" class=\"cart__order-row\">\n                    <div class=\"cart__order-row-info\">\n                        <div class=\"cart__order-row-title\">\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":23,"column":28},"end":{"line":23,"column":38}}}) : helper)))
    + "\n                        </div>\n                        <div class=\"cart__order-row-info\">\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"weight") || (depth0 != null ? lookupProperty(depth0,"weight") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data,"loc":{"start":{"line":26,"column":28},"end":{"line":26,"column":40}}}) : helper)))
    + "г • "
    + alias4(((helper = (helper = lookupProperty(helpers,"ccal") || (depth0 != null ? lookupProperty(depth0,"ccal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ccal","hash":{},"data":data,"loc":{"start":{"line":26,"column":44},"end":{"line":26,"column":54}}}) : helper)))
    + "ккал\n                        </div>\n                    </div>\n                    <div class=\"cart__order-row-right-box\">\n                        <div class=\"cart__order-row-selector cart__order-row-number-selector\">\n                            <div class=\"dish-popup__num-selector-box\">\n                                <div class=\"button minus dish-popup__selector-button\">\n                                    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                        <path d=\"M7 12L17 12\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                                    </svg>\n                                </div>\n                                <div class=\"dish-popup__number\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"num") || (depth0 != null ? lookupProperty(depth0,"num") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num","hash":{},"data":data,"loc":{"start":{"line":37,"column":64},"end":{"line":37,"column":73}}}) : helper)))
    + "</div>\n                                <div class=\"button plus dish-popup__selector-button\">\n                                    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                                        <path d=\"M12 17V7\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                                        <path d=\"M7 12L17 12\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                                    </svg>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"cart__order-row-cost\">\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":47,"column":28},"end":{"line":47,"column":38}}}) : helper)))
    + " ₽\n                        </div>\n                    </div>\n                    <div class=\"cart__order-row-additional\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"radios") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":24},"end":{"line":53,"column":33}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"ingredients") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":24},"end":{"line":56,"column":33}}})) != null ? stack1 : "")
    + "                    </div>\n                </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            • "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":52,"column":30},"end":{"line":52,"column":38}}}) : helper)))
    + "<br>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            + "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":55,"column":30},"end":{"line":55,"column":38}}}) : helper)))
    + "<br>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n<div class=\"cart-wrapper\">\n    <div class=\"cart\">\n        <div class=\"cart__header\">\n            <div class=\"cart__title\">\n                Мой заказ\n            </div>\n            <div class=\"cart__clear-button\">\n                <svg width=\"35\" height=\"35\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V3.75H5C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25H19C19.4142 5.25 19.75 4.91421 19.75 4.5C19.75 4.08579 19.4142 3.75 19 3.75H14.75V3C14.75 2.58579 14.4142 2.25 14 2.25H10Z\" fill=\"black\"/>\n                    <path d=\"M10 10.65C10.4142 10.65 10.75 10.9858 10.75 11.4L10.75 18.4C10.75 18.8142 10.4142 19.15 10 19.15C9.58579 19.15 9.25 18.8142 9.25 18.4L9.25 11.4C9.25 10.9858 9.58579 10.65 10 10.65Z\" fill=\"black\"/>\n                    <path d=\"M14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z\" fill=\"black\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.99142 7.91718C6.03363 7.53735 6.35468 7.25 6.73684 7.25H17.2632C17.6453 7.25 17.9664 7.53735 18.0086 7.91718L18.2087 9.71852C18.5715 12.9838 18.5715 16.2793 18.2087 19.5446L18.189 19.722C18.045 21.0181 17.0404 22.0517 15.7489 22.2325C13.2618 22.5807 10.7382 22.5807 8.25108 22.2325C6.95954 22.0517 5.955 21.0181 5.81098 19.722L5.79128 19.5446C5.42846 16.2793 5.42846 12.9838 5.79128 9.71852L5.99142 7.91718ZM7.40812 8.75L7.2821 9.88417C6.93152 13.0394 6.93152 16.2238 7.2821 19.379L7.3018 19.5563C7.37011 20.171 7.84652 20.6612 8.45905 20.747C10.8082 21.0758 13.1918 21.0758 15.5409 20.747C16.1535 20.6612 16.6299 20.171 16.6982 19.5563L16.7179 19.379C17.0685 16.2238 17.0685 13.0394 16.7179 9.88417L16.5919 8.75H7.40812Z\" fill=\"black\"/>\n                </svg>\n            </div>\n        </div>\n\n        <div class=\"cart__orders-body\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":59,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n\n        <div class=\"cart__summary\">\n            <div class=\"cart__time-summary-box\">\n                <div class=\"cart__summary-title\">\n                    Время доставки\n                </div>\n                <div class=\"cart__summary-val\">\n                    "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"minDTime") : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"maxDTime") : stack1), depth0))
    + " мин\n                </div>\n            </div>\n            <div class=\"cart__cost-summary-box\">\n                <div class=\"cart__summary-title\">\n                    Итого\n                </div>\n                <div class=\"cart__summary-val-cost\">\n                    <div class=\"cart__summary-cost\">0</div><div class=\"cart__P\">₽</div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <a href=\"checkout\" class=\"button button_color_black cart__buy-button\">Оформить заказ</a>\n</div>\n";
},"useData":true});
templates['orderDelivery.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"history-order__item\">\n                <div class=\"order__item-wrapper\">\n                    <div class=\"order__item-title\">\n                        "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":44,"column":24},"end":{"line":44,"column":34}}}) : helper)))
    + "\n                    </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"radios") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":46,"column":20},"end":{"line":51,"column":29}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"ingredients") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":52,"column":20},"end":{"line":56,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n\n\n                <div class=\"history-order__item-num\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"num") || (depth0 != null ? lookupProperty(depth0,"num") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num","hash":{},"data":data,"loc":{"start":{"line":61,"column":20},"end":{"line":61,"column":29}}}) : helper)))
    + " шт\n                </div>\n\n                <div class=\"history-order__item-cost\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":65,"column":20},"end":{"line":65,"column":30}}}) : helper)))
    + " ₽\n                </div>\n            </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div>\n                            • "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":48,"column":30},"end":{"line":48,"column":40}}}) : helper)))
    + "\n                        </div>\n\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div>\n                            + "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":54,"column":30},"end":{"line":54,"column":40}}}) : helper)))
    + "\n                        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cart-order-delivery\">\n    <div class=\"cart-order-delivery__wrapper\">\n        <div class=\"cart-order-delivery__title\">Условия доставки</div>\n        <div class=\"cart-order-delivery__input-row\">\n            <input placeholder=\"Введите адрес\" required class=\"input cart-order-delivery__input profile-page__input\">\n        </div>\n        <div class=\"cart-order-delivery__input-row\">\n            <input placeholder=\"Подъезд\" required class=\"input cart-order-delivery__input cart-order-delivery__input-mw profile-page__input\">\n            <input placeholder=\"Домофон\" required class=\"input cart-order-delivery__input cart-order-delivery__input-mw cart-order-delivery__input_margin-left profile-page__input\">\n            <input placeholder=\"Этаж\" required class=\"input cart-order-delivery__input cart-order-delivery__input-mw cart-order-delivery__input_margin-left profile-page__input\">\n            <input placeholder=\"Квартира\" required class=\"input cart-order-delivery__input cart-order-delivery__input-mw cart-order-delivery__input_margin-left profile-page__input\">\n        </div>\n        <div class=\"cart-order-delivery__undertitle\">\n            Комментарий\n        </div>\n        <div class=\"cart-order-delivery__input-row\">\n            <input placeholder=\"Напишите, как вас найти или пожелания к заказу...\" required class=\"input cart-order-delivery__input cart-order-delivery__input_sq cart-order-delivery__input_margin-left profile-page__input\">\n        </div>\n        <div class=\"cart-order-delivery__time-title\">\n            Время доставки составит ~ "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"minDTime") : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"maxDTime") : stack1), depth0))
    + " мин\n        </div>\n    </div>\n</div>\n\n<div class=\"history-order cart-order\">\n    <div class=\"history-order__main-info\">\n        <div class=\"history-order__main-info-text\">\n            <div class=\"history-order__restaurant-title history-order__row-margin\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n            </div>\n            <div class=\"history-order__address history-order__row-margin\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"addrs") : stack1), depth0))
    + "\n            </div>\n        </div>\n        <div class=\"history-order__image-wrapper\">\n            <img class=\"history-order__main-info-img\" src=\"http://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/96672465571661.5afc10a864fc2.jpg\" alt=\"rest image\">\n        </div>\n    </div>\n    <div class=\"history-order__info\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias3,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":40,"column":8},"end":{"line":68,"column":17}}})) != null ? stack1 : "")
    + "        <div class=\"history-order__item\">\n            <div class=\"history-order__delivery-title\">\n                Доставка\n            </div>\n\n            <div class=\"history-order__delivery-cost\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"restaurant") : depth0)) != null ? lookupProperty(stack1,"dCost") : stack1), depth0))
    + " ₽\n            </div>\n        </div>\n        <div class=\"history-order__summary\">\n            <div class=\"order__summary-title\">\n                Итого\n            </div>\n\n            <div class=\"history-order__summary-cost\">\n                "
    + alias2(((helper = (helper = lookupProperty(helpers,"sumCost") || (depth0 != null ? lookupProperty(depth0,"sumCost") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"sumCost","hash":{},"data":data,"loc":{"start":{"line":84,"column":16},"end":{"line":84,"column":29}}}) : helper)))
    + " ₽\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['orderSummary.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"cart-order-summary\">\n        <div class=\"cart-order-summary__payment-box\">\n            <div class=\"cart-order-summary__payment-title\">\n                Способ оплаты\n            </div>\n            <div class=\"cart-order-summary__radio-buttons-wrapper\">\n                <div class=\"cart-order-summary__radio-button-box\">\n                    <input class=\"cash\" id=\"radio-4\" type=\"radio\" name=\"payment-method\" checked value=\"1\">\n                    <label class=\"button cart-order-summary__radio-button\" for=\"radio-4\">\n                        <svg class=\"cart-order-summary__radio-button-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path d=\"M15.4999 12.0001C15.4999 11.1717 16.1715 10.5001 16.9999 10.5001C17.8284 10.5001 18.4999 11.1717 18.4999 12.0001C18.4999 12.8285 17.8284 13.5001 16.9999 13.5001C16.1715 13.5001 15.4999 12.8285 15.4999 12.0001Z\" fill=\"black\"/>\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M20.4413 6.67414C19.7835 5.12848 18.3301 4.01735 16.6006 3.83535L15.9487 3.76676C12.6564 3.42031 9.33569 3.44315 6.04844 3.83487L5.6165 3.88634C3.94771 4.0852 2.62546 5.38901 2.40318 7.05485C1.96522 10.3372 1.96522 13.6631 2.40318 16.9454C2.62546 18.6113 3.94771 19.9151 5.61651 20.1139L6.04845 20.1654C9.33569 20.5571 12.6564 20.58 15.9487 20.2335L16.6006 20.1649C18.3301 19.9829 19.7835 18.8718 20.4413 17.3261C21.4805 17.0167 22.2737 16.1157 22.4039 15.0025C22.6372 13.0077 22.6372 10.9925 22.4039 8.99776C22.2737 7.88454 21.4805 6.98356 20.4413 6.67414ZM15.7918 5.25852C12.6107 4.92377 9.40212 4.94585 6.22593 5.32433L5.79399 5.37581C4.80518 5.49364 4.02171 6.26618 3.89 7.25324C3.46961 10.4039 3.46961 13.5964 3.89 16.747C4.02171 17.7341 4.80518 18.5066 5.794 18.6245L6.22594 18.6759C9.40212 19.0544 12.6107 19.0765 15.7918 18.7417L16.4436 18.6732C17.2942 18.5836 18.0468 18.1644 18.5683 17.5421C17.0601 17.63 15.5319 17.5907 14.0417 17.4242C12.7723 17.2823 11.7457 16.2828 11.596 15.0025C11.3627 13.0077 11.3627 10.9925 11.596 8.99776C11.7457 7.7175 12.7723 6.71796 14.0417 6.57609C15.5319 6.40954 17.0601 6.37024 18.5683 6.45819C18.0467 5.83587 17.2942 5.41662 16.4436 5.32712L15.7918 5.25852ZM19.2773 8.01483C19.2779 8.01867 19.2785 8.02251 19.2791 8.02635L19.2852 8.06524L19.4838 8.03439C19.5866 8.04456 19.6892 8.05537 19.7916 8.06681C20.379 8.13246 20.8468 8.59661 20.9141 9.17201C21.1338 11.051 21.1338 12.9492 20.9141 14.8283C20.8468 15.4037 20.379 15.8678 19.7916 15.9335C19.6892 15.9449 19.5866 15.9557 19.4838 15.9659L19.2852 15.935L19.2791 15.9739C19.2785 15.9778 19.2779 15.9816 19.2773 15.9854C17.5987 16.1373 15.8771 16.12 14.2083 15.9335C13.6209 15.8678 13.1531 15.4037 13.0858 14.8283C12.8661 12.9492 12.8661 11.051 13.0858 9.17201C13.1531 8.59661 13.6209 8.13246 14.2083 8.06681C15.8771 7.8803 17.5987 7.86297 19.2773 8.01483Z\" fill=\"black\"/>\n                        </svg>\n\n                        Наличными</label>\n                </div>\n                <div class=\"cart-order-summary__radio-button-box\">\n                    <input class=\"card\" id=\"radio-5\" type=\"radio\" name=\"payment-method\" value=\"2\">\n                    <label class=\"button cart-order-summary__radio-button\" for=\"radio-5\">\n                        <svg class=\"cart-order-summary__radio-button-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M19.1838 4.91224L12.0001 4.74976L4.81639 4.91224C3.48523 4.94235 2.35813 5.90297 2.11744 7.21254C1.53572 10.3776 1.53572 13.6223 2.11744 16.7874C2.35813 18.0969 3.48523 19.0575 4.81639 19.0876L12.0001 19.2501L19.1838 19.0876C20.515 19.0575 21.6421 18.0969 21.8828 16.7874C22.4645 13.6223 22.4645 10.3776 21.8828 7.21254C21.6421 5.90297 20.515 4.94235 19.1838 4.91224ZM4.85031 6.41186L12.0001 6.25014L19.1499 6.41186C19.7702 6.42589 20.2953 6.87349 20.4075 7.48369C20.5608 8.31767 20.6712 9.15752 20.7389 9.99994H3.26133C3.32899 9.15752 3.43945 8.31767 3.59273 7.48369C3.70488 6.87349 4.23006 6.42589 4.85031 6.41186ZM3.18115 11.9999C3.18115 13.5116 3.31835 15.0233 3.59273 16.5162C3.70488 17.1264 4.23006 17.574 4.85031 17.588L12.0001 17.7498L19.1499 17.588C19.7702 17.574 20.2953 17.1264 20.4075 16.5162C20.6819 15.0233 20.8191 13.5116 20.8191 11.9999H3.18115Z\" fill=\"black\"/>\n                        </svg>\n\n                        Картой</label>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"cart-order-summary__summary\">\n            <div class=\"cart-order-summary__promocode-wrapper\">\n                <input placeholder=\"У меня есть промокод\" class=\"input cart-order-summary__input\">\n                <div class=\"button button_color_black cart-order-summary__promocode-button\">Применить</div>\n            </div>\n            <div class=\"cart-order-summary__summary-text-box\">\n                <div class=\"cart-order-summary__summary-title\">\n                    Итого\n                </div>\n                <div class=\"cart-order-summary__summary-cost\"> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"sumCost") || (depth0 != null ? lookupProperty(depth0,"sumCost") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"sumCost","hash":{},"data":data,"loc":{"start":{"line":38,"column":63},"end":{"line":38,"column":74}}}) : helper)))
    + " ₽</div>\n            </div>\n            <div class=\"button button_shape_rounded cart-order-summary__pay-button button_color_black\">Сделать заказ</div>\n        </div>\n</div>";
},"useData":true});
templates['confirmPopup.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"confirm-popup-wrapper\">\n    <div class=\"confirm-popup\">\n        <div class=\"confirm-popup__header\">\n            <div class=\"confirm-popup__title\">\n                Онлайн оплата\n            </div>\n            <svg class=\"confirm-popup__close-button\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.46458 15.5354L15.5356 8.46436\" stroke=\"black\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                <path d=\"M8.46458 8.46458L15.5356 15.5356\" stroke=\"black\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n            </svg>\n        </div>\n        <div class=\"confirm-popup__body\">\n            <div class=\"confirm-popup__card-wrapper\">\n                <div class=\"confirm-popup__info-wrapper\">\n                    <div class=\"confirm-popup__summary-title\">\n                        Итого к оплате:\n                    </div>\n                    <div class=\"confirm-popup__summary-val\">\n                        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"sumCost") || (depth0 != null ? lookupProperty(depth0,"sumCost") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"sumCost","hash":{},"data":data,"loc":{"start":{"line":19,"column":24},"end":{"line":19,"column":35}}}) : helper)))
    + " ₽\n                    </div>\n                </div>\n                <div class=\"card\">\n                    <div class=\"card__row\">\n                        <input type=\"number\" placeholder=\"Номер карты\" class=\"input card__input\">\n                        <input type=\"number\" placeholder=\"ММ/ГГ\" class=\"input card__input card__input__fs_3\">\n                    </div>\n                    <div class=\"card__row card__row-mt\">\n                        <div class=\"card__cvv-note\">\n                            Последние цифры <br>\n                            на обороте карты\n                        </div>\n                        <input type=\"number\" placeholder=\"CVV\" class=\"input card__input card__input__fs_3\">\n                    </div>\n                </div>\n                <div class=\"button button_color_black confirm-popup__pay-button\">\n                    Оплатить\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['continuePopup.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"continue-popup-wrapper\">\n    <div class=\"continue-popup\">\n        <div class=\"continue-popup__title\">\n            Оформить заказ из ресторана "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"new") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n        </div>\n        <div class=\"continue-popup__info\">\n            Все ранее добавленые блюда из ресторана "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"old") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + " будут удалены из корзины\n        </div>\n        <div class=\"continue-popup__button-wrapper\">\n            <div class=\"button button_color_green continue-popup__button continue-popup-cancel\">Отмена</div>\n            <div class=\"button button_color_black continue-popup__button continue-popup__button-m continue-popup-continue\">Продолжить</div>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['dish.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div href=\"dish/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":16},"end":{"line":1,"column":22}}}) : helper)))
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":28},"end":{"line":1,"column":34}}}) : helper)))
    + "\" class=\"dish\">\n    <div class=\"dish__text\">\n        <div class=\"dish__title\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":12},"end":{"line":4,"column":20}}}) : helper)))
    + "\n        </div>\n\n        <div class=\"dish__info\">\n            "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":8,"column":12},"end":{"line":8,"column":20}}}) : helper)))
    + " ₽ • "
    + alias4(((helper = (helper = lookupProperty(helpers,"ccal") || (depth0 != null ? lookupProperty(depth0,"ccal") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ccal","hash":{},"data":data,"loc":{"start":{"line":8,"column":25},"end":{"line":8,"column":33}}}) : helper)))
    + " ккал\n        </div>\n    </div>\n    <div class=\"dish__image-box\">\n        <img class=\"dish__image\" loading=\"lazy\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":12,"column":53},"end":{"line":12,"column":60}}}) : helper)))
    + "\">\n    </div>\n</div>";
},"useData":true});
templates['dishPopup.hbs'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"dish-popup__checkboxes-wrapper-title\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":28,"column":20},"end":{"line":28,"column":30}}}) : helper)))
    + "*\n                </div>\n                <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"rId") || (depth0 != null ? lookupProperty(depth0,"rId") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rId","hash":{},"data":data,"loc":{"start":{"line":30,"column":25},"end":{"line":30,"column":32}}}) : helper)))
    + "\" class=\"dish-popup__checkboxes-wrapper radio-wrapper\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"opt") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":31,"column":20},"end":{"line":41,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"dish-popup__radio-row\">\n                            <label class=\"container\">\n                                <input id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":34,"column":43},"end":{"line":34,"column":49}}}) : helper)))
    + "\" type=\"radio\" name=\""
    + alias4(container.lambda((depths[1] != null ? lookupProperty(depths[1],"name") : depths[1]), depth0))
    + "\">\n                                <span class=\"checkmark checkmark-radius\"></span>\n                            </label>\n                            <div class=\"dish-popup__checkbox-title\">\n                                "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":38,"column":32},"end":{"line":38,"column":42}}}) : helper)))
    + "\n                            </div>\n                        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":51,"column":33},"end":{"line":51,"column":39}}}) : helper)))
    + "\" class=\"dish-popup__checkbox-row\">\n                            <label class=\"container\">\n                                <input class=\"dish-popup__checkbox-input\" type=\"checkbox\">\n                                <span class=\"checkmark \"></span>\n                            </label>\n                            <div class=\"dish-popup__checkbox-title\">\n                                "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":57,"column":32},"end":{"line":57,"column":42}}}) : helper)))
    + "\n                            </div>\n                            <div class=\"dish-popup__add-item-cost\">\n                                +\n                                <div class=\"dish-popup__checkbox-cost\">\n                                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":62,"column":36},"end":{"line":62,"column":46}}}) : helper)))
    + "\n                                </div>\n                                 ₽\n                            </div>\n                        </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"dish-popup-wrapper\">\n    <div class=\"overflow-wrap\">\n    <div class=\"dish-popup\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":3,"column":32},"end":{"line":3,"column":38}}}) : helper)))
    + "\">\n        <div class=\"dish-popup__main-info\">\n            <div class=\"dish-popup__close-button-wrapper\">\n                <div class=\"button button_color_white dish-popup__close-button\">\n                    <svg width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M8.46458 15.5354L15.5356 8.46436\" stroke=\"black\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                        <path d=\"M8.46458 8.46458L15.5356 15.5356\" stroke=\"black\" stroke-width=\"3\" stroke-linecap=\"round\"/>\n                    </svg>\n                </div>\n            </div>\n            <div class=\"dish-popup__image-wrapper\">\n                <img class=\"dish-popup__image\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":14,"column":52},"end":{"line":14,"column":59}}}) : helper)))
    + "\">\n            </div>\n\n            <div class=\"dish-popup__dish-title\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":18,"column":26}}}) : helper)))
    + "\n            </div>\n        </div>\n        <div class=\"dish-popup__dish-setting\">\n            <div class=\"dish-popup__description\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"desc") || (depth0 != null ? lookupProperty(depth0,"desc") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"desc","hash":{},"data":data,"loc":{"start":{"line":23,"column":16},"end":{"line":23,"column":26}}}) : helper)))
    + "\n<!--                Неподражаемые Чикен Макнаггетс – это сочное 100% белое куриное мясо в хрустящей панировке со специями. Только натуральная курочка без искусственных красителей и ароматизаторов и без консервантов-->\n            </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"radios") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":26,"column":12},"end":{"line":43,"column":21}}})) != null ? stack1 : "")
    + "\n\n                <div class=\"dish-popup__checkboxes-wrapper-title\">\n                    Хотите добавить ингридиенты?\n                </div>\n                <div class=\"dish-popup__checkboxes-wrapper\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"ingredients") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":20},"end":{"line":67,"column":29}}})) != null ? stack1 : "")
    + "                </div>\n            <div class=\"cart__required\">* - обязательные</div>\n        </div>\n        <div class=\"dish-popup__selector-buy-button-box\">\n            <div class=\"dish-popup__num-selector-box\">\n                <div class=\"button minus dish-popup__selector-button\">\n                    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M7 12L17 12\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                    </svg>\n                </div>\n                <div class=\"dish-popup__number\">1</div>\n                <div class=\"button plus dish-popup__selector-button\">\n                    <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M12 17V7\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                        <path d=\"M7 12L17 12\" stroke=\"black\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n                    </svg>\n                </div>\n            </div>\n            <div class=\"button button_color_black button_shape_rounded dish-popup__buy-button\">\n                Добавить в корзину\n                <div class=\"dish-popup__cost\">\n                    <div class=\"dish-popup__summary-cost\">\n                        "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":90,"column":24},"end":{"line":90,"column":34}}}) : helper)))
    + "\n                    </div>\n                     ₽\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n</div>";
},"useData":true,"useDepths":true});
templates['footer.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"footer\">\n    <div class=\"footer__upper-footer\">\n        <div class=\"footer__image\">\n            <img class=\"footer__logo\" src=\"../../assets/images/logoWhite1.svg\" height=\"120\" alt=\"\">\n        </div>\n        <div class=\"footer__navigation\">\n            <ul class=\"footer__navigation-ul\">\n                <li><a href=\"\" class=\"footer__help\">Помощь</a></li>\n                <li><a href=\"\" class=\"footer__help\">Войти для доставки</a></li>\n                <li><a href=\"\" class=\"footer__help\">Рестораны рядом со мной</a></li>\n                <li><a href=\"\" class=\"footer__help\">Контакты</a></li>\n                <li><a href=\"\" class=\"footer__help\">HMEats для ресторанов</a></li>\n                <li><a href=\"\" class=\"footer__help\">HMEats для курьеров</a></li>\n            </ul>\n        </div>\n    </div>\n    <hr class=\"footer__line\">\n    <div class=\"footer__lower-footer\">\n        <h3 class=\"footer__title\">© 2021 HOT TECHNOLOGIES INC.</h3>\n    </div>\n</div>";
},"useData":true});
templates['header.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "            <button href=\"login\" class=\"right-box__spacer button button_shape_rounded button_width_s button_hover_gray\">\n                Войти\n            </button>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header\">\n    <div class=\"header__content\">\n        <div class=\"left-box\">\n            <button href=\"navbar\" class=\"button button_color_white nav-button\">\n                <svg href=\"navbar\" class=\"button__icon_nav\" width=\"26\" height=\"20\" viewBox=\"0 0 26 20\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path href=\"navbar\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M25.9163 10.0001C25.9163 9.30973 25.3567 8.75008 24.6663 8.75008H1.33301C0.642651 8.75008 0.0830078 9.30973 0.0830078 10.0001C0.0830078 10.6904 0.642651 11.2501 1.33301 11.2501H24.6663C25.3567 11.2501 25.9163 10.6904 25.9163 10.0001Z\"\n                          fill=\"black\"/>\n                    <path href=\"navbar\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M25.9163 1.66675C25.9163 0.976392 25.3567 0.416748 24.6663 0.416748H1.33301C0.642651 0.416748 0.0830078 0.976392 0.0830078 1.66675C0.0830078 2.3571 0.642651 2.91675 1.33301 2.91675H24.6663C25.3567 2.91675 25.9163 2.3571 25.9163 1.66675Z\"\n                          fill=\"black\"/>\n                    <path href=\"navbar\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M25.9163 18.3334C25.9163 17.6431 25.3567 17.0834 24.6663 17.0834H1.33301C0.642651 17.0834 0.0830078 17.6431 0.0830078 18.3334C0.0830078 19.0238 0.642651 19.5834 1.33301 19.5834H24.6663C25.3567 19.5834 25.9163 19.0238 25.9163 18.3334Z\"\n                          fill=\"black\"/>\n                </svg>\n            </button>\n            <img href=\"home\" class=\"header__logo\" src=\"../../assets/images/logo1.svg\" height=\"56\" alt=\"logo\"/>\n        </div>\n\n        <div class=\"right-box\">\n            <button class=\"right-box__spacer button button_shape_rounded button_color_gray button_hover_gray\">\n                <svg class=\"button__icon\" width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M3.46851 6.25C3.46851 5.12817 4.37793 4.21875 5.49976 4.21875C6.62158 4.21875 7.53101 5.12817 7.53101 6.25C7.53101 7.37183 6.62158 8.28125 5.49976 8.28125C4.37793 8.28125 3.46851 7.37183 3.46851 6.25Z\"\n                          fill=\"black\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M0.35822 5.54837C0.572994 2.94278 2.75036 0.9375 5.36479 0.9375H5.63475C8.24918 0.9375 10.4265 2.94278 10.6413 5.54837C10.757 6.95124 10.3236 8.34424 9.43258 9.43395L6.43692 13.0976C5.95256 13.6899 5.04698 13.6899 4.56262 13.0976L1.56696 9.43395C0.675922 8.34424 0.242584 6.95124 0.35822 5.54837ZM5.49976 3.28125C3.86016 3.28125 2.53101 4.6104 2.53101 6.25C2.53101 7.8896 3.86016 9.21875 5.49976 9.21875C7.13935 9.21875 8.46851 7.8896 8.46851 6.25C8.46851 4.6104 7.13935 3.28125 5.49976 3.28125Z\"\n                          fill=\"black\"/>\n                </svg>\n                Москва\n            </button>\n            <label class=\"right-box__spacer search-input__label search-input__label_size_m\">\n                <svg class=\"search-label__icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M14.3854 15.4458C11.7351 17.5685 7.85569 17.4014 5.3989 14.9446C2.76287 12.3086 2.76287 8.0347 5.3989 5.39866C8.03494 2.76262 12.3088 2.76262 14.9448 5.39866C17.4016 7.85544 17.5687 11.7349 15.446 14.3851L20.6017 19.5408C20.8946 19.8337 20.8946 20.3085 20.6017 20.6014C20.3088 20.8943 19.8339 20.8943 19.541 20.6014L14.3854 15.4458ZM6.45956 13.8839C4.40931 11.8337 4.40931 8.50957 6.45956 6.45932C8.50982 4.40907 11.8339 4.40907 13.8842 6.45932C15.9329 8.50807 15.9344 11.8288 13.8887 13.8794C13.8872 13.8809 13.8857 13.8824 13.8842 13.8839C13.8827 13.8854 13.8812 13.8869 13.8797 13.8884C11.8291 15.9342 8.50831 15.9327 6.45956 13.8839Z\"\n                          fill=\"black\"/>\n                </svg>\n                <input class=\"search-input\" placeholder=\"Что-то ищите?\"/>\n            </label>\n\n            <button class=\"right-box__spacer button button_shape_rounded button_color_black\">\n                <div class=\"button__container\">\n                <svg class=\"button__icon\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M18.1477 3.25H4.33514L3.15497 1.1346C3.0225 0.897154 2.7719 0.75 2.5 0.75H1C0.585786 0.75 0.25 1.08579 0.25 1.5C0.25 1.91421 0.585786 2.25 1 2.25H2.0596L3.22429 4.33765L5.91037 10.2809L5.91312 10.2869L6.14971 10.8104L3.45287 13.687C3.25895 13.8939 3.19825 14.1924 3.29599 14.4585C3.39372 14.7247 3.63317 14.913 3.91486 14.9452L6.37299 15.2261C9.44767 15.5775 12.5524 15.5775 15.627 15.2261L18.0852 14.9452C18.4967 14.8981 18.7922 14.5264 18.7452 14.1148C18.6981 13.7033 18.3264 13.4078 17.9149 13.4549L15.4567 13.7358C12.4952 14.0742 9.50481 14.0742 6.54331 13.7358L5.56779 13.6243L7.54717 11.513C7.56632 11.4925 7.5841 11.4713 7.60052 11.4494L8.35334 11.5474C9.40826 11.6847 10.4746 11.7116 11.5351 11.6277C14.0086 11.4321 16.301 10.2551 17.9015 8.35907L18.4795 7.67425C18.499 7.65125 18.517 7.62711 18.5335 7.60194L19.6109 5.96009C20.3745 4.79633 19.5397 3.25 18.1477 3.25ZM7.65627 9.94405C7.49086 9.92253 7.34823 9.81745 7.27858 9.66604L7.27725 9.66311L5.05674 4.75H18.1477C18.3466 4.75 18.4658 4.9709 18.3567 5.13716L17.3042 6.74123L16.7552 7.39152C15.4132 8.98139 13.4909 9.96832 11.4169 10.1324C10.4603 10.208 9.49842 10.1837 8.54688 10.0599L7.65627 9.94405Z\"\n                          fill=\"white\"/>\n                    <path d=\"M5.5 16.5C4.67157 16.5 4 17.1716 4 18C4 18.8284 4.67157 19.5 5.5 19.5C6.32843 19.5 7 18.8284 7 18C7 17.1716 6.32843 16.5 5.5 16.5Z\"\n                          fill=\"white\"/>\n                    <path d=\"M15 18C15 17.1716 15.6716 16.5 16.5 16.5C17.3284 16.5 18 17.1716 18 18C18 18.8284 17.3284 19.5 16.5 19.5C15.6716 19.5 15 18.8284 15 18Z\"\n                          fill=\"white\"/>\n                </svg>\n                Корзина\n                </div>\n            </button>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"auth") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":58,"column":12},"end":{"line":62,"column":23}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>";
},"useData":true});
templates['historyOrder.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"history-order__status history-order__row-margin history-order__status_done\">\n                    Выполнен\n                </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"history-order__status history-order__row-margin history-order__status_cancel\">\n                    Отменен\n                </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"history-order__item\">\n                <div class=\"order__item-title\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":33,"column":20},"end":{"line":33,"column":30}}}) : helper)))
    + "\n                </div>\n\n                <div class=\"history-order__item-num\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"num") || (depth0 != null ? lookupProperty(depth0,"num") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"num","hash":{},"data":data,"loc":{"start":{"line":37,"column":20},"end":{"line":37,"column":29}}}) : helper)))
    + " шт\n                </div>\n\n                <div class=\"history-order__item-cost\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":41,"column":20},"end":{"line":41,"column":30}}}) : helper)))
    + " ₽\n                </div>\n            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"history-order\">\n    <div class=\"history-order__main-info\">\n        <div class=\"history-order__main-info-text\">\n            <div class=\"history-order__restaurant-title history-order__row-margin\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"restaurantTitle") || (depth0 != null ? lookupProperty(depth0,"restaurantTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"restaurantTitle","hash":{},"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":5,"column":35}}}) : helper)))
    + "\n            </div>\n            <div class=\"history-order__date history-order__row-margin\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":24}}}) : helper)))
    + "\n<!--                2 октября 2021, 14:07-->\n            </div>\n            <div class=\"history-order__address history-order__row-margin\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"address") || (depth0 != null ? lookupProperty(depth0,"address") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"address","hash":{},"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":12,"column":27}}}) : helper)))
    + "\n<!--                Россия, Москва, ул. Пушкина д. 14к2-->\n            </div>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"status") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":15,"column":12},"end":{"line":23,"column":19}}})) != null ? stack1 : "")
    + "        </div>\n        <div class=\"history-order__image-wrapper\">\n            <img class=\"history-order__main-info-img\" src=\"http://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/96672465571661.5afc10a864fc2.jpg\" alt=\"rest image\">\n        </div>\n    </div>\n    <div class=\"history-order__info\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":8},"end":{"line":44,"column":17}}})) != null ? stack1 : "")
    + "        <div class=\"history-order__item\">\n            <div class=\"history-order__delivery-title\">\n                Доставка\n            </div>\n\n            <div class=\"history-order__delivery-cost\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"deliveryCost") || (depth0 != null ? lookupProperty(depth0,"deliveryCost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"deliveryCost","hash":{},"data":data,"loc":{"start":{"line":51,"column":16},"end":{"line":51,"column":32}}}) : helper)))
    + " ₽\n            </div>\n        </div>\n        <div class=\"history-order__summary\">\n            <div class=\"order__summary-title\">\n                Итого\n            </div>\n\n            <div class=\"history-order__summary-cost\">\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"summaryCost") || (depth0 != null ? lookupProperty(depth0,"summaryCost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"summaryCost","hash":{},"data":data,"loc":{"start":{"line":60,"column":16},"end":{"line":60,"column":33}}}) : helper)))
    + " ₽\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['navbar.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <div class=\"navbar__button-cart-number-wrapper\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"itemNum") || (depth0 != null ? lookupProperty(depth0,"itemNum") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"itemNum","hash":{},"data":data,"loc":{"start":{"line":64,"column":72},"end":{"line":64,"column":83}}}) : helper)))
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <a href=\"login\">\n                    <button class=\"right-box__spacer button button_shape_rounded button_width_s button_hover_gray\">\n                    Войти\n                </button>\n                </a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"nav-profile\">\n                <div class=\"nav-profile__img-box\">\n                    <div class=\"nav-profile__img\"></div>\n                </div>\n                <div class=\"nav-profile__text-box\">\n                    "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "<br>\n                    <a class=\"nav-profile__link\" href=\"profile\">Просмотреть аккаунт</a>\n                </div>\n            </div>\n\n            <a href=\"history\">\n                <button class=\"button navbar__button button_color_white button_hover_disabled\">\n                <svg class=\"button__icon\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.57487 3.42572C7.24095 2.02537 4.38656 1.79666 1.85944 2.80751C1.49136 2.95474 1.25 3.31123 1.25 3.70767V13.4234C1.25 14.0742 1.9073 14.5192 2.51156 14.2775C4.58101 13.4497 6.91846 13.637 8.8297 14.7838L9.77576 15.3514C9.84791 15.3947 9.92509 15.4136 10 15.4123C10.0749 15.4136 10.1521 15.3947 10.2242 15.3514L11.1703 14.7838C13.0815 13.637 15.419 13.4497 17.4884 14.2775C18.0927 14.5192 18.75 14.0742 18.75 13.4234V3.70767C18.75 3.31123 18.5086 2.95474 18.1406 2.80751C15.6134 1.79666 12.759 2.02537 10.4251 3.42572L10 3.6808L9.57487 3.42572ZM10.625 5.41671C10.625 5.07153 10.3452 4.79171 10 4.79171C9.65482 4.79171 9.375 5.07153 9.375 5.41671V13.3334C9.375 13.6786 9.65482 13.9584 10 13.9584C10.3452 13.9584 10.625 13.6786 10.625 13.3334V5.41671Z\" fill=\"black\"/>\n                    <path d=\"M2.2707 15.8686C3.95725 14.8848 6.04275 14.8848 7.7293 15.8686L8.63535 16.3971C9.47862 16.889 10.5214 16.889 11.3647 16.3971L12.2707 15.8686C13.9572 14.8848 16.0428 14.8848 17.7293 15.8686L17.8149 15.9185C18.1131 16.0924 18.2138 16.4751 18.0399 16.7733C17.8659 17.0715 17.4832 17.1722 17.1851 16.9982L17.0995 16.9483C15.8021 16.1915 14.1979 16.1915 12.9005 16.9483L11.9945 17.4768C10.762 18.1958 9.23799 18.1958 8.00551 17.4768L7.09946 16.9483C5.80212 16.1915 4.19788 16.1915 2.90054 16.9483L2.81492 16.9982C2.51676 17.1722 2.13406 17.0715 1.96014 16.7733C1.78621 16.4751 1.88692 16.0924 2.18508 15.9185L2.2707 15.8686Z\" fill=\"black\"/>\n                </svg>\n                История заказов\n            </button>\n            </a>\n            <a href=\"/\">\n                <button class=\"button navbar__button button_color_white button_hover_disabled\">\n                <svg class=\"button__icon\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M7.00016 4.375C4.68278 4.375 2.7085 6.10775 2.7085 8.35816C2.7085 9.91062 3.43545 11.2177 4.3989 12.3004C5.35905 13.3793 6.59778 14.285 7.71764 15.043L9.64982 16.3509C9.86142 16.4941 10.1389 16.4941 10.3505 16.3509L12.2827 15.043C13.4025 14.285 14.6413 13.3793 15.6014 12.3004C16.5649 11.2177 17.2918 9.91062 17.2918 8.35816C17.2918 6.10775 15.3175 4.375 13.0002 4.375C11.8056 4.375 10.7545 4.93512 10.0002 5.65986C9.24586 4.93512 8.19472 4.375 7.00016 4.375Z\" fill=\"black\"/>\n                </svg>\n\n                Избранное\n            </button>\n            </a>\n        <a href=\"/\">\n            <button class=\"button navbar__button button_color_white button_hover_disabled\">\n                <svg class=\"button__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M14.506 3.73882C14.7545 3.9435 14.9613 4.19734 15.1116 4.48634C15.1592 4.57779 15.1235 4.68851 15.0359 4.74276L9.81427 7.9752C8.69438 8.66847 7.28228 8.68301 6.14835 8.01296L0.89183 4.90683C0.806905 4.85665 0.767923 4.75335 0.806196 4.66243C0.958369 4.30095 1.19552 3.98574 1.49221 3.7407L1.49192 3.73822L1.50214 3.73254C1.72168 3.55318 1.97338 3.41205 2.24704 3.3187L5.67194 1.41598C7.11913 0.61199 8.87883 0.611989 10.326 1.41598L13.7469 3.31647C14.0254 3.41055 14.2812 3.55405 14.5038 3.73695L14.506 3.73882Z\" fill=\"black\"/>\n                    <path d=\"M0.490963 6.46168C0.506113 6.31148 0.671949 6.22883 0.801919 6.30563L5.51244 9.08912C7.04658 9.99566 8.95707 9.97598 10.4722 9.03803L15.176 6.12615C15.3054 6.04607 15.474 6.12719 15.4904 6.27846C15.7238 8.43468 15.679 10.6134 15.356 12.761C15.1906 13.8611 14.2928 14.7045 13.1845 14.8008L11.926 14.9102C9.31375 15.1373 6.68677 15.1373 4.07457 14.9102L2.81605 14.8008C1.70776 14.7045 0.809919 13.8611 0.644491 12.761C0.330693 10.6742 0.279517 8.55804 0.490963 6.46168Z\" fill=\"black\"/>\n                </svg>\n\n                Кошельки\n            </button>\n        </a>\n        <a href=\"logout\">\n            <button class=\"button navbar__button button_color_white navbar__gray-button button_hover_disabled\">Выйти</button>\n        </a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        <a class=\"hamburger__a\" href=\"login\">\n            <button class=\"button button_shape_rounded navbar__button_align-text_center navbar__button button_color_black\">Войти</button>\n        </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"header\">\n    <div class=\"header__content\">\n        <div class=\"left-box\">\n            <button class=\"button button_color_white nav-button\">\n                <svg href=\"navbar\" class=\"button__icon_nav\" width=\"26\" height=\"20\" viewBox=\"0 0 26 20\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path href=\"navbar\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M25.9163 10.0001C25.9163 9.30973 25.3567 8.75008 24.6663 8.75008H1.33301C0.642651 8.75008 0.0830078 9.30973 0.0830078 10.0001C0.0830078 10.6904 0.642651 11.2501 1.33301 11.2501H24.6663C25.3567 11.2501 25.9163 10.6904 25.9163 10.0001Z\"\n                          fill=\"black\"/>\n                    <path href=\"navbar\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M25.9163 1.66675C25.9163 0.976392 25.3567 0.416748 24.6663 0.416748H1.33301C0.642651 0.416748 0.0830078 0.976392 0.0830078 1.66675C0.0830078 2.3571 0.642651 2.91675 1.33301 2.91675H24.6663C25.3567 2.91675 25.9163 2.3571 25.9163 1.66675Z\"\n                          fill=\"black\"/>\n                    <path href=\"navbar\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M25.9163 18.3334C25.9163 17.6431 25.3567 17.0834 24.6663 17.0834H1.33301C0.642651 17.0834 0.0830078 17.6431 0.0830078 18.3334C0.0830078 19.0238 0.642651 19.5834 1.33301 19.5834H24.6663C25.3567 19.5834 25.9163 19.0238 25.9163 18.3334Z\"\n                          fill=\"black\"/>\n                </svg>\n            </button>\n\n            <a href=\"/\">\n                <img class=\"header__logo\" src=\"../../assets/images/logo1.svg\" height=\"56\" alt=\"logo\"/>\n            </a>\n        </div>\n\n        <div class=\"right-box\">\n            <a href=\"/\">\n                <button class=\"right-box__spacer button button_shape_rounded button_color_gray button_hover_gray\">\n                    <svg class=\"button__icon\" width=\"11\" height=\"14\" viewBox=\"0 0 11 14\" fill=\"none\"\n                         xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M3.46851 6.25C3.46851 5.12817 4.37793 4.21875 5.49976 4.21875C6.62158 4.21875 7.53101 5.12817 7.53101 6.25C7.53101 7.37183 6.62158 8.28125 5.49976 8.28125C4.37793 8.28125 3.46851 7.37183 3.46851 6.25Z\"\n                              fill=\"black\"/>\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M0.35822 5.54837C0.572994 2.94278 2.75036 0.9375 5.36479 0.9375H5.63475C8.24918 0.9375 10.4265 2.94278 10.6413 5.54837C10.757 6.95124 10.3236 8.34424 9.43258 9.43395L6.43692 13.0976C5.95256 13.6899 5.04698 13.6899 4.56262 13.0976L1.56696 9.43395C0.675922 8.34424 0.242584 6.95124 0.35822 5.54837ZM5.49976 3.28125C3.86016 3.28125 2.53101 4.6104 2.53101 6.25C2.53101 7.8896 3.86016 9.21875 5.49976 9.21875C7.13935 9.21875 8.46851 7.8896 8.46851 6.25C8.46851 4.6104 7.13935 3.28125 5.49976 3.28125Z\"\n                              fill=\"black\"/>\n                    </svg>\n                    Москва\n                </button>\n            </a>\n\n            <label class=\"right-box__spacer search-input__label search-input__label_size_m\">\n                <svg class=\"search-label__icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                          d=\"M14.3854 15.4458C11.7351 17.5685 7.85569 17.4014 5.3989 14.9446C2.76287 12.3086 2.76287 8.0347 5.3989 5.39866C8.03494 2.76262 12.3088 2.76262 14.9448 5.39866C17.4016 7.85544 17.5687 11.7349 15.446 14.3851L20.6017 19.5408C20.8946 19.8337 20.8946 20.3085 20.6017 20.6014C20.3088 20.8943 19.8339 20.8943 19.541 20.6014L14.3854 15.4458ZM6.45956 13.8839C4.40931 11.8337 4.40931 8.50957 6.45956 6.45932C8.50982 4.40907 11.8339 4.40907 13.8842 6.45932C15.9329 8.50807 15.9344 11.8288 13.8887 13.8794C13.8872 13.8809 13.8857 13.8824 13.8842 13.8839C13.8827 13.8854 13.8812 13.8869 13.8797 13.8884C11.8291 15.9342 8.50831 15.9327 6.45956 13.8839Z\"\n                          fill=\"black\"/>\n                </svg>\n                <input class=\"search-input\" placeholder=\"Что-то ищите?\"/>\n            </label>\n\n            <a href=\"checkout\">\n                <button class=\"right-box__spacer button button_shape_rounded button_color_black\">\n                <div class=\"button__container\">\n                    <svg class=\"button__icon\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\"\n                         xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                              d=\"M18.1477 3.25H4.33514L3.15497 1.1346C3.0225 0.897154 2.7719 0.75 2.5 0.75H1C0.585786 0.75 0.25 1.08579 0.25 1.5C0.25 1.91421 0.585786 2.25 1 2.25H2.0596L3.22429 4.33765L5.91037 10.2809L5.91312 10.2869L6.14971 10.8104L3.45287 13.687C3.25895 13.8939 3.19825 14.1924 3.29599 14.4585C3.39372 14.7247 3.63317 14.913 3.91486 14.9452L6.37299 15.2261C9.44767 15.5775 12.5524 15.5775 15.627 15.2261L18.0852 14.9452C18.4967 14.8981 18.7922 14.5264 18.7452 14.1148C18.6981 13.7033 18.3264 13.4078 17.9149 13.4549L15.4567 13.7358C12.4952 14.0742 9.50481 14.0742 6.54331 13.7358L5.56779 13.6243L7.54717 11.513C7.56632 11.4925 7.5841 11.4713 7.60052 11.4494L8.35334 11.5474C9.40826 11.6847 10.4746 11.7116 11.5351 11.6277C14.0086 11.4321 16.301 10.2551 17.9015 8.35907L18.4795 7.67425C18.499 7.65125 18.517 7.62711 18.5335 7.60194L19.6109 5.96009C20.3745 4.79633 19.5397 3.25 18.1477 3.25ZM7.65627 9.94405C7.49086 9.92253 7.34823 9.81745 7.27858 9.66604L7.27725 9.66311L5.05674 4.75H18.1477C18.3466 4.75 18.4658 4.9709 18.3567 5.13716L17.3042 6.74123L16.7552 7.39152C15.4132 8.98139 13.4909 9.96832 11.4169 10.1324C10.4603 10.208 9.49842 10.1837 8.54688 10.0599L7.65627 9.94405Z\"\n                              fill=\"white\"/>\n                        <path d=\"M5.5 16.5C4.67157 16.5 4 17.1716 4 18C4 18.8284 4.67157 19.5 5.5 19.5C6.32843 19.5 7 18.8284 7 18C7 17.1716 6.32843 16.5 5.5 16.5Z\"\n                              fill=\"white\"/>\n                        <path d=\"M15 18C15 17.1716 15.6716 16.5 16.5 16.5C17.3284 16.5 18 17.1716 18 18C18 18.8284 17.3284 19.5 16.5 19.5C15.6716 19.5 15 18.8284 15 18Z\"\n                              fill=\"white\"/>\n                    </svg>\n                    Корзина\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"itemNum") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":63,"column":20},"end":{"line":65,"column":27}}})) != null ? stack1 : "")
    + "                </div>\n            </button>\n            </a>\n"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"auth") : stack1),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":69,"column":12},"end":{"line":75,"column":23}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n</div>\n\n<div class=\"navbar-wrapper\">\n    <div class=\"navbar\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"auth") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":82,"column":8},"end":{"line":128,"column":15}}})) != null ? stack1 : "")
    + "        <hr class=\"navbar__line\">\n        <a href=\"/\">\n            <button class=\"button navbar__button button_color_white button_hover_disabled\">Войти как ресторан</button>\n        </a>\n        <a href=\"/\">\n            <button class=\"button navbar__button button_color_white button_hover_disabled\">Войти как доставщик</button>\n        </a>\n    </div>\n</div>";
},"useData":true});
templates['profileButtonsNav.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"profile-page__button_wrapper\">\n    <button class=\"button profile-page__button-color navbar__button button_color_white\">\n        <svg class=\"button__icon\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\"\n                  d=\"M9.57487 3.42572C7.24095 2.02537 4.38656 1.79666 1.85944 2.80751C1.49136 2.95474 1.25 3.31123 1.25 3.70767V13.4234C1.25 14.0742 1.9073 14.5192 2.51156 14.2775C4.58101 13.4497 6.91846 13.637 8.8297 14.7838L9.77576 15.3514C9.84791 15.3947 9.92509 15.4136 10 15.4123C10.0749 15.4136 10.1521 15.3947 10.2242 15.3514L11.1703 14.7838C13.0815 13.637 15.419 13.4497 17.4884 14.2775C18.0927 14.5192 18.75 14.0742 18.75 13.4234V3.70767C18.75 3.31123 18.5086 2.95474 18.1406 2.80751C15.6134 1.79666 12.759 2.02537 10.4251 3.42572L10 3.6808L9.57487 3.42572ZM10.625 5.41671C10.625 5.07153 10.3452 4.79171 10 4.79171C9.65482 4.79171 9.375 5.07153 9.375 5.41671V13.3334C9.375 13.6786 9.65482 13.9584 10 13.9584C10.3452 13.9584 10.625 13.6786 10.625 13.3334V5.41671Z\"\n                  fill=\"black\"/>\n            <path d=\"M2.2707 15.8686C3.95725 14.8848 6.04275 14.8848 7.7293 15.8686L8.63535 16.3971C9.47862 16.889 10.5214 16.889 11.3647 16.3971L12.2707 15.8686C13.9572 14.8848 16.0428 14.8848 17.7293 15.8686L17.8149 15.9185C18.1131 16.0924 18.2138 16.4751 18.0399 16.7733C17.8659 17.0715 17.4832 17.1722 17.1851 16.9982L17.0995 16.9483C15.8021 16.1915 14.1979 16.1915 12.9005 16.9483L11.9945 17.4768C10.762 18.1958 9.23799 18.1958 8.00551 17.4768L7.09946 16.9483C5.80212 16.1915 4.19788 16.1915 2.90054 16.9483L2.81492 16.9982C2.51676 17.1722 2.13406 17.0715 1.96014 16.7733C1.78621 16.4751 1.88692 16.0924 2.18508 15.9185L2.2707 15.8686Z\"\n                  fill=\"black\"/>\n        </svg>\n        История заказов\n    </button>\n    <button class=\"button profile-page__button-color navbar__button button_color_white\">\n        <svg class=\"button__icon\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M7.00016 4.375C4.68278 4.375 2.7085 6.10775 2.7085 8.35816C2.7085 9.91062 3.43545 11.2177 4.3989 12.3004C5.35905 13.3793 6.59778 14.285 7.71764 15.043L9.64982 16.3509C9.86142 16.4941 10.1389 16.4941 10.3505 16.3509L12.2827 15.043C13.4025 14.285 14.6413 13.3793 15.6014 12.3004C16.5649 11.2177 17.2918 9.91062 17.2918 8.35816C17.2918 6.10775 15.3175 4.375 13.0002 4.375C11.8056 4.375 10.7545 4.93512 10.0002 5.65986C9.24586 4.93512 8.19472 4.375 7.00016 4.375Z\"\n                  fill=\"black\"/>\n        </svg>\n\n        Избранное\n    </button>\n    <button class=\"button profile-page__button-color navbar__button button_color_white\">\n        <svg class=\"button__icon\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\"\n             xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M14.506 3.73882C14.7545 3.9435 14.9613 4.19734 15.1116 4.48634C15.1592 4.57779 15.1235 4.68851 15.0359 4.74276L9.81427 7.9752C8.69438 8.66847 7.28228 8.68301 6.14835 8.01296L0.89183 4.90683C0.806905 4.85665 0.767923 4.75335 0.806196 4.66243C0.958369 4.30095 1.19552 3.98574 1.49221 3.7407L1.49192 3.73822L1.50214 3.73254C1.72168 3.55318 1.97338 3.41205 2.24704 3.3187L5.67194 1.41598C7.11913 0.61199 8.87883 0.611989 10.326 1.41598L13.7469 3.31647C14.0254 3.41055 14.2812 3.55405 14.5038 3.73695L14.506 3.73882Z\"\n                  fill=\"black\"/>\n            <path d=\"M0.490963 6.46168C0.506113 6.31148 0.671949 6.22883 0.801919 6.30563L5.51244 9.08912C7.04658 9.99566 8.95707 9.97598 10.4722 9.03803L15.176 6.12615C15.3054 6.04607 15.474 6.12719 15.4904 6.27846C15.7238 8.43468 15.679 10.6134 15.356 12.761C15.1906 13.8611 14.2928 14.7045 13.1845 14.8008L11.926 14.9102C9.31375 15.1373 6.68677 15.1373 4.07457 14.9102L2.81605 14.8008C1.70776 14.7045 0.809919 13.8611 0.644491 12.761C0.330693 10.6742 0.279517 8.55804 0.490963 6.46168Z\"\n                  fill=\"black\"/>\n        </svg>\n\n        Кошельки\n    </button>\n</div>";
},"useData":true});
templates['promoBlock.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"promo-block\">\n    <div class=\"promo-block__left-box\">\n        <div class=\"promo-block__title\">\n            Самые вкусные наггетсы на свете!<br>Всего лишь по 60₽!\n        </div>\n\n        <button class=\"button button_height_s button_color_white button_shape_rounded promo-block__button\">\n            Перейти к акции\n            <svg width=\"14\" height=\"10\" viewBox=\"0 0 14 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.46967 1.53033C8.17678 1.23744 8.17678 0.762563 8.46967 0.46967C8.76256 0.176777 9.23744 0.176777 9.53033 0.46967L13.5303 4.46967C13.8232 4.76256 13.8232 5.23744 13.5303 5.53033L9.53033 9.53033C9.23744 9.82322 8.76256 9.82322 8.46967 9.53033C8.17678 9.23744 8.17678 8.76256 8.46967 8.46967L11.1893 5.75H1.5C1.08579 5.75 0.75 5.41421 0.75 5C0.75 4.58579 1.08579 4.25 1.5 4.25H11.1893L8.46967 1.53033Z\" fill=\"black\"/>\n            </svg>\n        </button>\n    </div>\n\n    <div class=\"promo-block__img-box\">\n        <img class=\"promo-block__img\" src=\"../../assets/images/image.jpeg\" alt=\"nuggetsImage\"/>\n    </div>\n</div>";
},"useData":true});
templates['restaurantBlock.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\"/restaurant/"
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":1,"column":21},"end":{"line":1,"column":29}}}) : helper)))
    + "/\" class=\"restaurant-block\">\n    <div class=\"restaurant-block__img-box\">\n        <img class=\"restaurant-block__img\" src="
    + alias4(((helper = (helper = lookupProperty(helpers,"img") || (depth0 != null ? lookupProperty(depth0,"img") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img","hash":{},"data":data,"loc":{"start":{"line":3,"column":47},"end":{"line":3,"column":56}}}) : helper)))
    + " alt=\"restaurant image\"/>\n    </div>\n\n    <div class=\"restaurant-block__information\">\n        <div class=\"restaurant-block__text-box\">\n            <div class=\"restaurant-block__restaurant-title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":8,"column":60},"end":{"line":8,"column":70}}}) : helper)))
    + "</div>\n            <div class=\"restaurant-block__delivery-info\">\n                <div class=\"information__delivery-cost\">от "
    + alias4(((helper = (helper = lookupProperty(helpers,"costFFD") || (depth0 != null ? lookupProperty(depth0,"costFFD") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"costFFD","hash":{},"data":data,"loc":{"start":{"line":10,"column":59},"end":{"line":10,"column":72}}}) : helper)))
    + "₽ Беспл. доставка</div>\n                <svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M9.37165 5.24686C9.5425 5.076 9.5425 4.799 9.37165 4.62814C9.2008 4.45729 8.92379 4.45729 8.75293 4.62814L6.9999 6.38117L5.24686 4.62814C5.07601 4.45729 4.799 4.45729 4.62815 4.62814C4.45729 4.799 4.45729 5.07601 4.62815 5.24686L6.38118 6.99989L4.62814 8.75293C4.45729 8.92378 4.45729 9.20079 4.62814 9.37165C4.799 9.5425 5.076 9.5425 5.24686 9.37165L6.9999 7.61861L8.75294 9.37165C8.92379 9.5425 9.2008 9.5425 9.37165 9.37165C9.54251 9.20079 9.54251 8.92378 9.37165 8.75293L7.61862 6.99989L9.37165 5.24686Z\" fill=\"black\"/>\n                </svg>\n                <div class=\"information__delivery-time\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"minDTime") || (depth0 != null ? lookupProperty(depth0,"minDTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minDTime","hash":{},"data":data,"loc":{"start":{"line":14,"column":56},"end":{"line":14,"column":70}}}) : helper)))
    + " - "
    + alias4(((helper = (helper = lookupProperty(helpers,"maxDTime") || (depth0 != null ? lookupProperty(depth0,"maxDTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maxDTime","hash":{},"data":data,"loc":{"start":{"line":14,"column":73},"end":{"line":14,"column":87}}}) : helper)))
    + " мин</div>\n            </div>\n        </div>\n\n        <div class=\"restaurant-block__rating\">\n            <div class=\"rating__text\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"rate") || (depth0 != null ? lookupProperty(depth0,"rate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rate","hash":{},"data":data,"loc":{"start":{"line":19,"column":38},"end":{"line":19,"column":48}}}) : helper)))
    + "</div>\n        </div>\n    </div>\n</a>";
},"useData":true});
templates['restaurantHeader.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"restaurant-header\">\n    <img class=\"restaurant-header__image\" src=\"https://d1ralsognjng37.cloudfront.net/8e66dfee-4f83-499a-8a17-342cf8e13ca0.jpeg\">\n    <div class=\"restaurant-header__gradient\">\n        <div class=\"restaurant-header__text\">\n            <div class=\"restaurant-header__title\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":50},"end":{"line":5,"column":58}}}) : helper)))
    + "</div>\n            <div class=\"restaurant-header__info\">Бесплатная доставка от "
    + alias4(((helper = (helper = lookupProperty(helpers,"cost") || (depth0 != null ? lookupProperty(depth0,"cost") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"cost","hash":{},"data":data,"loc":{"start":{"line":6,"column":72},"end":{"line":6,"column":80}}}) : helper)))
    + "₽   •   "
    + alias4(((helper = (helper = lookupProperty(helpers,"minDTime") || (depth0 != null ? lookupProperty(depth0,"minDTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"minDTime","hash":{},"data":data,"loc":{"start":{"line":6,"column":88},"end":{"line":6,"column":102}}}) : helper)))
    + "-"
    + alias4(((helper = (helper = lookupProperty(helpers,"maxDTime") || (depth0 != null ? lookupProperty(depth0,"maxDTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maxDTime","hash":{},"data":data,"loc":{"start":{"line":6,"column":103},"end":{"line":6,"column":117}}}) : helper)))
    + " Мин   •\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"rate") || (depth0 != null ? lookupProperty(depth0,"rate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rate","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":24}}}) : helper)))
    + "</div>\n        </div>\n        <div class=\"restaurant-header__right-box\">\n            <div class=\"button restaurant-header__button button_height_b button_shape_rounded button_color_white\">\n                <svg class=\"restaurant-header__button-icon\" width=\"18\" height=\"15\" viewBox=\"0 0 18 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M5 5.50004C4.30964 5.50004 3.75 6.05968 3.75 6.75004C3.75 7.44039 4.30964 8.00004 5 8.00004C5.69036 8.00004 6.25 7.44039 6.25 6.75004C6.25 6.05968 5.69036 5.50004 5 5.50004Z\" fill=\"black\"/>\n                    <path d=\"M9 5.50004C8.30964 5.50004 7.75 6.05968 7.75 6.75004C7.75 7.44039 8.30964 8.00004 9 8.00004C9.69036 8.00004 10.25 7.44039 10.25 6.75004C10.25 6.05968 9.69036 5.50004 9 5.50004Z\" fill=\"black\"/>\n                    <path d=\"M11.75 6.75004C11.75 6.05968 12.3096 5.50004 13 5.50004C13.6904 5.50004 14.25 6.05968 14.25 6.75004C14.25 7.44039 13.6904 8.00004 13 8.00004C12.3096 8.00004 11.75 7.44039 11.75 6.75004Z\" fill=\"black\"/>\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13.1007 0.592829C10.4065 0.36307 7.69826 0.349736 5.00194 0.552956L4.80871 0.56752C2.23741 0.761318 0.25 2.90415 0.25 5.48275V14C0.25 14.2639 0.388666 14.5084 0.615148 14.6438C0.841631 14.7792 1.12261 14.7856 1.35504 14.6607L5.26583 12.559C5.44774 12.4612 5.65104 12.41 5.85756 12.41H14.834C15.9661 12.41 16.9362 11.6006 17.1392 10.4869C17.5505 8.22966 17.5829 5.9197 17.2353 3.65179L17.1329 2.98346C16.9464 1.76671 15.951 0.835897 14.7245 0.731301L13.1007 0.592829ZM5.11468 2.04871C7.73103 1.85152 10.359 1.86446 12.9733 2.0874L14.597 2.22588C15.1334 2.27162 15.5686 2.67865 15.6502 3.21073L15.7526 3.87906C16.075 5.98234 16.0449 8.12463 15.6635 10.218C15.5904 10.6188 15.2413 10.91 14.834 10.91H5.85756C5.40322 10.91 4.95596 11.0226 4.55575 11.2377L1.75 12.7455V5.48275C1.75 3.68884 3.13262 2.1981 4.92144 2.06328L5.11468 2.04871Z\" fill=\"black\"/>\n                </svg>\n\n                Посмотреть отзывы</div>\n            <svg class=\"restaurant-header__love-icon\" width=\"18\" height=\"15\" viewBox=\"0 0 18 15\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path class=\"love-color\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0.25 5.0298C0.25 2.3293 2.61914 0.25 5.4 0.25C6.83347 0.25 8.09484 0.922139 9 1.79183C9.90516 0.922139 11.1665 0.25 12.6 0.25C15.3809 0.25 17.75 2.3293 17.75 5.0298C17.75 6.87967 16.9611 8.50644 15.8682 9.88154C14.7771 11.2543 13.35 12.4193 11.9835 13.366C11.4615 13.7276 10.9335 14.0611 10.4503 14.3072C9.99651 14.5383 9.47474 14.75 9 14.75C8.52526 14.75 8.00349 14.5383 7.54973 14.3072C7.06648 14.0611 6.53846 13.7276 6.01653 13.366C4.65005 12.4193 3.22287 11.2543 2.13182 9.88154C1.03888 8.50644 0.25 6.87967 0.25 5.0298ZM5.4 1.75C3.32075 1.75 1.75 3.2791 1.75 5.0298C1.75 6.43329 2.34579 7.74 3.30609 8.94822C4.26828 10.1588 5.56292 11.2269 6.87074 12.133C7.36562 12.4758 7.83174 12.7675 8.23045 12.9706C8.65865 13.1886 8.90666 13.25 9 13.25C9.09334 13.25 9.34135 13.1886 9.76955 12.9706C10.1683 12.7675 10.6344 12.4758 11.1293 12.133C12.4371 11.2269 13.7317 10.1588 14.6939 8.94822C15.6542 7.74 16.25 6.43329 16.25 5.0298C16.25 3.2791 14.6792 1.75 12.6 1.75C11.4058 1.75 10.2908 2.46342 9.59457 3.36892C9.4526 3.55356 9.23291 3.66176 9 3.66176C8.76709 3.66176 8.5474 3.55356 8.40544 3.36892C7.7092 2.46342 6.59415 1.75 5.4 1.75Z\" fill=\"black\"/>\n            </svg>\n        </div>\n    </div>\n</div>";
},"useData":true});
templates['restaurantUnderheader.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"restaurant-underheader__tag\">\n                "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":5,"column":26}}}) : helper)))
    + "\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <a href=\"#"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":17,"column":22},"end":{"line":17,"column":30}}}) : helper)))
    + "\" class=\"restaurant-underheader__a\">\n                <div class=\"restaurant-nav__btn\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":19,"column":20},"end":{"line":19,"column":28}}}) : helper)))
    + "\n                </div>\n            </a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"restaurant-underheader\">\n    <div class=\"restaurant-underheader__tags\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":8},"end":{"line":7,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n    <div class=\"restaurant-underheader__address\">\n        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"addrs") || (depth0 != null ? lookupProperty(depth0,"addrs") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"addrs","hash":{},"data":data,"loc":{"start":{"line":10,"column":8},"end":{"line":10,"column":19}}}) : helper)))
    + "\n    </div>\n</div>\n<div class=\"restaurant-nav\">\n    <hr class=\"restaurant-nav__line\">\n    <div class=\"restaurant-nav__list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"menu") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":8},"end":{"line":22,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n\n</div>";
},"useData":true});
templates['sortBox.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sort-box\">\n    <div class=\"sort-box__text-container\">\n        <h1 class=\"sort-box__text\">Все магазины</h1>\n    </div>\n    <div class=\"sort-box__sort-container\">\n        <button class=\"sort-box__expand-button\">\n            <div class=\"sort-box__text-block\">\n                Сортировка\n                <div class=\"sort-box__expand-svg\">\n                    <svg width=\"24px\" height=\"24px\" fill=\"none\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"\n                         aria-hidden=\"true\" focusable=\"false\">\n                        <path d=\"M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z\"\n                              fill=\"#000000\"></path>\n                    </svg>\n                </div>\n            </div>\n        </button>\n        <div class=\"h3\" style=\"height:18px\"></div>\n        <label class=\"sort-box__radio-container\">Cамые популярные\n            <input type=\"radio\" checked=\"checked\" name=\"radio\">\n            <span class=\"sort-box__checkmark\"></span>\n        </label>\n        <label class=\"sort-box__radio-container\">Рейтинг\n            <input type=\"radio\" name=\"radio\">\n            <span class=\"sort-box__checkmark\"></span>\n        </label>\n        <label class=\"sort-box__radio-container\">Время доставки\n            <input type=\"radio\" name=\"radio\">\n            <span class=\"sort-box__checkmark\"></span>\n        </label>\n    </div>\n\n    <div class=\"h3\" style=\"height:18px\"></div>\n\n    <div class=\"sort-box__price-range-container\">\n        <button class=\"sort-box__expand-button\">\n            <div class=\"sort-box__text-block\">\n                Диапазон стоимости\n                <div class=\"sort-box__expand-svg\">\n                    <svg width=\"24px\" height=\"24px\" fill=\"none\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"\n                         aria-hidden=\"true\" focusable=\"false\">\n                        <path d=\"M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z\"\n                              fill=\"#000000\"></path>\n                    </svg>\n                </div>\n            </div>\n        </button>\n\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\" checked=\"\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n         ₽\n      </span>\n            </div>\n        </article>\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n        ₽₽\n      </span>\n            </div>\n        </article>\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n       ₽₽₽\n      </span>\n            </div>\n        </article>\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n        ₽₽₽₽\n      </span>\n            </div>\n        </article>\n    </div>\n\n    <div class=\"h3\" style=\"height:50px\"></div>\n\n    <div class=\"sort-box__free-delivery-range-picker\">\n        <button class=\"sort-box__expand-button\">\n            <div class=\"sort-box__text-block\">\n                Бесплатная доставка от\n                <div class=\"sort-box__expand-svg\">\n                    <svg width=\"24px\" height=\"24px\" fill=\"none\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"\n                         aria-hidden=\"true\" focusable=\"false\">\n                        <path d=\"M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z\"\n                              fill=\"#000000\"></path>\n                    </svg>\n                </div>\n            </div>\n        </button>\n\n        <div class=\"h3\" style=\"height:18px\"></div>\n\n        <div class=\"sort-box__slider-container\">\n            <input type=\"range\" min=\"0\" max=\"1000\" value=\"50\" class=\"sort-box__slider\" id=\"myRange\" step=\"250\">\n            <p>₽: <span id=\"demo\"></span></p>\n        </div>\n\n        <script>\n            var slider = document.getElementById(\"myRange\");\n            var output = document.getElementById(\"demo\");\n            output.innerHTML = slider.value;\n\n            slider.oninput = function() {\n                output.innerHTML = this.value;\n            }\n        </script>\n    </div>\n\n    <div class=\"sort-box__price-range-container\">\n        <button class=\"sort-box__expand-button\">\n            <div class=\"sort-box__text-block\">\n                Диета\n                <div class=\"sort-box__expand-svg\">\n                    <svg width=\"24px\" height=\"24px\" fill=\"none\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"\n                         aria-hidden=\"true\" focusable=\"false\">\n                        <path d=\"M17 11.7494V14.916L12 11.0827L7 14.916V11.7494L12 7.91602L17 11.7494Z\"\n                              fill=\"#000000\"></path>\n                    </svg>\n                </div>\n            </div>\n        </button>\n\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\" checked=\"\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n        Вегетарианская\n      </span>\n            </div>\n        </article>\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n        Веган\n      </span>\n            </div>\n        </article>\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n       Без глютена\n      </span>\n            </div>\n        </article>\n\n        <article class=\"sort-box__checkbox\">\n            <input type=\"checkbox\" class=\"sort-box__checkbox_input\"/>\n            <div class=\"sort-box__checkbox_text-container\">\n      <span>\n        Гипоаллергенная\n      </span>\n            </div>\n        </article>\n    </div>\n</div>";
},"useData":true});
templates['sortUnderheader.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sort-underheader\">\n    <button class=\"button button_height_b button_color_white button_sort-type sort-underheader__button\">\n        <img class=\"button__icon-sort\" src=\"../../assets/images/hamburger.svg\" alt=\"ham\"/>\n        Фастфуд\n    </button>\n    <button class=\"button button_color_white button_sort-type sort-underheader__button\">\n        <img class=\"button__icon-sort\" src=\"../../assets/images/hamburger.svg\" alt=\"ham\"/>\n        Фастфуд\n    </button>\n    <button class=\"button button_height_b button_color_white button_sort-type sort-underheader__button\">\n        <img class=\"button__icon-sort\" src=\"../../assets/images/hamburger.svg\" alt=\"ham\"/>\n        Фастфуд\n    </button>\n    <button class=\"button button_height_b button_color_white button_sort-type sort-underheader__button\">\n        <img class=\"button__icon-sort\" src=\"../../assets/images/hamburger.svg\" alt=\"ham\"/>\n        Фастфуд\n    </button>\n</div>";
},"useData":true});
templates['userLoginForm.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form id= \"form\" action=\"submit\" class=\"login-page\">\n    <div class=\"login-page__logo-container\">\n        <a href=\"/\">\n            <img href=\"/\" src=\"../../assets/images/logo1.svg\" height=\"200\" class=\"login-page__logo\" alt=\"\">\n        </a>\n    </div>\n    <div class=\"login-page__login-container\">\n        <div class=\"login-page__login-form\">\n            <h1 class=\"login-page__login_welcome-back-text\">С возвращением!</h1>\n            <input id=\"login\" placeholder=\"Электронная почта или номер телефона\" required class=\"input login-page__login_input\">\n            <input id=\"password\" type=\"password\" placeholder=\"Пароль\"  required class=\"input login-page__login_input\">\n            <div class=\"error-label\" id=\"error_label\"></div>\n            <button id=\"form_submit\" class=\"login-page__submit-button\" type=\"submit\">Войти</button>\n        </div>\n    </div>\n\n    <div class=\"login-page__register-container\">\n        <span class=\"login-page__register-container_span\">Еще нет аккаунта HMEats? <a href=\"signup\" class=\"login-page__register-container_register\">Зарегистрируйся!</a></span>\n    </div>\n</form>";
},"useData":true});
templates['userSignUpForm.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"\" class=\"login-page\">\n    <div class=\"register-page__logo-container\">\n        <a href=\"/\">\n            <img href=\"/\" src=\"../../assets/images/logo1.svg\" height=\"200\" class=\"register-page__logo\" alt=\"\">\n        </a>\n    </div>\n    <div class=\"register-page__register-container\">\n        <div class=\"register-page__register-form\">\n            <h1 class=\"register-page__register_welcome-back-text\">Хочешь заказать еду? <br> Присоединяйся!</h1>\n            <input id=\"name\" placeholder=\"Имя\" required class=\"input register-page__login_input\">\n            <div id=\"name_error\" class=\"error-label\"></div>\n            <input id=\"email\" placeholder=\"Электронная почта\" required class=\"input register-page__login_input\">\n            <div id=\"email_error\" class=\"error-label\"></div>\n            <input id=\"phone_number\" placeholder=\"Номер телефона\" required class=\"input register-page__login_input\">\n            <div id=\"phone_error\" class=\"error-label\"></div>\n            <input id=\"password\" type=\"password\" placeholder=\"Пароль\"  required class=\"input register-page__login_input\">\n            <input id=\"password_repeat\" type=\"password\" placeholder=\"Повторение пароля\"  required class=\"input register-page__login_input\">\n            <div id=\"password_error\" class=\"error-label\"></div>\n            <button id=\"form_submit\" class=\"register-page__submit-button\" type=\"submit\">Зарегистрироваться</button>\n        </div>\n    </div>\n\n    <div class=\"register-page__register-container\">\n        <span class=\"register-page__register-container_span\">Уже пользовались HMEats? <a href=\"login\" class=\"register-page__register-container_register\">Войти!</a></span>\n    </div>\n</form>";
},"useData":true});
templates['page.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = ((helper = (helper = lookupProperty(helpers,"head") || (depth0 != null ? lookupProperty(depth0,"head") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"head","hash":{},"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}) : helper))) != null ? stack1 : "")
    + "\n<div class=\"page__content\">\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":3,"column":4},"end":{"line":3,"column":17}}}) : helper))) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});
templates['homePage.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"home-page__promo-block\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"promoBlock"),depth0,{"name":"promoBlock","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"home-page__restaurant-block home-page__restaurant-block-media\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"restaurant"),depth0,{"name":"restaurant","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"home-page__line home-page__promo-line\">\n    <div class=\"promo-line__title home-page__promo-line-title\">\n        <div class=\"promo__main-title\">\n            Захотели покушать?!<br>Закажите у нас!\n        </div>\n\n        <div class=\"promo__description-title\">\n            Найдите свои любимые ресторан, кухню или блюдо\n        </div>\n    </div>\n    <div class=\"home-page__promo-line-blocks\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"promos") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":12,"column":8},"end":{"line":16,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n\n<div class=\"home-page__line\">\n    <div class=\"home-page__sort\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"sortBox"),depth0,{"name":"sortBox","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n\n    <div class=\"home-page__restaurants-list\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"sortUnderheader"),depth0,{"name":"sortUnderheader","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "        <div class=\"home-page__restaurant-block-title\">\n            Рестораны\n        </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"restaurantList") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":8},"end":{"line":34,"column":18}}})) != null ? stack1 : "")
    + "    </div>\n</div>";
},"usePartial":true,"useData":true});
templates['loginPage.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"loginUserInput"),depth0,{"name":"loginUserInput","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['baseProfilePage.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"base-profile-page__content\">\n    <div class=\"base-profile-page__title\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"pageTitle") || (depth0 != null ? lookupProperty(depth0,"pageTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data,"loc":{"start":{"line":2,"column":42},"end":{"line":2,"column":55}}}) : helper)))
    + "</div>\n    <div class=\"base-profile-page__left-box\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"content") || (depth0 != null ? lookupProperty(depth0,"content") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data,"loc":{"start":{"line":4,"column":8},"end":{"line":4,"column":21}}}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n    <div class=\"base-profile-page__right-box\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"rightMenu") || (depth0 != null ? lookupProperty(depth0,"rightMenu") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rightMenu","hash":{},"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":23}}}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</div>\n\n";
},"useData":true});
templates['historyPage.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"history__order\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"order"),depth0,{"name":"order","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"orders") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":5,"column":9}}})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
templates['profilePage1.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-page__wrapper\">\n    <div class=\"profile-page__input-box\">\n        <form enctype=\"multipart/form-data\">\n        <div class=\"profile-row\">\n            <div class=\"profile-page__avatar-box\">\n<!--                <img class=\"profile-avatar\" src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"avatar") : stack1), depth0))
    + "\" alt=\"profile image\">-->\n                <div class=\"profile-avatar\" for=\"user-avatar\">\n                    <svg class=\"avatar-find-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.3849 15.4458C11.7346 17.5685 7.8552 17.4014 5.39842 14.9446C2.76238 12.3086 2.76238 8.0347 5.39842 5.39866C8.03445 2.76262 12.3083 2.76262 14.9444 5.39866C17.4011 7.85544 17.5682 11.7349 15.4456 14.3851L20.6012 19.5408C20.8941 19.8337 20.8941 20.3085 20.6012 20.6014C20.3083 20.8943 19.8334 20.8943 19.5405 20.6014L14.3849 15.4458ZM6.45908 13.8839C4.40882 11.8337 4.40882 8.50957 6.45908 6.45932C8.50933 4.40907 11.8334 4.40907 13.8837 6.45932C15.9324 8.50807 15.9339 11.8288 13.8882 13.8794C13.8867 13.8809 13.8852 13.8824 13.8837 13.8839C13.8822 13.8854 13.8807 13.8869 13.8792 13.8884C11.8286 15.9342 8.50783 15.9327 6.45908 13.8839Z\" fill=\"black\"/>\n                    </svg>\n                    <input class=\"avatar-input\" type=\"file\" accept=\"image/x-png,image/gif,image/jpeg\" id=\"avatar\" name=\"user-avatar\"/>\n                </div>\n<!--                <div class=\"profile-avatar\"></div>-->\n            </div>\n            <div class=\"profile-row__name\">\n                "
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\n            </div>\n        </div>\n        <div class=\"profile-row\">\n            <label class=\"profile-page__input-label\">\n                Имя\n                <input value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"name") : stack1), depth0))
    + "\" id=\"name\" required class=\"input profile-page__input\">\n            </label>\n            <label class=\"profile-page__input-label profile-row__input-label-lm\">\n                Номер телефона\n                <input value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"phone") : stack1), depth0))
    + "\"  id=\"phone\" required class=\"input profile-page__input\">\n            </label>\n        </div>\n        <div class=\"profile-row\">\n            <label class=\"profile-page__input-label\">\n                Электронная почта\n                <input value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? lookupProperty(depth0,"user") : depth0)) != null ? lookupProperty(stack1,"email") : stack1), depth0))
    + "\" id=\"mail\" required class=\"input profile-page__input\">\n            </label>\n            <label class=\"profile-page__input-label profile-row__input-label-lm\" for=\"localdate\">\n                Дата рождения:\n                <div class=\"profile-page__input-date-wrapper\">\n                    <input id=\"localdate\" placeholder=\"DD\" maxlength=\"2\" min=\"0\" size=\"2\" max=\"31\" type=\"tel\" required class=\"input profile-page__input input__days\" name=\"date\"/>\n                    <input id=\"localdate\" placeholder=\"MM\" maxlength=\"2\" min=\"0\" max=\"12\" type=\"tel\" required class=\"input profile-page__input profile-page__input-ml input__months\" name=\"date\"/>\n                    <input id=\"localdate\" placeholder=\"YYYY\" maxlength=\"4\" min=\"1900\" max=\"2021\" type=\"tel\" required class=\"input profile-page__input profile-page__input-ml\" name=\"date\"/>\n                </div>\n            </label>\n        </div>\n        <div class=\"profile-row\">\n            <label class=\"profile-page__input-label\">\n                Изменение пароля. Введите новый пароль\n                <input value=\"\" type=\"password\" id=\"password\" required class=\"input profile-page__input\">\n            </label>\n        </div>\n        <div class=\"profile-row\">\n            <label class=\"profile-page__input-label\">\n                Повторите пароль\n                <input value=\"\" type=\"password\" id=\"repeatPassword\" required class=\"input profile-page__input\">\n            </label>\n        </div>\n\n        <button id=\"save-button\" class=\"button button_height_b button_color_black profile-page__button\">\n            Сохранить изменения\n        </button>\n        </form>\n    </div>\n</div>\n";
},"useData":true});
templates['restaurantPage.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"restaurant-underheader__tag\">\n                        "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":24},"end":{"line":7,"column":34}}}) : helper)))
    + "\n                    </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <a href=\"#"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":19,"column":30},"end":{"line":19,"column":38}}}) : helper)))
    + "\" class=\"restaurant-underheader__a\">\n                        <div class=\"restaurant-nav__btn\">\n                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":21,"column":28},"end":{"line":21,"column":36}}}) : helper)))
    + "\n                        </div>\n                    </a>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":31,"column":25},"end":{"line":31,"column":33}}}) : helper)))
    + "\" class=\"restaurant-page__menu-title\">\n                    "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":32,"column":20},"end":{"line":32,"column":28}}}) : helper)))
    + "\n                </div>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"dishes") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":34,"column":16},"end":{"line":38,"column":25}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"restaurant-page__dish restaurant-page__dish-media\">\n"
    + ((stack1 = container.invokePartial(lookupProperty(partials,"dish"),depth0,{"name":"dish","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "                    </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"restaurant-page__menu-cart-wrapper\">\n    <div class=\"restaurant-page__menu\">\n        <div class=\"restaurant-underheader\">\n            <div class=\"restaurant-underheader__tags\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"tags") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":9,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n            <div class=\"restaurant-underheader__address\">\n                "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"addrs") || (depth0 != null ? lookupProperty(depth0,"addrs") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"addrs","hash":{},"data":data,"loc":{"start":{"line":12,"column":16},"end":{"line":12,"column":27}}}) : helper)))
    + "\n            </div>\n        </div>\n        <div class=\"restaurant-nav\">\n            <hr class=\"restaurant-nav__line\">\n            <div class=\"restaurant-nav__list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"menu") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":16},"end":{"line":24,"column":25}}})) != null ? stack1 : "")
    + "            </div>\n\n        </div>\n\n        <div class=\"restaurant-page__dishes\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"menu") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":12},"end":{"line":39,"column":21}}})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"restaurant-page__cart\">\n<!--   space for cart     -->\n    </div>\n</div>\n";
},"usePartial":true,"useData":true});
templates['signUpPage.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"signUpUserInput"),depth0,{"name":"signUpUserInput","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
})();