let usage = `
<FileUpload
  v-model="file"
  icon="cloud_upload"
  iconSize="32px"
  title="Add your logo"
  :validators="validators"
  :multiple="true"
/>

<FileUpload
  v-model="singleFile"
  icon="cloud_upload"
  iconSize="32px"
  title="Add your logo"
  description="Click to upload a new picture"
  :validators="validators"
  :multiple="false"
  imageType="circle"
/>

<FileUpload
  v-model="file2"
  icon="cloud-upload-alt-solid"
  iconSize="30px"
  iconColor="primary"
  title="importer votre document"
  sub-title="Cliquez pour importer ou glissez directement votre document"
  :validators="validators"
  :preview="false"
  :uploadAreaStyles="uploadAreaStyles"
/>
`.slice(1);

export default {
  usage
};
