
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

Vue.component('image-list-popup', require('./components/ImageListComponent.vue'));
Vue.component('video-list-popup', require('./components/VideoListComponent.vue'));