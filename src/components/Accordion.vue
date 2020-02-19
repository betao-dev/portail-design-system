<!--
  Accordion component are useful when you want to toggle between hiding and showing large amount of content

  Usage:

  <Accordion
    v-model="value"> - Accordions array which is consist of objects with properties for creating children of accordion component which consist next field:
                        label - The title name child of accordion component
                        name  - Responsible for the slot name for inserting right template
                        open  - Responsible for open status child of accordion

    Accordion content...
  </Accordion>
-->

<template>
  <div class="ds-accordion-wrapper">
    <Collapser
      :opened.sync="accordion.open"
      :label="getLabel(accordion.label, index)"
      v-for="(accordion, index) in value"
      :key="index"
    >
      <slot :name="accordion.name"></slot>
    </Collapser>
  </div>
</template>

<script>
import Collapser from './Collapser';

export default {
  name: 'Accordion',
  components: { Collapser },
  props: {
    value: Array
  },
  methods: {
    getLabel(label, index) {
      return `${++index}. ${label}`;
    }
  }
};
</script>

<style lang="less">
@import '../styles/vars';

.ds-accordion-wrapper {
  width: 100%;

  .ds-collapser {
    margin-bottom: unset;
    padding-bottom: 1px;
    box-shadow: inset 0 -1px 0 0 @color-gray-300;

    .ds-collapser-header {
      & > div {
        justify-content: left;
      }

      .ds-title {
        flex: none;
        text-transform: none;
        letter-spacing: normal;
        font-weight: normal;
        font-size: 18px;
        margin-left: 12px;
      }

      .ds-icon-wrapper {
        margin-left: 10px;
      }
    }
  }
}
</style>
