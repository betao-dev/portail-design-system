// Load evry icon and export them in {'icon_name': '<svg>...</svg>'} form
let context = require.context('.', false, /.*\.svg$/);
let icons = {};
context.keys().forEach(key => {
  // Strip the leading `./` and extension from the key
  let iconName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  icons[iconName] = context(key);
});

export default icons;
