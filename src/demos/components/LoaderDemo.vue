<template>
  <div class="row-col">
    <h3>Loader</h3>
    <p>
      Loader component for displaying in time of loading any state of
      application
    </p>

    <Description compnent-name="Loader"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div>
      <Button @click="temporaryFullScreenLoader"
        >Open full screen loader on 5 sec</Button
      >

      <Loader v-model="loadingFullScreen" :fullScreen="fullScreen"></Loader>
    </div>
    <div class="demo-loader-wrapper">
      <Button class="base-btn-loader" @click="temporaryLoader"
        >Open dialog with loader on 5 sec</Button
      >

      <Dialog :opened.sync="dialogOpened" :enableLoader="loading">
        <div class="dialog-body-default">{{ text }}</div>
      </Dialog>
    </div>
    <div class="demo-loader-wrapper">
      <Button
        class="base-btn-loader base-btn-loader-bottom"
        @click="temporarySignatureLoader"
      >
        Apply loader on signature component on 5 sec
      </Button>

      <Signature v-model="signatureData">
        <template #loader>
          <Loader v-model="loadingSignature"></Loader>
        </template>
      </Signature>
    </div>
  </div>
</template>

<script>
import Loader from '../../components/Loader';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import Button from '../../components/Button';
import Dialog from '../../components/Dialog';
import Signature from '../../components/Signature';
import { LoaderData, GeneralData } from '../../static/index';

export default {
  name: 'LoaderDemo',
  components: { Loader, Collapser, Description, Button, Dialog, Signature },
  data: () => ({
    text: GeneralData.text,
    usage: LoaderData.usage,
    openUsage: true,
    loadingFullScreen: false,
    loading: false,
    loadingSignature: false,
    fullScreen: true,
    dialogOpened: false,
    signatureData: undefined
  }),
  methods: {
    temporaryFullScreenLoader() {
      this.loadingShow('loadingFullScreen', 5);
    },
    temporaryLoader() {
      this.dialogOpened = true;
      this.loadingShow('loading', 5);
    },
    temporarySignatureLoader() {
      this.loadingShow('loadingSignature', 5);
    },
    loadingShow(name, sec) {
      this[name] = true;
      setTimeout(() => {
        this[name] = false;
      }, sec * 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.demo-loader-wrapper {
  .base-btn-loader {
    margin-top: 10px;
    width: 100%;
  }
  .base-btn-loader-bottom {
    margin-bottom: 10px;
  }
}

.dialog-body-default {
  height: auto;
  width: 600px;
  padding: 20px;
}
</style>
