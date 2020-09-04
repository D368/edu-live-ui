// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import 'videojs-flash'
import 'videojs-contrib-hls/dist/videojs-contrib-hls'
Vue.config.productionTip = false

Vue.use(VueVideoPlayer)
/* eslint-disable no-new */
Vue.use(ElementUI)
//全局挂载axios
// 这个是为了兼容 m3u8
// Vue.use(hls)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
