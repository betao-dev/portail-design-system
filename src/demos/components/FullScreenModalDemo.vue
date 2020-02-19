<template>
  <div class="row-col">
    <h3>FullScreenModal</h3>

    Full-screen "window" with an optional header and middle-aligned content
    (content takes 8 columns in the middle). The header slot also supports left
    and right corner buttons, add "left" or "right" to the button component
    class to get it attached in the respective corner
    <Description compnent-name="FullScreenModal"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Button @click="show()">Show modal</Button>

    <FullScreenModal v-if="showModal">
      <template #header>
        <Button class="left" plain icon="arrow_back"></Button>
        Hello, World!
        <Button class="right" plain icon="close" @click="hide()"></Button>
      </template>
      Lorem ipsum dolor sit amet...
    </FullScreenModal>
  </div>
</template>

<script>
import FullScreenModal from '../../components/FullScreenModal.vue';
import Button from '../../components/Button.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { FullScreenModalData } from '../../static/index';

export default {
  name: 'FullScreenModalDemo',
  components: { FullScreenModal, Button, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: FullScreenModalData.usage,
    showModal: false
  }),
  methods: {
    show() {
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    },
    hide() {
      this.showModal = false;
      document.body.style.overflow = 'auto';
    }
  }
};
</script>
