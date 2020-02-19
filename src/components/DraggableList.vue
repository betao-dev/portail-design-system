<template>
  <div>
    <div class="ds-draggable-header">
      <div :style="{ width: '36px' }"></div>
      <div
        v-for="(header, index) in headers"
        :style="{ width: header.width, textAlign: header.textDirection }"
        :key="index"
        :class="{ 'flex-grow': header.flexGrow }"
      >
        {{ header.title }}
      </div>
    </div>

    <draggable
      v-model="draggableList"
      :group="group"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        class="ds-draggable-item"
        v-for="(element, index) in list"
        :key="index"
      >
        <Icon menu color="#BABCC2" />
        <span
          v-for="(header, index) in headers"
          :key="index"
          :style="{ width: header.width, textAlign: header.textDirection }"
          :class="{ 'flex-grow': header.flexGrow }"
        >
          {{ element[header.key] || '' }}
        </span>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import Icon from './Icon';

export default {
  name: 'drag-and-drop',
  components: {
    draggable,
    Icon
  },
  props: {
    list: Array,
    headers: Array,
    orderby: String
  },
  mounted() {
    if (this.orderby) {
      this.list
        .sort((a, b) => (a[this.orderby] > b[this.orderby] ? 1 : -1))
        .map((item, index) => ({ ...item, position: index }));
      this.$emit('update:list', this.list);
    }
  },
  data() {
    return {
      group: { name: 'people', pull: 'clone', put: false }
    };
  },
  computed: {
    draggableList: {
      get() {
        return this.list;
      },
      set(value) {
        if (this.orderby) {
          value = value.map((item, index) => ({ ...item, position: index }));
        }
        this.$emit('update:list', value);
      }
    }
  },
  watch: {
    value(newval, oldval) {
      if (!oldval && newval && this.orderby) {
        newval
          .sort((a, b) => (a[this.orderby] > b[this.orderby] ? 1 : -1))
          .map((item, index) => ({ ...item, position: index }));
        this.$emit('update:list', newval);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ds-draggable-header {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  text-align: right;
  font-size: 12px;
  line-height: 12px;
  color: #838795;

  .flex-grow {
    flex-grow: 1;
  }
}

.ds-draggable-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid #e6e7eb;
  border-radius: 2px;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  color: #3f4352;

  > .ds-icon {
    margin-right: 12px;
  }

  .ds-title {
    flex-basis: 40%;
  }

  .flex-grow {
    flex-grow: 1;
  }
}
</style>
