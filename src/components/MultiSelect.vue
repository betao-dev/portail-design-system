<template>
  <div class="ds-usv3-multi-select">
    <div
      class="ds-usv3-multi-select-header"
      ref="usv3MultiSelect"
      @click="updateOpenState"
    >
      <Icon :source="titleIcon" :size="titleIconSize" :color="titleIconColor" />

      <span class="ds-usv3-multi-select-title">
        {{ title }}
      </span>

      <span v-if="allOptionSelected" class="ds-usv3-multi-select-value">
        All
      </span>

      <span v-if="!allOptionSelected" class="ds-usv3-multi-select-value">
        {{ selectedItems }}
      </span>

      <Icon expand_more color="gray-500" />
    </div>

    <div class="ds-usv3-multi-select-body">
      <Dropdown
        :target="$refs.usv3MultiSelect"
        :opened.sync="openDropDownList"
        position="bottom-left"
        class="ds-usv3-multi-select-container"
      >
        <div class="ds-usv3-multi-select-dropdown-content">
          <div
            class="ds-usv3-multi-select-container-wrapper"
            v-for="(option, index) in optionsWrapper"
            :key="index"
          >
            <CheckBox v-model="option.state" :label="option.value" boldLabel>
            </CheckBox>
          </div>
        </div>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import Icon from './Icon';
import Dropdown from './Dropdown';
import CheckBox from './CheckBox';

export default {
  name: 'MultiSelect',
  components: { Icon, Dropdown, CheckBox },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: Array,
    title: String,
    titleIcon: String,
    titleIconSize: {
      type: String,
      default: '18px'
    },
    titleIconColor: {
      type: String,
      default: 'gray-500'
    }
  },
  data: () => ({
    openDropDownList: false,
    allOptionSelected: false,
    optionsWrapper: []
  }),
  computed: {
    selectedItems() {
      return this.value.map(item => item.value).join(', ');
    }
  },
  methods: {
    updateOpenState() {
      this.openDropDownList = !this.openDropDownList;
    },
    setOptions(options) {
      if (this.value.length) {
        this.optionsWrapper = options.map(option => {
          return {
            ...option,
            state: !!this.value.find(val => val.value === option.value)
          };
        });
      } else {
        this.optionsWrapper = options.slice();
      }
    },
    checkAllOptionSelected(selectedOptions, generalOptions) {
      return (
        !!selectedOptions.length &&
        !!generalOptions.length &&
        selectedOptions.length === generalOptions.length
      );
    }
  },
  watch: {
    options: {
      handler(newOptions) {
        this.setOptions(newOptions);
      },
      deep: true
    },
    optionsWrapper: {
      handler(newOptions) {
        let newValue = newOptions.filter(option => option.state);
        this.allOptionSelected = this.checkAllOptionSelected(
          newValue,
          newOptions
        );

        this.$emit('input', newValue);
      },
      deep: true
    }
  },
  mounted() {
    this.setOptions(this.options);
    this.allOptionSelected = this.checkAllOptionSelected(
      this.value,
      this.options
    );
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-usv3-multi-select {
  display: inline-block;
  position: relative;

  .ds-usv3-multi-select-header {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;

    .ds-usv3-multi-select-title,
    .ds-usv3-multi-select-value {
      height: 14px;
      font-family: Roboto, sans-serif;
      font-size: 12px;
      line-height: 14px;
    }

    .ds-usv3-multi-select-title {
      color: @color-gray-500;
      margin-left: 4px;
      margin-right: 6px;
    }

    .ds-usv3-multi-select-value {
      color: @color-dark;
    }
  }

  .ds-usv3-multi-select-body {
    .ds-usv3-multi-select-container {
      border-radius: 4px;
      box-shadow: 0 2px 16px 0 rgba(153, 155, 168, 0.12);
      background-color: @color-white;

      .ds-usv3-multi-select-dropdown-content {
        margin: 24px 20px 20px;

        .ds-usv3-multi-select-container-wrapper {
          margin-bottom: 18px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
