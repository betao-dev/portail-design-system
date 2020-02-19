<template>
  <div class="row-col">
    <h3>Alert Dialog</h3>
    <Description compnent-name="AlertDialog"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage">
        <code class="html"></code>
      </pre>
    </Collapser>

    <div class="button-group">
      <Button class="button-modal" @click="opened = true"
        >OPEN ALERT DIALOG</Button
      >
    </div>

    <AlertDialog
      :opened.sync="opened"
      :borderColor="borderColor"
      :clickOutsideToClose="false"
      title="Alert Dialog Title"
    >
      <div slot="ds-alert-content">
        {{ text }}
      </div>
    </AlertDialog>
  </div>
</template>

<script>
import AlertDialog from '../../components/AlertDialog';
import Button from '../../components/Button';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { AlertDialogData, GeneralData } from '../../static/index';

export default {
  name: 'AlertDialogDemo',
  components: { AlertDialog, Button, Description, Collapser },
  data() {
    return {
      opened: false,
      openUsage: true,
      borderColor: '#e6e7eb',
      usage: AlertDialogData.usage,
      text: GeneralData.text,
      accepted: false
    };
  }
};
</script>

<style lang="less"></style>
