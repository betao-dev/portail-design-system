let usage = `
<Button @click="show()">Show modal</Button>

<FullScreenModal v-if="showModal">
  <template #header>
    <Button class="left" plain icon="arrow_back"></Button>
    Hello, World!
    <Button class="right" plain icon="close" @click="hide()"></Button>
  </template>
  Lorem ipsum dolor sit amet...
</FullScreenModal>
`.slice(1);

export default {
  usage
};
