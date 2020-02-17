<!--
  Phone Number Input

  Usage:

  <PhoneNumberInput
    :inputOptions="inputOptions"                - Options which can be inputted from Input field
    :label="label"                              - Label of Phone Number
    :value="value"                              - Default Phone Number
    :placeholder="placeholder"                  - Placeholder
    :disabled="disabled"                        - Enable or Disable of dropdown
    :disabledFormatting="disabledFormatting"    - Disable the format of phone number
    :invalidMsg="invalidMsg"                    - Message that can be displayed when the phone number is invalid
    :required="required"                        - required props
    :defaultCountry="defaultCountry"            - Default country
    :enabledCountryCode="enabledCountryCode"    - Show country code next to the flag
    :enabledFlags="enabledFlags"                - Show flags at the top of the dropdown
    :preferredCountries="preferredCountries"    - Array of countries that can be at top of the list
    :onlyCountries="onlyCountries"              - Display only the countrie in Array
    :ignoredCountries="ignoredCountries"        - Remove countries in this Array
    :autocomplete="autocomplete"                - Complete the Phone Number automatically based on history
    :name="name"                                - Name of input field
    :inputClasses="inputClasses"                - Classes of input field
    :dropdownOptions="dropdownOptions"          - Options which can be at the items of dropdown list
    :maxLen="maxLen"                            - Max length of inputted numbers
    @onInput="onInput"                          - Emitted when the input value changes
  />
-->

<template>
  <div class="ds-phone-numbuer-input" :style="{width}">
    <div class="ds-label-text">{{ label }}</div>
    <div :class="['ds-vue-tel-input', { 'ds-disabled': disabled }]" @keydown="keyboardNav">
      <div
        @click="toggleDropdown"
        v-click-outside="clickedOutside"
        :class="['ds-dropdown', { 'ds-open': open }]"
        tabindex="0"
      >
        <span class="ds-selection">
          <div class="iti-flag" v-if="enabledFlags" :class="activeCountry.iso2.toLowerCase()"></div>
          <span class="ds-country-code" v-if="enabledCountryCode">+{{ activeCountry.dialCode }}</span>
          <span class="ds-dropdown-arrow">{{ open ? '▲' : '▼' }}</span>
        </span>
        <ul v-show="open" ref="list" class="ds-phone-numbuer-input-list" :style="{height: listHeight}">
          <li
            class="ds-dropdown-item"
            v-for="(pb, index) in sortedCountries"
            :key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
            @click="choose(pb)"
            :class="getItemClass(index, pb.iso2)"
            @mousemove="selectedIndex = index"
          >
            <div class="iti-flag" v-if="enabledFlags" :class="pb.iso2.toLowerCase()"></div>
            <strong>{{ pb.name }}</strong>
            <span v-if="dropdownOptions && !dropdownOptions.disabledDialCode">+{{ pb.dialCode }}</span>
          </li>
        </ul>
      </div>
      <input
        ref="input"
        v-model="phone"
        type="tel"
        :placeholder="placeholder"
        :state="state"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :name="name"
        :class="[inputClasses, {'ds-phone-number-input-valid': showValidCheck && validBacklight,
                                'ds-phone-number-input-error': showInvalidBlock && invalidBacklight}]"
        :maxlength="maxLen"
        @blur="onBlur"
        @input="onInput"
      >
    </div>
    <div v-if="showInvalidBlock" class="ds-input-phone-number-errors">
        <span class="ds-error-message">
          {{ inputErrors[0] }}
        </span>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { formatNumber, AsYouType, isValidNumber } from 'libphonenumber-js';
import {CountriesArray} from '../static/index';
import validation from './../mixins/validation';

const allCountries = CountriesArray.map(country => ({
  name: country[0],
  iso2: country[1].toUpperCase(),
  dialCode: country[2],
  priority: country[3] || 0,
  areaCodes: country[4] || null,
}));

