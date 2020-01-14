<template>
  <div class="row-col">
    <h3>Confirm Dialog</h3>
    <Description compnent-name="ConfirmDialog"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage">
        <code class="html"></code>
      </pre>
    </Collapser>

    <div class="button-group">
      <Button class="button-modal" @click="opened = true">OPEN CONFIRM DIALOG</Button>
    </div>

    <ConfirmDialog
      :opened.sync="opened"
      :borderColor="borderColor"
      :clickOutsideToClose="false"
      :extraButton="true"
      acceptLabel="Accept"
      rejectLabel="Reject"
      extraButtonLabel="Action"
      title="Dialog box title"
      @accept="accept"
    >
      <div slot="ds-confirm-content">
        {{ text }}
      </div>
    </ConfirmDialog>
  </div>
</template>

<script>
import ConfirmDialog from '../../components/ConfirmDialog'
import Button from '../../components/Button'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser'
import { ConfirmDialogData, GeneralData } from '../../static/index'

export default {
  name: 'ConfirmDialogDemo',
  components: { ConfirmDialog, Button, Description, Collapser },
  data() {
    return ({
      opened: false,
      openUsage: true,
      borderColor: '#e6e7eb',
      usage: ConfirmDialogData.usage,
      text: GeneralData.text,
      accepted: false
    })
  },
  methods: {
    accept(status) {
      this.accepted = status
    }
  }
}
</script>

<style lang="less">
</style>
