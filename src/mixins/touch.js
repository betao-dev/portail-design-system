import _ from 'lodash';

import convert from './convert';

export default {
  mixins: [convert],
  data: () => ({
    touchEventName: undefined
  }),
  methods: {
    touchEventHandler(data) {
      let touched = _.get(data, 'detail.status');

      if (typeof touched === 'boolean') {
        this.setTouched(touched);
      }
    }
  },
  mounted() {
    if (this.touchName) {
      this.touchEventName = this.uppercasePrefixText('touch', this.touchName);
      document.addEventListener(this.touchEventName, this.touchEventHandler);
    } else {
      document.addEventListener('touch', this.touchEventHandler);
    }
  },
  beforeDestroy() {
    if (this.touchName) {
      document.removeEventListener(this.touchEventName, this.touchEventHandler);
    } else {
      document.removeEventListener('touch', this.touchEventHandler);
    }
  }
};
