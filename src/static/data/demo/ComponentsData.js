let usage = `
// Vue is externalized from the library so it needs to be installed and
// imported independently
import Vue from 'vue';
// Import components
import components from '@betao/ds'
// Load extracted css
import '@betao/ds/css'

// Turn the bare bone config into a fully fledged component
const MyComponent = Vue.extend(components['MyComponent'])

// Create and mount the component
new MyComponent(...).$mount('#mount-point')
`.slice(1);

export default {
  usage
};
