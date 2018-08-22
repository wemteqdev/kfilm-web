
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// add stylesheet
import Paginate from 'vuejs-paginate';
import VueSelectImage from 'vue-select-image'
import { VueMasonryPlugin } from 'vue-masonry';
require('vue-select-image/dist/vue-select-image.css')

Vue.use(VueMasonryPlugin)

Vue.component('paginate', Paginate);
Vue.component('vue-select-image', VueSelectImage);
Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('image-list-popup', require('./components/ImageListPopupComponent.vue'));
