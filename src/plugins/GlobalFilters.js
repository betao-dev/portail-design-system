import moment from 'moment';

export default {
  install: Vue => {
    Vue.filter('capitalize', function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    });

    Vue.filter('shortDate', function(value) {
      if (!value) return '';
      return moment(value).format('DD/MM/YYYY');
    });
  }
};
