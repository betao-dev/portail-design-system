import GeneralData from '../GeneralData';

let usage = `
<AlertDialog
  :opened.sync="opened"
  :borderColor="borderColor"
  :clickOutsideToClose="false"
  title="Alert Dialog Title"
>
  <div slot="ds-alert-content">
    ${GeneralData.text}
  </div>
</AlertDialog>
`;

export default { usage };
