<template>
  <div>
    <div class="range-input-wrapper" @click="dropdownOpened = !dropdownOpened">
      <Input disabled :value="inputData" :show-validations="false" ref="inputDrop" />
      <Button plain padding="12px" class="close-btn" icon="close" iconColor="#778CA2" iconSize="24px" @click="clearModel" />
    </div>

    <Dropdown
      :target="$refs.inputDrop"
      :opened.sync="dropdownOpened"
      position="bottom-middle"
    >
      <div class="range-selection-wrapper">
        <div class="min-max-values">
          <div class="min-value">{{ sliderModel[0] }}</div>
          <div class="max-value">{{ sliderModel[1] }}</div>
        </div>

        <div class="slider-wrapper">
          <vue-slider
            v-model="sliderModel"
            :process="rangeProcess"
            :min="minLimit"
            :max="maxLimit"
            @change="modelChange"
          />
        </div>

        <div class="limit-values">
          <div class="min-limit">{{ prefix }}{{ minLimit }}</div>
          <div class="max-limit">{{ prefix }}{{ maxLimit }}</div>
        </div>

        <div class="min-max-input-wrapper">
          <Input placeholder="Montant min." v-model="sliderModel[0]" width="100px" />
          <div class="between">To</div>
          <Input placeholder="Montant max." v-model="sliderModel[1]" width="100px" />
        </div>
      </div>
    </Dropdown>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import Input from './Input'
import Button from './Button'
import Dropdown from './Dropdown'

export default {
  name: 'NumberRange',
  components: { Input, Dropdown, Button, VueSlider },
  props: {
    minLimit: {
      type: Number,
      default: 0
    },
    maxLimit: {
      type: Number,
      default: 1000
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: '€'
    }
  },
  data: () => ({
    dropdownOpened: false,
    rangeProcess: dotsPos => [
      [dotsPos[0], dotsPos[1], { backgroundColor: '#1eb386' }]
    ],
    sliderModel: [0, 0]
  }),
  computed: {
    inputData() {
      return this.sliderModel[0] + ' - ' + this.sliderModel[1]
    }
  },
  methods: {
    modelChange(value) {
      this.$emit('change:range', {min: value[0], max: value[1]})
    },
    clearModel(e) {
      e.preventDefault();
      e.stopPropagation();
      this.sliderModel = [0, 0],
      this.$emit('change:range', [0, 0])
    }
  },
  mounted() {
    this.sliderModel = [this.min, this.max]
  },
  watch: {
    min(val) {
      this.sliderModel = [val, this.max]
    },
    max(val) {
      this.sliderModel = [this.min, val]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.range-input-wrapper {
  display: inline-block;
  position: relative;

  .close-btn {
    position: relative;
    right: 45px;
    bottom: 5px;

    &::v-deep {
      .ds-button {
        &:hover, &:focus, &:active {
          background-color: transparent !important;
        }
      }
    }
  }

  &::v-deep {
    input {
      color: @color-dark !important;
      border: solid 1px @color-gray-300 !important;
    }
  }
}

.range-selection-wrapper {
  background-color: @color-white;
  color: @color-dark;
  border: solid 1px @color-gray-300;
  padding: 20px;
  min-width: 200px;

  .min-max-values {
    width: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .min-value, .max-value {
      width: 40px;
      height: 40px;
      background-color: @color-gray-300;
      border-radius: 3px;
      font-size: 12px;
      line-height: 40px;
      text-align: center;
    }
  }

  .slider-wrapper {
    margin-bottom: 10px;
  }

  .limit-values {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .min-max-input-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .between {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>

