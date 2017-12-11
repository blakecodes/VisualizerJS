import jquery from 'jquery';
import slick from 'slick-carousel';

import SlickBuilder from '../../../../scripts/Helpers/Slick/slick';

$(function () {
    $('.testimonial-holder').slick();

    let slickService = new SlickBuilder();
    slickService.create();
});