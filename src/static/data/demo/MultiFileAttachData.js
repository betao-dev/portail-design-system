let usage = `
<MultiFileAttach
  label="Multi File Attach Example"
  :files="files"
  :maxTotalSize="2"
  :maxFileCount="20"
  :validators="validators"
  @fileInput="fileInput"
  @fileRemove="fileRemove"
/>
`.slice(1);

export default {
  usage
};
