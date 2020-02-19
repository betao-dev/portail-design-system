let usage = `
<FileUpload
  icon="cloud_upload"
  iconSize="32px"
  title="Add your logo"
  :files="files"
  :preview="true"
  :validators="validators"
  @addfile="addfile"
  @removefile="removefile"
/>
`.slice(1);

export default {
  usage
};
