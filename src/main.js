'use strict';

const application = document.getElementById('app');
const footer = document.getElementById('foot');
const loginTemplate = Handlebars.templates['userLoginForm.hbs'];
const footerTemplate = Handlebars.templates['footer.hbs'];
application.innerHTML = loginTemplate({});
footer.innerHTML = footerTemplate({});
