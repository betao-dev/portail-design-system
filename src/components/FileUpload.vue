<!--
  FileUplaod with showing an icon and title

  Usage:

  <FileUpload
    :icon="icon"                      - Show Icon on the drop panel
    :iconSize="iconSize"              - Size of the Icon
    :title="title"                    - Show title on the drop panel
    :showErrors="true"                - If this property is true, Show errors under the Image, default value is true
    :validators:="validators"         - Input file validation
    @validation                       - Return validation status
  />
-->

<template>
  <div class="ds-upload-wrapper">
    <vue-dropzone
      v-if="multiple"
      :options="mainOptions"
      id="ds-file-upload"
      :style="wrapperStyles"
      :useCustomSlot="true"
    >
      <div v-if="!preview" class="ds-upload-preview">
        <div>
          <Icon
            v-if="icon"
            :source="icon"
            :size="iconSize"
            :color="iconColor"
          ></Icon>
        </div>
        <div class="ds-upload-preview-title">{{ title }}</div>
        <div class="ds-upload-preview-subtitle">{{ subTitle }}</div>
      </div>
      <div
        v-else-if="inputValue.length === 0"
        class="ds-dropzone-custom-content"
      >
        <div class="ds-icon-wrapper">
          <Icon v-if="icon" :source="icon" :size="iconSize" />
        </div>

        <div class="ds-title">
          {{ title }}
        </div>
      </div>

      <div v-else class="ds-selected-files-wrapper">
        <div
          v-for="(f, index) in inputValue"
          :key="index"
          class="ds-file-wrapper"
        >
          <img width="100" height="100" :src="f.dataURL" />
          <div class="remove-icon-wrapper">
            <Icon
              source="close"
              color="#ddd"
              size="24px"
              @click.native="removeFile(f, index)"
            />
          </div>
        </div>
      </div>
    </vue-dropzone>

    <vue-dropzone
      v-else
      :options="mainOptions"
      id="ds-file-upload"
      :style="wrapperStyles"
      :useCustomSlot="true"
    >
      <div v-if="!preview" class="ds-upload-preview">
        <div>
          <Icon
            v-if="icon"
            :source="icon"
            :size="iconSize"
            :color="iconColor"
          ></Icon>
        </div>
        <div class="ds-upload-preview-title">{{ title }}</div>
        <div class="ds-upload-preview-subtitle">{{ subTitle }}</div>
      </div>
      <div v-else class="ds-selected-files-wrapper">
        <div class="ds-file-wrapper">
          <template v-if="checkEmptyFile">
            <div class="ds-file-empty">
              <Icon
                source="cloud-upload-alt-solid"
                color="#778CA2"
                size="30px"
              />
              <div>Ajouter un logo</div>
            </div>
          </template>

          <template v-else>
            <img
              :class="imageType"
              :src="
                typeof inputValue === 'object' ? inputValue.dataURL : inputValue
              "
            />
            <div class="cloud-icon-wrapper">
              <Icon source="cloud-upload-alt-solid" color="white" size="18px" />
            </div>
          </template>

          <div class="remove-icon-wrapper">
            <Icon
              source="close"
              color="#ddd"
              size="24px"
              @click.stop="removeFile(inputValue)"
            />
          </div>
        </div>

        <div class="ds-title-wrapper">
          <div class="ds-title">{{ title }}</div>
          <div v-if="!disabled" class="ds-description">{{ description }}</div>
        </div>
      </div>
    </vue-dropzone>

    <div
      :class="['ds-errors', { 'ds-errors-no-preview': !preview }]"
      v-if="inputErrors.length && touched"
    >
      {{ inputErrors[0] }}
    </div>
    <div v-if="!preview" class="ds-file-upload-list-wrapper">
      <div
        :class="{
          'ds-file-upload-list-multiple': inputValue && inputValue.length
        }"
        v-if="multiple"
      >
        <div
          v-for="(file, index) in inputValue"
          :key="index"
          class="ds-file-upload-item"
        >
          <div class="ds-file-upload-item-name-wrapper">
            <div class="ds-file-upload-item-name">{{ file.name }}</div>
          </div>
          <Icon
            class="ds-file-upload-item-icon"
            source="trash"
            color="#F03F3F"
            size="20px"
            @click.native="removeFile(file, index)"
          />
        </div>
      </div>
      <div
        :class="{
          'ds-file-upload-list-single': !Array.isArray(inputValue) && inputValue
        }"
        v-else-if="currentFile && inputValue"
      >
        <div class="ds-file-upload-item">
          <div class="ds-file-upload-item-name-wrapper">
            <div class="ds-file-upload-item-name">{{ currentFile.name }}</div>
          </div>
          <Icon
            class="ds-file-upload-item-icon"
            source="trash"
            color="#F03F3F"
            size="20px"
            @click.native="removeFile(inputValue)"
          />
        </div>
      </div>
    </div>
    <Loader class="ds-file-upload-loader" v-model="loader"></Loader>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import Loader from './Loader.vue';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { isEqual, isEmpty } from 'lodash';

