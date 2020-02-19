let usage = `
<Loader v-model="loadingFullScreen" :fullScreen="fullScreen"></Loader>
   
<Dialog :opened.sync="dialogOpened" :enableLoader="loading">
  <div class="dialog-body-default">{{text}}</div>
</Dialog>

<Signature v-model="signatureData">
  <template #loader>
    <Loader v-model="loadingSignature"></Loader>
  </template>
</Signature>
`.slice(1);

export default {
  usage
};
