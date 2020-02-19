import GeneralData from '../GeneralData';

let usage = `
<Dialog :opened.sync="opened"
        :borderColor="borderColor">
  <div class="ds-dialog-body">
  ${GeneralData.text}
  </div>
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
>
  <div class="ds-dialog-header">
    <Button icon-right="close" alt @click="closeFullScreen()">Close modal</Button>
  </div>
  <div class="ds-dialog-body">
    ${GeneralData.text}
    ...
  </div>
</Dialog>
`.slice(1);

export default {
  usage
};
