let usage = `
<LogoUpload
  v-model="file"
  :accepted-files="acceptedFiles"
  :is-valid.sync="isValid"
  :initial-image-cover="true"
/>
`.slice(1);

export default {
  usage
};
