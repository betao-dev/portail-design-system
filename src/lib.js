// Styles that aren't part of components
require('./fonts/lato.css');
require('./fonts/roboto.css');
require('./styles/main.less');
require('./styles/grid.less');

// Entry file for the library build
// import and export every component form /components
let context = require.context('./components', false, /.*\.vue$/);
let components = {};
context.keys().forEach(key => {
  // Strip the leading `./` and extension from the key
  let componentName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  // Get component config
  let component = context(key);

  components[componentName] = component.default || component;
});

export default components;
