<template>
  <div class="row-col">
    <h3>MultiFileAttach</h3>

    Customized multi-file-attach component with label.
    <Description compnent-name="MultiFileAttach"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>
    <div class="row-col">
      <MultiFileAttach
        label="Multi File Attach Example"
        :files="files"
        :validators="demoValidators"
        @fileInput="fileInput"
        @fileRemove="fileRemove"
      />
    </div>
  </div>
</template>

<script>
import MultiFileAttach from '../../components/MultiFileAttach.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { MultiFileAttachData } from '../../static/index';

export default {
  name: 'MultiFileAttachDemo',
  components: { MultiFileAttach, Description, Collapser },
  data() {
    return {
      openUsage: true,
      usage: MultiFileAttachData.usage,
      files: [],
      demoValidators: [
        {
          name: 'required',
          message: 'This field is required',
          validator: files => files.length > 0
        }
      ]
    };
  },
  methods: {
    fileInput(files) {
      if (!this.files.find(f => f.name == files[0].name)) {
        this.files = [...this.files, ...files];
      }
    },
    fileRemove(file) {
      this.files = this.files.filter(f => f.name !== file.name);
    }
  }
};
</script>