export default {
  name: 'phone-numbuer-input',
  mixins: [validation],
  props: {
    value: null,
    label: {
      type: String,
      default: 'Phone Number'
    },
    placeholder: {
      type: String,
      default: 'Enter a phone number',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    disabledFormatting: {
      type: Boolean,
      default: false,
    },
    invalidMsg: {
      default: '',
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    defaultCountry: {
      // Default country code, ie: 'AU'
      // Will override the current country of user
      type: String,
      default: '',
    },
    enabledCountryCode: {
      type: Boolean,
      default: false,
    },
    enabledFlags: {
      type: Boolean,
      default: true
    },
    preferredCountries: {
      type: Array,
      default: () => [],
    },
    onlyCountries: {
      type: Array,
      default: () => [],
    },
    ignoredCountries: {
      type: Array,
      default: () => [],
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    name: {
      type: String,
      default: 'telephone',
    },
    inputClasses: {
      type: String,
      default: '',
    },
    dropdownOptions: {
      type: Object,
      default: () => ({}),
    },
    inputOptions: {
      type: Object,
      default: () => ({}),
    },
    maxLen: {
      type: Number,
      default: 15,
    },
    showValidations: {
      type: Boolean,
      default: true
    },
    width: String,
    listHeight: String,
    validators: {
      type: Array,
      default: () => []
    },
    referenceModel: null
  },
  mounted() {
    this.initializeCountry();
  },
  created() {
    if (this.value) {
      this.phone = this.value;
    }
  },
  data() {
    return {
      phone: '',
      activeCountry: { iso2: '' },
      open: false,
      selectedIndex: null,
      typeToFindInput: '',
      typeToFindTimer: null,
      touched: false,
      validBacklight: false,
      invalidBacklight: false
    };
  },
  computed: {
    mode() {
      if (!this.phone) {
        return '';
      }
      if (this.phone[0] === '+') {
        return 'code';
      }
      if (this.phone[0] === '0') {
        return 'prefix';
      }
      return 'normal';
    },
    filteredCountries() {
      // List countries after filtered
      if (this.onlyCountries.length) {
        return this.getCountries(this.onlyCountries);
      }
      if (this.ignoredCountries.length) {
        return allCountries.filter(({ iso2 }) =>
          !this.ignoredCountries.includes(iso2.toUpperCase()) &&
          !this.ignoredCountries.includes(iso2.toLowerCase()))
      }
      return allCountries;
    },
    sortedCountries() {
      // Sort the list countries: from preferred countries to all countries
      const preferredCountries = this.getCountries(this.preferredCountries)
        .map(country => ({ ...country, preferred: true }));
      return [...preferredCountries, ...this.filteredCountries];
    },
    formattedResult() {
      // Calculate phone number based on mode
      if (!this.mode || !this.filteredCountries) {
        return '';
      }
      let phone = this.phone;
      if (this.mode === 'code') {
        // If user manually type the country code
        const formatter = new AsYouType();// eslint-disable-line
        formatter.input(this.phone);
        // Find inputted country in the countries list
        const activeCountry = this.findCountry(formatter.country) || this.activeCountry;
        this.setActiveCountry(activeCountry);
      } else if (this.mode === 'prefix') {
        phone = this.phone.slice(1);
      }
      if (this.disabledFormatting) {
        return this.phone;
      }
      return formatNumber(phone, this.activeCountry && this.activeCountry.iso2, 'International');
    },
    state() {
      return isValidNumber(this.formattedResult, this.activeCountry && this.activeCountry.iso2);
    },
    response() {
      // If it is a valid number, returns the formatted value
      // Otherwise returns what it is
      let response = {
        number: this.state ? this.formattedResult : this.phone,
        isValid: this.state,
        country: this.activeCountry,
      }
      // If formatting to the input is disabled, try to return the formatted value to its parent
      if (this.disabledFormatting) {
        _.assign(response, {
          formattedNumber: formatNumber(this.phone, this.activeCountry && this.activeCountry.iso2, 'International')
        })
      }

      response.phone = {
        countryCode: response.country.dialCode,
        phoneNumber: response.number.replace(/[+ ]/g, '').slice(response.country.dialCode.length)
      }

      return response;
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return []
      }

      let data = []
      for (let i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.value, this.referenceModel),
        ])
      }
      return data
    }
  },
  watch: {
    state(value) {
      if (value && this.mode !== 'prefix') {
        // If mode is 'prefix', keep the number as user typed,
        // Otherwise format it
        this.phone = this.formattedResult;
      }
      this.$emit('onValidate', this.response);
    },
    value() {
      this.phone = this.value;
    },
    phone() {
      this.checkBacklight();
    }
  },
  methods: {
    initializeCountry() {
      /**
       * 1. Use default country if passed from parent
       */
      if (this.defaultCountry) {
        const defaultCountry = this.findCountry(this.defaultCountry);
        if (defaultCountry) {
          this.activeCountry = defaultCountry;
          return;
        }
      }
      /**
       * 2. Use the first country from preferred list (if available) or all countries list
       */
      this.activeCountry = this.findCountry(this.preferredCountries[0]) || this.filteredCountries[0];
    },
    /**
     * Get the list of countries from the list of iso2 code
     */
    getCountries(list = []) {
      return list
        .map(countryCode => this.findCountry(countryCode))
        .filter(Boolean);
    },
    findCountry(iso = '') {
      return allCountries.find(country => country.iso2 === iso.toUpperCase());
    },
    getItemClass(index, iso2) {
      const highlighted = this.selectedIndex === index;
      const lastPreferred = index === this.preferredCountries.length - 1;
      const preferred = !!~this.preferredCountries.map(c => c.toUpperCase()).indexOf(iso2);
      return {
        'ds-highlighted': highlighted,
        'ds-last-preferred': lastPreferred,
        'ds-preferred': preferred,
      };
    },
    choose(country) {
      this.activeCountry = country;
      if (this.inputOptions && this.inputOptions.showDialCode && country) {
        this.phone = '+' + country.dialCode;
      }
      this.$emit('onInput', this.response);
    },
    setActiveCountry(country) {
      this.activeCountry = country;
    },
    onInput() {
      this.$refs.input.setCustomValidity(this.response.isValid ? '' : this.invalidMsg);
      if (!this.phone.startsWith('+' + this.activeCountry.dialCode)) {
        this.phone = '+' + this.activeCountry.dialCode;
      }

      this.phone = '+' + this.phone.replace(/\D/g, '');
      // Emit input event in case v-model is used in the parent
      this.$emit('input', this.response.number);
      // Emit the response, includes phone, validity and country
      this.$emit('onInput', this.response);
    },
    onBlur() {
      this.touched = true;
      this.$emit('onBlur');
    },
    toggleDropdown() {
      if (this.disabled) {
        return;
      }
      this.open = !this.open;
    },
    clickedOutside() {
      this.open = false;
    },
    keyboardNav(e) {
      if (e.keyCode === 40) {
        // down arrow
        e.preventDefault();
        this.open = true;
        if (this.selectedIndex === null) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex = Math.min(this.sortedCountries.length - 1, this.selectedIndex + 1);
        }
        const selEle = this.$refs.list.children[this.selectedIndex];
        if (selEle.offsetTop + selEle.clientHeight
          > this.$refs.list.scrollTop + this.$refs.list.clientHeight) {
          this.$refs.list.scrollTop = selEle.offsetTop
            - this.$refs.list.clientHeight
            + selEle.clientHeight;
        }
      } else if (e.keyCode === 38) {
        // up arrow
        e.preventDefault();
        this.open = true;
        if (this.selectedIndex === null) {
          this.selectedIndex = this.sortedCountries.length - 1;
        } else {
          this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        }
        const selEle = this.$refs.list.children[this.selectedIndex];
        if (selEle.offsetTop < this.$refs.list.scrollTop) {
          this.$refs.list.scrollTop = selEle.offsetTop;
        }
      } else if (e.keyCode === 13) {
        // enter key
        if (this.selectedIndex !== null) {
          this.choose(this.sortedCountries[this.selectedIndex]);
        }
        this.open = !this.open;
      } else {
        // typing a country's name
        this.typeToFindInput += e.key;
        clearTimeout(this.typeToFindTimer);
        this.typeToFindTimer = setTimeout(() => {
          this.typeToFindInput = '';
        }, 700);
        // don't include preferred countries so we jump to the right place in the alphabet
        const typedCountryI = this.sortedCountries
          .slice(this.preferredCountries.length)
          .findIndex(c => c.name.toLowerCase().startsWith(this.typeToFindInput));
        if (typedCountryI >= 0) {
          this.selectedIndex = this.preferredCountries.length + typedCountryI;
          const selEle = this.$refs.list.children[this.selectedIndex];
          const needToScrollTop = selEle.offsetTop < this.$refs.list.scrollTop;
          const needToScrollBottom = selEle.offsetTop + selEle.clientHeight
            > this.$refs.list.scrollTop + this.$refs.list.clientHeight;
          if (needToScrollTop || needToScrollBottom) {
            this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight / 2;
          }
        }
      }
    }
  },
  directives: {
    'click-outside': {
      bind: function (el, binding) {
        // Define Handler and cache it on the element
        var bubble = binding.modifiers.bubble;
        var handler = function (e) {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
        document.addEventListener('click', handler)
      },
      unbind: function (el) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';
@import '../styles/flags';
@import '../styles/mixins';

.ds-phone-numbuer-input {
  li.ds-last-preferred {
    border-bottom: @app-last-item-border;
  }
  .iti-flag {
    margin-right: @app-input-margin;
    margin-left: @app-input-margin;
  }
  .ds-dropdown-item .iti-flag {
    display: inline-block;
    margin-right: @app-input-margin;
  }
  .ds-selection {
    font-size: @selection-font-size;
    display: flex;
    align-items: center;
  }

  .ds-phone-numbuer-input-list {
    width: 100% !important;
    top: 52px !important;
  }

  .ds-label-text {
    .font-desktop-x-small-regular-gray();
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: @label-height;
    margin-bottom: 14px;
  }

  .ds-vue-tel-input {
    height: 52px;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    border: @tel-input-border;
    text-align: left;
    position: relative;

    &:focus-within {
      border-color: @color-primary;
    }

    .ds-dropdown {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      padding: @phone-input-padding;
      cursor: pointer;

      &.ds-open{
        background-color: @color-gray-200;
      }

      &:hover {
        background-color: @color-gray-200;
      }

      ul {
        z-index: 1;
        padding: 0;
        margin: 0;
        text-align: left;
        list-style: none;
        max-height: @drop-panel-max-height;
        overflow-y: scroll;
        position: absolute;
        top: 33px;
        left: -1px;
        background-color: @color-gray-100;
        border: @drop-panel-border;
        width: @drop-panel-width;
      }
    }

    input {
      width: 100%;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 14px 16px 16px;
      background-color: @color-white;
      color: #1B1E24;
      font-family: Roboto;
      font-size: 14px;
      line-height: 16px;

      &.ds-phone-number-input-valid {
        border-color: @color-primary;
        background-color: #e9f8f3;
        .fade-in-animation();
      }

      &.ds-phone-number-input-error {
        border-color: @color-red;
        background-color: #ffedec;
        .fade-in-animation();
      }

      .placeholder-input(14px, @robotoFont, @color-gray-400, 16px);
    }
  }

  .ds-input-phone-number-errors {
    box-sizing: border-box;
    font-size: 11px;
    line-height: 12px;
    padding: 3px 0;
    position: relative;
    text-align: left;
    max-width: 100%;
    width: 100%;

    .ds-error-message {
      color: @color-red;
      font-family: @font-family;
      list-style: none;
      padding: 0;
      margin: 0;
      overflow: hidden;
      display: inline-block;
      max-width: 100%;
    }
  }

  .ds-country-code {
    color: @color-gray-500;
  }
  .ds-dropdown-arrow {
    transform: scaleY(0.5);
    display: inline-block;
    color: @color-gray-500;
  }
  .ds-dropdown-item {
    cursor: pointer;
    padding: @dropdown-item-padding;
  }
  .ds-dropdown-item.ds-highlighted {
    background-color: @color-gray-300;
  }
  .dropdown-menu.show {
    max-height: @drop-menu-max-height;
    overflow: scroll;
  }
  .ds-vue-tel-input.ds-disabled .ds-selection,
  .ds-vue-tel-input.ds-disabled .ds-dropdown,
  .ds-vue-tel-input.ds-disabled input {
    cursor: no-drop;
  }
}
</style>
