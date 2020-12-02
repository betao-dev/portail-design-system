<template>
  <div class="row-col">
    <h3>FileUpload</h3>

    FileUpload with showing an icon and title
    <Description compnent-name="FileUpload"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="ds-grid">
      <div class="row demo-wrapper">
        <div class="col-6">
          <div>
            <div>Multi File Upload</div>
            <FileUpload
              v-model="file"
              icon="cloud_upload"
              iconSize="32px"
              title="Add your logo"
              :validators="validators"
              :multiple="true"
            />
          </div>
        </div>

        <div class="col-6">
          <div>
            <div>Single File Upload</div>
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
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div>
            <div>Documents Upload</div>
            <FileUpload
              v-model="file2"
              icon="cloud-upload-alt-solid"
              iconSize="30px"
              iconColor="primary"
              title="importer votre document"
              sub-title="Cliquez pour importer ou glissez directement votre document"
              :validators="validators"
              :preview="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from '../../components/FileUpload.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { FileUploadData } from '../../static/index';

export default {
  name: 'FileUploadDemo',
  components: { FileUpload, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: FileUploadData.usage,
    file: [],
    singleFile: null,
    invalidMessage: '',
    validators: [
      {
        name: 'required',
        message: 'File is required',
        validator: value => (Array.isArray(value) ? value.length > 0 : value)
      }
    ],
    file2: []
  })
};
</script>

<style lang="less" scoped>
.demo-wrapper {
  padding: 40px;
  background-color: white;
}
</style>
