require('./bootstrap');
window.Vue = require('vue');

import BootstrapVue from 'bootstrap-vue'
import VueMaterial from 'vue-material'

Vue.use(BootstrapVue);
Vue.use(VueMaterial);

Vue.component('image-list-popup', require('./components/ImageListComponent.vue'));
Vue.component('video-list-popup', require('./components/VideoListComponent.vue'));
Vue.component('series-list-popup', require('./components/SeriesListComponent.vue'));
Vue.component('video-category-list', require('./components/video/CategoryListComponent.vue'));
Vue.component('video-group-list', require('./components/video/GroupListComponent.vue'));
Vue.component('video-tag-list', require('./components/video/TagListComponent.vue'));


Vue.component('slide-tag-list', require('./components/slide/TagListComponent.vue'));

$(document).keypress(
    function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
});