export default {
  name: 'FileUpload',
  components: {
    vueDropzone: vue2Dropzone,
    Icon,
    Loader
  },
  props: {
    icon: String,
    iconSize: String,
    iconColor: String,
    title: String,
    subTitle: String,
    description: String,
    value: [Array, File, String],
    validators: Array,
    showErrors: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imageType: String,
    preview: {
      type: Boolean,
      default: true
    },
    uploadAreaStyles: Object,
    remote: Boolean,
    acceptedFiles: {
      type: [String, Array],
      default: () => ['jpg', 'jpeg', 'png', 'pdf']
    },
    loader: Boolean,
    maxFileCount: Number
  },
  data() {
    return {
      mainOptions: {
        addedfile: file => {
          this.touched = true;
          this.errors = [];

          if (
            this.multiple &&
            this.inputValue &&
            this.inputValue.find(f => f.name === file.name)
          ) {
            let message = this.dsTranslate('File selected');

            this.$emit('invalidfile', message);
            this.errors.push(message);
            return;
          }

          if (!this.fileTypeCheck(file)) {
            let message = this.dsTranslate(' ');

            this.$emit('invalidfile', message);
            this.errors.push(message);
            return;
          }

          if (
            this.multiple &&
            this.inputValue &&
            this.inputValue.length + 1 > this.maxFileCount
          ) {
            let message = this.dsTranslate('File max count');

            this.$emit('invalidfile', message);
            this.errors.push(message);
            return;
          }

          setTimeout(() => {
            if (!this.remote) {
              if (!this.multiple) {
                this.inputValue = file.dataURL;
              } else {
                if (Array.isArray(this.inputValue)) {
                  this.inputValue.push(file);
                } else {
                  this.inputValue = [file];
                }
              }
            }

            this.currentFile = file;
            this.$emit('file', file);
            this.$emit('input', this.inputValue);
            this.$emit('validation', this.validation);
          }, 300);
        },
        url: () => '',
        addRemoveLinks: true,
        autoProcessQueue: false
      },
      touched: false,
      errors: [],
      inputValue: [],
      currentFile: undefined
    };
  },
  methods: {
    removeFile(file, index) {
      if (this.remote) {
        this.$emit('remove', { file, index });
      } else {
        if (!this.multiple) {
          this.inputValue = null;
        } else {
          this.inputValue = this.inputValue.filter(f => !isEqual(f, file));
        }
        this.$emit('input', this.inputValue);
      }

      this.$emit('validation', this.validation);
    },
    fileTypeCheck(file) {
      if (typeof this.acceptedFiles === 'string') {
        if (file.type === this.acceptedFiles) {
          return true;
        }

        if (this.acceptedFiles === '*') {
          return true;
        }

        if (this.acceptedFiles.includes('/*')) {
          const type = this.acceptedFiles.replace('/*', '');
          if (file.type.includes(type)) {
            return true;
          }
        }

        return false;
      } else if (Array.isArray(this.acceptedFiles)) {
        return !!this.acceptedFiles.find(type => file.type.includes(type));
      }
    }
  },
  computed: {
    checkEmptyFile() {
      if (isEmpty(this.inputValue)) return true;
      return false;
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return [];
      }

      let data = [];
      for (var i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputValue)
        ]);
      }
      return data;
    },
    inputErrors() {
      if (this.errors.length > 0) {
        return this.errors;
      }

      let errors = [];

      for (var i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message);
        }
      }

      return errors;
    },
    wrapperStyles() {
      if (this.disabled) {
        return {
          backgroundColor: '#F8FAFB',
          borderColor: '#F8FAFB',
          pointerEvents: 'none'
        };
      }

      let wrapperStyles = {
        backgroundColor: '#FFFFFF',
        border: this.preview ? 'solid 1px #E8ECEF' : '1px dashed #778CA2',
        borderRadius: '4px',
        ...this.uploadAreaStyles
      };

      return wrapperStyles;
    }
  },
  watch: {
    value(val) {
      this.inputValue = val;
      this.$emit('validation', this.validation);
    }
  },
  mounted() {
    this.inputValue = this.value;
  }
};
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-upload-wrapper {
  width: 100%;
  font-family: @robotoFont;
  position: relative;

  #ds-file-upload {
    width: 100%;
    position: relative;
    min-height: @file-upload-panel-height;
    padding: 0;
    border-radius: 4px;

    .ds-dropzone-custom-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      .ds-title {
        color: @color-dark;
        font-weight: @file-upload-title-weight;
        font-size: @file-upload-title-size;
        line-height: @fle-upload-line-height;
        margin-top: @file-upload-title-margin-top;
      }
    }

    .ds-selected-files-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      font-family: @robotoFont;

      .ds-file-wrapper {
        margin-right: 24px;
        position: relative;
        height: 67px;

        .ds-file-empty {
          width: 122px;
          height: 65px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          background-color: white;
          border: dashed 1px @color-gray-300;
        }

        img {
          object-fit: cover;
          height: 67px;
          width: auto;

          &.circle {
            width: 67px;
            border-radius: 35px;
          }
        }

        .cloud-icon-wrapper {
          position: absolute;
          bottom: -5px;
          right: -5px;
          background-color: @color-primary;
          width: 26px;
          height: 26px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-icon-wrapper {
          display: none;
        }

        &:hover {
          .remove-icon-wrapper {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }

      .ds-title-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        .ds-title {
          font-size: 18px;
          line-height: 21px;
          letter-spacing: 0.2px;
          color: @color-dark;
        }

        .ds-description {
          font-size: 14px;
          line-height: 21px;
          color: @color-gray-400;
        }
      }
    }

    &:hover {
      border: 1px solid @color-primary !important;
    }
  }

  .ds-upload-preview {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 91px;
    border-radius: 4px;

    .ds-upload-preview-title {
      color: @color-gray-500;
      font-family: Roboto Medium, sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 14px;
      text-transform: uppercase;
    }

    .ds-upload-preview-subtitle {
      color: @color-gray-400;
      font-family: Roboto, sans-serif;
      font-size: 12px;
      letter-spacing: 0;
      line-height: 21px;
      text-align: center;
    }

    &:hover {
      background-color: #f4fbf9;
    }
  }

  .ds-errors {
    color: @color-red;
    font-family: @robotoFont;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    max-width: 100%;
    line-height: 14px;
    margin-top: 6px;

    &.ds-errors-no-preview {
      padding-left: 10px;
    }
  }

  .ds-file-upload-list-wrapper {
    .ds-file-upload-list-multiple,
    .ds-file-upload-list-single {
      margin-top: 16px;
    }

    .ds-file-upload-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      min-height: 27px;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      .ds-file-upload-item-name-wrapper {
        cursor: default;
        color: #252631;
        font-family: Roboto Medium, sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0;
        line-height: 16px;
        padding: 5.5px 0 5.5px 10px;
        width: ~'calc(100% - 42px)';

        .ds-file-upload-item-name {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 300px;

          @media only screen and (max-width: 520px) {
            width: 200px;
          }
        }
      }

      .ds-file-upload-item-icon {
        margin-left: 12.5px;
      }

      &:hover {
        .ds-file-upload-item-name-wrapper {
          border-radius: 4px;
          background-color: #e9f8f3;
        }
      }
    }
  }

  .ds-file-upload-loader {
    &.ds-loader {
      &::v-deep {
        width: ~'calc(100% + 2px)' !important;
        height: ~'calc(100% + 2px)' !important;
      }
    }
  }
}

.dz-preview {
  display: none !important;
}

.dropzone .dz-message {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
</style>
