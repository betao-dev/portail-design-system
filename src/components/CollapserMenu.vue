<template>
  <div class="ds-collapser-menu-wrapper">
    <div
      class="ds-collapser-menu-list"
      v-if="(countItems || titles.length) > 0"
    >
      <div
        ref="collapserList"
        class="ds-collapser-menu-item"
        v-for="(title, index) in countItems || titles"
        :key="index"
      >
        <Collapser
          :[checkLabel]="title"
          :[checkAlignment]="titleAlignment"
          :header-slot-name="getHeaderSlotName(index)"
          :body-slot-name="index + 1"
          :opened="activeItem === index + 1"
          :statusData="getStatusData(index + 1)"
          :prevent-update-opened="preventUpdateActive"
          @beforeUpdateOpened="beforeUpdateActive(index)"
          @update:opened="getOpened(index, $event)"
        >
          <template v-slot:[getHeaderSlotName(index)]>
            <slot :name="getHeaderSlotName(index)"></slot>
          </template>
          <template v-slot:[index+1]>
            <slot :name="index + 1"></slot>
          </template>
        </Collapser>
      </div>
    </div>
  </div>
</template>

<script>
import Collapser from './Collapser';
export default {
  name: 'CollapserMenu',
  components: { Collapser },
  props: {
    titles: Array,
    titleAlignment: {
      type: String,
      default: 'left'
    },
    countItems: Number,
    active: {
      type: Number,
      required: true
    },
    headerSlotActive: {
      type: Boolean,
      default: false
    },
    statusData: {
      type: Array,
      default: () => []
    },
    topAutoScroll: {
      type: Boolean,
      default: false
    },
    preventUpdateActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeItem: {
      get() {
        return this.active;
      },
      set(value) {
        this.$emit('update:active', value);
      }
    },
    checkLabel() {
      return this.countItems ? null : 'label';
    },
    checkAlignment() {
      return this.countItems ? null : 'title-alignment';
    }
  },
  methods: {
    calculateActiveItem(index) {
      let collapserItem = index + 1;
      return this.activeItem === collapserItem ? 0 : collapserItem;
    },
    getOpened(index) {
      this.activeItem = this.calculateActiveItem(index);
    },
    beforeUpdateActive(index) {
      this.$emit('beforeUpdateActive', this.calculateActiveItem(index));
    },
    getHeaderSlotName(index) {
      if (this.headerSlotActive) {
        return `header${index + 1}`;
      }
    },
    getStatusData(number) {
      let validation = this.statusData.find(
        validation => validation.name === number
      );
      return ~validation ? validation : {};
    },
    onTopAutoScroll(index) {
      let top = this.$refs.collapserList[index].offsetTop;
      window.scrollTo({ top });
    }
  },
  watch: {
    activeItem(value) {
      if (this.topAutoScroll && value) {
        this.onTopAutoScroll(value - 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';
.ds-collapser-menu-wrapper {
  &::v-deep {
    .ds-collapser-body {
      padding: 0;
    }
  }
}
</style>
