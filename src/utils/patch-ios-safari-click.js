// Safari doesn't suppport click bubbling unless a hack is applied
// One of such hacks is to set cursor: pointer to everything

// Detect safari on iOS
var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

// Patch
if (iOSSafari) {
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(''));
  document.head.appendChild(style);
  style.sheet.insertRule('.is-ios * {cursor: pointer;}');
  document.querySelector('html').classList.add('is-ios');
}
