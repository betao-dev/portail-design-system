<template>
  <div class="row-col">
    <h3>Modal</h3>

    Basic Styled Wrapper with an ability to open and close modal

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <Button @click="showModal">Open Modal</Button>
    <Modal
      :visible="visible"
      :fullscreen="false"
      @modal:close="closeModal"
    >
      Hello, World !!!
    </Modal>
  </div>
</template>

<script>
import Modal from '../../components/Modal.vue'
import Button from '../../components/Button.vue'

let usage = `
<Modal
  :visible="visible"
  :fullscreen="false"
  @modal:close="closeModal"
>
  Hello, World !!!
</Modal>

`.slice(1)

export default {
  name: 'ModalDemo',
  components: { Modal, Button },
  data: () => ({
    usage,
    visible: false
  }),
  methods: {
    closeModal() {
      this.visible = false
    },
    showModal() {
      this.visible = true
    }
  }
}
</script>
