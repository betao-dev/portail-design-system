<template>
  <div class="ds-collapser-menu-wrapper">
    <div class="ds-collapser-menu-list" v-if="titles.length > 0">
      <div
        class="ds-collapser-menu-item"
        v-for="(title, index) of titles"
        :key="index"
      >
        <Collapser
          :label="title"
          title-alignment="left"
          :opened="activeItem === index + 1"
          @update:opened="getOpened(index, $event)"
        >
          <slot :name="index + 1"></slot>
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
    titles: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
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
    }
  },
  methods: {
    getOpened(index) {
      let collapserItem = index + 1;
      this.activeItem = this.activeItem === collapserItem ? 0 : collapserItem;
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
