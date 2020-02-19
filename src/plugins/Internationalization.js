import _ from 'lodash';

let locales = {
  fr: require('./../json/locale-fr'),
  en: require('./../json/locale-en')
};

export default {
  install: function(Vue) {
    Vue.$_dsLocale = function(value) {
      return (locales[_.get(window, 'dsLang', 'fr')] || locales['fr'])[value];
    };

    Vue.filter('dsTranslate', function(value) {
      return Vue.$_dsLocale(value) || value;
    });

    Vue.mixin({
      methods: {
        dsTranslate: Vue.$_dsLocale,
        dsTranslateComplex: function(strings, args, startArgs) {
          let result = '';
          let argsIndex = 0;

          if (startArgs) {
            result += args[argsIndex];
            argsIndex++;
          }

          for (let i = 0; i < strings.length; i++) {
            result += Vue.$_dsLocale(strings[i]);

            if (args[argsIndex]) {
              result += args[argsIndex];
              argsIndex++;
            }
          }

          return result;
        }
      }
    });
  }
};
