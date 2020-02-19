<template>
  <span class="ds-toggle-component-wrapper">
    <label class="ds-toggle-wrapper">
      <span
        :class="[
          'ds-toggle-container',
          {
            'ds-toggle-container-inactive': !toggleValue,
            'ds-toggle-container-active': toggleValue
          }
        ]"
      >
      </span>

      <span
        :class="[
          'ds-toggle-circle',
          {
            'ds-toggle-circle-active': toggleValue,
            'ds-toggle-circle-inactive': !toggleValue
          }
        ]"
      >
      </span>

      <span
        :class="[
          'ds-toggle-text',
          {
            'ds-toggle-text-active': toggleValue,
            'ds-toggle-text-inactive': !toggleValue
          }
        ]"
      >
        {{ label }}
      </span>

      <input type="checkbox" v-model="toggleValue" class="ds-toggle-input" />
    </label>
  </span>
</template>

<script>
export default {
  name: 'Toggle',
  props: {
    value: Boolean,
    label: String
  },
  computed: {
    toggleValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-toggle-component-wrapper {
  .ds-toggle-wrapper {
    display: inline-flex;
    align-items: center;
    position: relative;

    .ds-toggle-container {
      display: inline-block;
      cursor: pointer;
      height: 22px;
      width: 40px;
      border-radius: 12px;

      &.ds-toggle-container-active {
        background-color: @color-primary;
      }

      &.ds-toggle-container-inactive {
        background-color: @color-gray-200;
      }
    }

    .ds-toggle-circle {
      display: inline-block;
      position: absolute;
      height: 16px;
      width: 16px;
      border-radius: 50%;

      &.ds-toggle-circle-active {
        background-color: @color-white;
        left: 20px;
      }

      &.ds-toggle-circle-inactive {
        background-color: @color-gray-400;
        left: 4px;
      }
    }

    .ds-toggle-text {
      height: 16px;
      font-family: 'Roboto Medium';
      font-size: 14px;
      line-height: 16px;
      margin-left: 10px;

      &.ds-toggle-text-active {
        color: @color-dark;
      }

      &.ds-toggle-text-inactive {
        color: @color-gray-500;
      }
    }

    .ds-toggle-input {
      display: none;
    }
  }
}
</style>
