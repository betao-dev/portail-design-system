<template>
  <div class="row-col">
    <h3>Dialog</h3>

    <p>
      Dialog window can have any body what you want. Just put some HTML code or
      another component inside dialog tag.
    </p>
    <p>State of dialog is regulated by property <b>opened</b>.</p>
    <p>
      Opacity of the backdrop is regulated bu property <b>backdropOpacity</b>.
    </p>
    <Description compnent-name="Dialog"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="button-group">
      <Button class="button-modal" @click="opened = true">OPEN DIALOG</Button>
      <Button class="button-modal" @click="datepickerVisible = true" alt
        >OPEN CALENDAR</Button
      >
      <Button class="button-modal" @click="openedFullScreen = true"
        >OPEN FULL SCREEN DIALOG SCROLL</Button
      >
      <Button class="button-modal" @click="openedComplexFullScreen = true"
        >OPEN FULL SCREEN COMPLEX DIALOG</Button
      >
    </div>

    <Dialog :opened.sync="opened" :borderColor="borderColor">
      <div class="dialog-body-default">{{ text }}</div>
    </Dialog>

    <Dialog :opened.sync="datepickerVisible" :backdropOpacity="'0.3'">
      <Datepicker
        :min="datepickerMin"
        :max="datepickerMax"
        v-model="datepickerValue"
      ></Datepicker>
    </Dialog>

    <Dialog
      :opened.sync="openedFullScreen"
      :fullScreen="fullScreenActive"
      :enableLoader="true"
    >
      <div class="ds-dialog-header">
        <Button icon-right="close" alt @click="closeFullScreen()"
          >Close modal</Button
        >
      </div>
      <div class="ds-dialog-body">
        <div v-for="n in 25" :key="n">
          {{ text }}
        </div>
      </div>
    </Dialog>

    <Dialog
      :opened.sync="openedComplexFullScreen"
      :fullScreen="complexFullScreenActive"
      :backdropOpacity="'0.3'"
      :min-height="minHeight"
      :min-width="minWidth"
    >
      <div class="header-dialog-body">
        <Button
          class="header-button"
          alt
          @click="openedInsideComplexFullScreen = true"
          >Open new one dialog</Button
        >
        <Button class="header-button" alt @click="closeComplexFullScreen()"
          >Close dialog</Button
        >
      </div>
      <div class="full-screen-dialog-body">
        {{ text }}
      </div>

      <Dialog
        :opened.sync="openedInsideComplexFullScreen"
        :backdropOpacity="'0.3'"
      >
        <div class="header-dialog-body">
          <Button alt @click="closeInsideComplexFullScreen()"
            >Close inner dialog</Button
          >
        </div>
        <div class="dialog-body-default">
          {{ text }}
        </div>
      </Dialog>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '../../components/Dialog';
import Button from '../../components/Button';
import Datepicker from '../../components/Datepicker';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { DialogData, GeneralData } from '../../static/index';

export default {
  name: 'DialogDemo',
  components: { Dialog, Button, Datepicker, Description, Collapser },
  data() {
    return {
      opened: false,
      openedFullScreen: false,
      openedComplexFullScreen: false,
      openedInsideComplexFullScreen: false,
      datepickerValue: new Date(),
      datepickerVisible: false,
      datepickerMin: undefined,
      datepickerMax: undefined,
      borderColor: '#e6e7eb',
      usage: DialogData.usage,
      openUsage: true,
      complexFullScreenActive: true,
      fullScreenActive: true,
      text: GeneralData.text,
      minWidth: '100%',
      minHeight: '100%'
    };
  },
  methods: {
    closeComplexFullScreen() {
      this.openedComplexFullScreen = false;
    },
    closeInsideComplexFullScreen() {
      this.openedInsideComplexFullScreen = false;
    },
    closeFullScreen() {
      this.openedFullScreen = false;
    }
  }
};
</script>

<style scoped lang="less">
@import '../../styles/vars';

.dialog-body-default {
  height: auto;
  width: 600px;
  padding: 20px;
}

.ds-dialog-body {
  padding: 20px;
}

.full-screen-dialog-body {
  padding: 20px;
}

.header-dialog-body {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-bottom: 1px solid @color-gray-300;

  .header-button {
    &:nth-child(1) {
      margin-right: 10px;
    }
  }
}

.button-group {
  .button-modal {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

.button {
  margin: 10px;
}
</style>
