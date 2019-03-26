<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in items">
      <a
        :class="['item-container', {
          disabled: item.disabled
        }]"
        :key="index"
        :href="item.href"
        @click="itemClick(item, index)"
      >
        <div v-if="index !== 0" class="divider" />

        <div class="item">
          <Icon
            v-if="item.icon"
            :source="item.icon"
            size="20px"
            padding="6px 0"
            color="gray-400"
          />
          <span class="title">{{ item.title }}</span>
        </div>
      </a>
    </template>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'Menu',
  components: {
    Icon
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    itemClick(item, index) {
      if (item.disabled) return
      this.$emit('item:click', item, index)
    }
  }
}
</script>

<style lang="less">
@import '../styles/vars';

.menu-wrapper {
  background-color: @color-white;
  box-shadow: @app-menu-shadow;

  .item-container {
    display: block;
    text-decoration: none;
    color: @color-dark;
    font-size: @app-menu-font-size;

    &:hover {
      text-decoration: none;
    }

    &.disabled {
      color: @color-gray-400;
    }

    .divider {
      height: 1px;
      width: 100%;
      background: @color-gray-300;
    }

    .item {
      display: flex;
      align-items: center;
      padding: @app-menu-padding;
      cursor: pointer;

      .title {
        margin-left: @app-menu-spacing;
      }
    }
  }
}
</style>
