<template>
  <div class="ds-autocomplete-wrapper">
    <Input class="ds-autocomplete-input"
           slideLabel
           activeIcon
           :sm="sm"
           :md="md"
           :lg="lg"
           :id="id"
           :label="getInputLabel"
           :validators="validators"
           :referenceModel="dataListWrapper"
           icon="close"
           :iconColor="iconColor"
           :showIcon="showIcon"
           :type="getInputType"
           :inputStyle="inputStyle"
           v-model="inputValue"
           ref="autocomplete"
           @validation="onValidate"
           @inputFocus="autocompleteOpened = true"
           @icon-click="clear"
    />

    <Dropdown
      :target="$refs.autocomplete"
      :opened.sync="autocompleteOpened"
      :position="position"
      :transitionTime="0">

      <div v-if="showList"
           class="ds-dropdown-content ds-autocomplete-dropdown-content"
           :style="{minWidth}">
        <div class="ds-content" v-for="item in dataSearchListWrapper" @click="select(item)">
          <span v-if="item.number">{{item.number}} - </span> {{item.title}}
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
  import Input from './Input'
  import Dropdown from './Dropdown'

  import _ from 'lodash'

  export default {
    name: 'Autocomplete',
    components: {Input, Dropdown},
    props: {
      value: null,
      label: String,
      lg: Boolean,
      md: Boolean,
      sm: Boolean,
      required: Boolean,
      dataList: Array,
      validators: Array,
      type: {
        type: String,
        validator(value) {
          return ['custom', 'day', 'month', 'year'].indexOf(value) !== -1
        },
        default: 'custom'
      },
      iconColor: {
        type: String,
        default: 'gray-500'
      },
      daysMonth: {
        type: Number,
        default: 31
      },
      keyboard: {
        type: String,
        validator(value) {
          return ['alphabet', 'digital'].indexOf(value) !== -1
        },
        default: 'digital'
      }
    },
    data: () => ({
      autocompleteOpened: false,
      position: 'bottom-right',
      bday: undefined,
      searchId: undefined,
      searchResults: undefined,
      id: undefined,
      timeoutId: undefined,
      minWidth: undefined,
      inputStyle: {
        backgroundColor: '#FFF'
      }
    }),
    computed: {
      getInputLabel() {
        return this.required ? this.label + `*` : this.label
      },
      dataSearchListWrapper() {
        return this.searchResults || this.dataListWrapper
      },
      dataListWrapper() {
        if (this.type === 'day' || this.type === 'month' || this.type === 'year') {
          return this.bday
        } else {
          return this.dataList
        }
      },
      inputValue: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
        }
      },
      showIcon() {
        return !!this.inputValue
      },
      showList() {
        return this.dataListWrapper && this.dataListWrapper.length || this.dataSearchListWrapper && this.dataSearchListWrapper.length
      },
      getInputType() {
        return this.keyboard === 'digital' ? 'tel' : 'text'
      }
    },
    methods: {
      checkUnshiftZero(value) {
        return value < 10 ? '0' + value : value
      },
      getDaysRange(borderDayNumber) {
        borderDayNumber++
        let days = Array.from({length: borderDayNumber}, (v, k) => k++)
        days.splice(0, 1)

        return days.map((dayNumber) => {
          dayNumber = this.checkUnshiftZero(dayNumber)
          return {
            title: dayNumber
          }
        })
      },
      getMonths() {
        let monthNumber
        let months = []
        let month = new Date(2019, 0)

        for (let i = 0; i < 12; i++) {
          monthNumber = month.getMonth() + 1
          monthNumber = this.checkUnshiftZero(monthNumber)

          months.push({
            number: monthNumber,
            title: _.capitalize(month.toLocaleString(_.get(window, `dsLang`, 'fr'), {month: 'long'}))
          })

          month.setMonth(monthNumber)
        }

        return months
      },
      getYears() {
        let years = []
        let year = new Date()
        year.setFullYear(year.getFullYear() - 16)

        for (let i = 0; i < 117; i++) {
          years.push({title: year.getFullYear()})
          year.setFullYear(year.getFullYear() - 1)
        }

        return years
      },
      checkAutocompleteData() {
        if (this.type === 'day') {
          this.bday = this.getDaysRange(this.daysMonth)
        } else if (this.type === 'month') {
          this.bday = this.getMonths()
        } else if (this.type === 'year') {
          this.bday = this.getYears()
        }
      },
      getDataString(value) {
        let dataStr = ''

        if (value.number) {
          dataStr = `${value.number} - `
        }

        dataStr = dataStr + value.title

        return dataStr
      },
      searchData() {
        let searchString = this.inputValue || ''
        searchString = searchString.toLowerCase()

        this.searchResults = this.dataListWrapper && this.dataListWrapper.filter((data) => {
          return ~this.getDataString(data).toString().toLowerCase().indexOf(searchString)
        })

        this.searchId = undefined
      },
      select(value) {
        this.inputValue = this.getDataString(value)
        this.autocompleteOpened = false
      },
      clear() {
        this.inputValue = ''
        setTimeout(() => this.autocompleteOpened = true, 100)
      },
      onValidate(value) {
        this.$emit('validation', value)
      },
      onResize() {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
          this.minWidth = `${document.getElementById(this.id).clientWidth}px`
        }, 1000)
      },
      setIdCalcDataListWidth() {
        this.id = `ds-autocomplete-${Math.random().toString(15).substring(5)}`
        this.onResize()
      }
    },
    watch: {
      value() {
        if (!this.searchId) {
          this.searchId = setTimeout(() => this.searchData(), 300)
        }
      },
      daysMonth(value) {
        if (this.type === 'day') {
          this.bday = this.getDaysRange(value)
        }
      }
    },
    mounted() {
      this.checkAutocompleteData()
      this.setIdCalcDataListWidth()
      window.addEventListener('resize', this.onResize)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.onResize)
    }
  }
</script>

<style lang="less">
  @import '../styles/vars';

  .ds-autocomplete-wrapper {
    margin-bottom: 15px;

    .ds-autocomplete-input {
      width: 100%;
      .ds-slide-label {
        top: 26px !important;
        margin-left: 7px;

        &.ds-slide-label-active {
          top: 22px !important;

          &.ds-label-error {
            color: @color-red;
          }
        }

        &.ds-label-error {
          color: @color-red;
        }
      }

      input {
        height: 50px !important;
        border: 2px solid #e2e2e2 !important;
        border-radius: 5px !important;
        padding-bottom: 2px !important;

        font-size: 16px !important;
        padding-left: 20px !important;
        font-weight: 400 !important;
        font-family: Roboto, sans-serif !important;
        color: #989898 !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;

        &:not(.ds-error) {
          &:focus {
            color: rgba(0, 0, 0, 0.87) !important;
            border: 1px solid rgba(0, 0, 0, 0.87) !important;
          }
        }

        &.ds-error {
          color: rgba(0,0,0,0.87) !important;
          border-color: @color-red !important;
        }
      }

      .active-icon {
        bottom: 15% !important;
      }
    }

    .ds-autocomplete-dropdown-content {
      display: inline-block;
      border-radius: 2px;
      box-shadow: @dropdown-shadow;
      background: white;
      height: auto;
      max-height: 240px;
      overflow-y: auto;

      .ds-content {
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
        padding: 0 15px;
        line-height: 48px;
        height: 48px;

        &:hover {
          background-color: @color-gray-200;
        }
      }
    }

    .ds-drawer {
      font-size: 12px !important;
      line-height: 14px !important;
      padding-top: 5px !important;
      padding-right: 5px !important;
    }
  }
</style>
