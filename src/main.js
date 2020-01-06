import Vue from 'vue'
import VueMask from 'v-mask'
import VueSignaturePad from 'vue-signature-pad'

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/monokai.css'
import 'vue-slider-component/theme/antd.css'

import Internationalization from './plugins/Internationalization'
import GlobalFilters from './plugins/GlobalFilters'

import './utils/patch-ios-safari-click'
import './fonts/lato.css'
import './fonts/roboto.css'
import App from './App.vue'


// import and globally register every component form /components
let context = require.context('./components', false, /.*\.vue$/)
context.keys().forEach(key => {
  // Get component config
  let component = context(key)

  // Strip the leading `./` and extension from the key
  let componentName = key.replace(/^\.\/(.*)\.\w+$/, '$1')

  // Register component globally
  Vue.component(componentName, component.default || component)
})

Vue.config.productionTip = false
Vue.use(VueHighlightJS)
Vue.use(VueSignaturePad)
Vue.use(Internationalization)
Vue.use(GlobalFilters)
Vue.use(VueMask);

new Vue({
  render: h => h(App),
  data: { locale: 'fr-fr' },
}).$mount('#app')
