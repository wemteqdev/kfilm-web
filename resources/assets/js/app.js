require('./bootstrap');
window.Vue = require('vue');

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

Vue.component('image-list-popup', require('./components/ImageListComponent.vue'));
Vue.component('video-list-popup', require('./components/VideoListComponent.vue'));
Vue.component('video-category-list', require('./components/video/CategoryListComponent.vue'));
Vue.component('video-group-list', require('./components/video/GroupListComponent.vue'));