<!--
  MultiFileAttach - Customized multi-file-attach component with label.

  Usage:

  <MultiFileAttach
    :label="label"                - Label at the top of the file input
    :files="files"                - Array of inputted files
    :maxTotalSize="maxTotalSize"  - Maximum size of total files you can attach
    :maxFileCount="maxFileCount"  - Maximum number of files you can attach
    :validators="validators"      - You can add error message, and validation function in this array
    @fileInput="fileInput"        - Emitted after selecting the file using file-browser
    @fileRemove="fileRemove"      - Emitted when user removes the file
    @validation="validation"      - Emitted when user select the file
  />
-->

<template>
  <div>
    <div class="ds-input-wrapper">
      <input
        type="file"
        id="ds-file-input"
        ref="file"
        @change="fileInputChange"
        multiple
      />
      <Input
        type="text"
        :class="{ 'ds-error': inputErrors.length && touched }"
        :label="label"
        v-model="selectedFileText"
        disabled
      />
      <Icon
        attach_file
        class="ds-open-icon"
        size="20px"
        padding="8px"
        color="gray-500"
        @click="fileInputOpen"
      />
    </div>

    <div class="ds-errors" v-if="inputErrors.length && touched && showErrors">
      {{ inputErrors[0] }}
    </div>

    <div class="ds-files-wrapper" v-if="files.length > 0">
      <div v-for="file in files" :key="file.name" class="ds-file-name">
        <span class="ds-name">{{ file.name }}</span>
        <Icon
          close
          class="ds-close"
          size="16px"
          padding="4px"
          color="red"
          @click="removeFile(file)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Input from './Input';
import Icon from './Icon';

export default {
  name: 'MultiFileAttach',
  components: { Input, Icon },
  props: {
    label: String,
    files: Array,
    validators: Array,
    showErrors: {
      type: Boolean,
      default: true
    },
    maxTotalSize: {
      type: Number,
      default: 2
    },
    maxFileCount: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      touched: false
    };
  },
  computed: {
    selectedFileText() {
      let filesCount = this.files.length;

      if (filesCount === 0) {
        return '';
      } else if (filesCount === 1) {
        return filesCount + ' file selected';
      } else {
        return filesCount + ' files selected';
      }
    },
    currentTotalSize() {
      let totalSize = 0;
      this.files.forEach(file => {
        totalSize += file.size;
      });
      return totalSize;
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return [];
      }

      let data = [];
      for (var i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.files)
        ]);
      }
      return data;
    },
    inputErrors() {
      let errors = [];
      if (this.currentTotalSize / (1024 * 1000) > this.maxTotalSize) {
        errors.push(
          this.dsTranslateComplex(
            ['Total size less', 'MB'],
            [`${this.maxTotalSize}`]
          )
        );
        this.$emit('validation', [['max-total-size', false]]);
      }

      if (this.files.length >= this.maxFileCount) {
        errors.push(
          this.dsTranslateComplex(
            ['Total file count less'],
            [`${this.maxFileCount}`]
          )
        );
        this.$emit('validation', [['max-file-count', false]]);
      }

      for (var i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message);
        }
      }

      return errors;
    }
  },
  methods: {
    fileInputChange(e) {
      this.$emit('fileInput', e.target.files);
      this.$refs.file.type = 'text';
      this.$refs.file.type = 'file';
    },
    fileInputOpen() {
      this.touched = true;
      document.getElementById('ds-file-input').click();
    },
    removeFile(file) {
      this.$emit('fileRemove', file);
    },
    attachedTotalSize(files) {
      let totalSize = 0;
      Object.keys(files).forEach(key => {
        totalSize += files[key].size;
      });
      return totalSize;
    }
  },
  watch: {
    files() {
      this.$emit('validation', this.validation);
    }
  }
};
</script>

<style lang="less">
@import '~@/styles/vars';

.ds-input-wrapper {
  position: relative;

  &.ds-error {
    .ds-input {
      input {
        border-color: @color-red;
      }
    }
  }

  #ds-file-input {
    display: none;
  }

  .ds-input {
    width: 100%;

    label {
      input {
        border: 1px solid @color-gray-300 !important;
        background-color: @color-white !important;
        color: @color-gray-500 !important;
      }
    }
  }

  .ds-open-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
  }
}

.ds-files-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 24px;

  .ds-file-name {
    height: 24px;
    background-color: #f4f6fb;
    border: 1px solid #e6e7eb;
    border-radius: 2px;
    display: flex;
    align-items: center;
    margin-right: 12px;
    margin-bottom: 8px;

    .ds-name {
      font-size: 12px;
      line-height: 16px;
      color: #838795;
      padding: 4px;
    }

    .ds-close {
      cursor: pointer;
    }
  }
}

.ds-errors {
  color: @color-red;
  font-family: @font-family;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  max-width: 100%;
}
</style>
