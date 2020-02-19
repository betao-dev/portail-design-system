import GeneralData from '../GeneralData';

let usage = `
<ConfirmDialog
  :opened.sync="opened"
  :borderColor="borderColor"
  :clickOutsideToClose="false"
  acceptLabel="Accept"
  rejectLabel="Reject"
  title="Dialog box title"
  @accept="accept"
>
  <div slot="ds-confirm-content">
    ${GeneralData.text}
  </div>
</ConfirmDialog>
`;

export default { usage };
