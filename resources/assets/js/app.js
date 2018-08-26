
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueSelectImage from 'vue-select-image'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('vue-select-image/dist/vue-select-image.css')

Vue.use(BootstrapVue);

Vue.component('vue-select-image', VueSelectImage);
Vue.component('example-component', require('./components/ExampleComponent.vue'));
Vue.component('image-list-popup', require('./components/ImageListPopupComponent.vue'));
