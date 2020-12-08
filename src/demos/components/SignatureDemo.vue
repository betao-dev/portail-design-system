<template>
  <div class="row-col">
    <h3>Signature</h3>
    <p>Signature component for make signatures</p>

    <Description compnent-name="Signature"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Signature
      v-model="signature"
      signature-pad-width="100%"
      :validators="validators"
      name="step3"
    ></Signature>
    <div class="ds-demo-signature-button">
      <Button @click="setSignature">Set Signature</Button>
    </div>
    <div class="ds-demo-signature-button">
      <Button @click="checkValidation">Validate</Button>
    </div>
  </div>
</template>

<script>
import Signature from '../../components/Signature';
import Button from '../../components/Button';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { SignatureData } from '../../static/index';

export default {
  name: 'SignatureDemo',
  components: { Signature, Button, Collapser, Description },
  data: () => ({
    usage: SignatureData.usage,
    openUsage: true,
    signature: undefined,
    validators: [
      {
        name: 'required',
        message: 'The textarea is required',
        validator: value => !!value
      }
    ]
  }),
  methods: {
    setSignature() {
      let event = new CustomEvent('signature', {});
      document.dispatchEvent(event);
    },
    checkValidation() {
      const event = new CustomEvent('validateStep3', {});
      document.dispatchEvent(event);
    }
  }
};
</script>

<style lang="less" scoped>
.ds-demo-signature-button {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
