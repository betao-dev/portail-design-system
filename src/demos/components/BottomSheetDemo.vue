<template>
  <div class="row-col">
    <h3>BottomSheet</h3>
    <p>
      Bottom sheet component it's a surface containing supplementary content
      that are anchored to the bottom of the screen
    </p>
    <Description compnent-name="BottomSheet"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div>
      <Button @click="onShow">Show bottom sheet</Button>
      <BottomSheet :opened.sync="opened" height="500px">
        <template #content>
          <div>
            <div>BottomSheet Title</div>
            <div>Content ...</div>
          </div>
        </template>
      </BottomSheet>
    </div>
  </div>
</template>

<script>
import Button from '../../components/Button.vue';
import BottomSheet from '../../components/BottomSheet.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { BottomSheetData } from '../../static/index';

export default {
  name: 'BottomSheetDemo',
  components: { BottomSheet, Button, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: BottomSheetData.usage,
    active: false,
    opened: false
  }),
  methods: {
    onShow() {
      this.opened = true;
    }
  }
};
</script>

<style scoped lang="less"></style>
