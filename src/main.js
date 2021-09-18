'use strict';
import {HomePage} from './pages/homePage/homePage.js';

Handlebars.registerPartial('header', Handlebars.templates['header.hbs']);
Handlebars.registerPartial('restaurant', Handlebars.templates['restaurantBlock.hbs']);
Handlebars.registerPartial('promoLine', Handlebars.templates['promoLine.hbs']);
Handlebars.registerPartial('sortUnderheader', Handlebars.templates['sortUnderheader.hbs']);

Handlebars.registerHelper('times', function(n, block) {
  let accum = '';
  for(let i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});

const application = document.getElementById('app');
const homePage = new HomePage(application);
homePage.render();
