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
    <vue-dropzone v-if="multiple" :options="fileUploadOptions" id="ds-file-upload" :style="wrapperStyles" :useCustomSlot="true">
      <div v-if="inputValue.length === 0" class="ds-dropzone-custom-content">
        <div class="ds-icon-wrapper">
          <Icon
            v-if="icon"
            :source="icon"
            :size="iconSize"
          />
        </div>

        <div class="ds-title">
          {{title}}
        </div>
      </div>

      <div v-else class="ds-selected-files-wrapper">
        <div v-for="(f, index) in inputValue" :key="index" class="ds-file-wrapper">
          <img width="100" height="100" :src="f.dataURL" />
          <div class="remove-icon-wrapper">
            <Icon source="close" color="#ddd" size="24px" @click.native="removeFile(f)" />
          </div>
        </div>
      </div>
    </vue-dropzone>

    <vue-dropzone v-else :options="fileUploadOptions" id="ds-file-upload" :style="wrapperStyles" :useCustomSlot="true">
      <div class="ds-selected-files-wrapper">
        <div class="ds-file-wrapper">
          <template v-if="checkEmptyFile">
            <div class="ds-file-empty">
              <Icon source="cloud-upload-alt-solid" color="#778CA2" size="30px" />
              <div>Ajouter un logo</div>
            </div>
          </template>

          <template v-else>
            <img :class="imageType" :src="typeof inputValue === 'object' ? inputValue.dataURL : inputValue" />
            <div class="cloud-icon-wrapper">
              <Icon source="cloud-upload-alt-solid" color="white" size="18px" />
            </div>
          </template>

          <div class="remove-icon-wrapper">
            <Icon source="close" color="#ddd" size="24px" @click.stop="removeFile(inputValue)" />
          </div>
        </div>

        <div class="ds-title-wrapper">
          <div class="ds-title">{{ title }}</div>
          <div v-if="!disabled" class="ds-description">{{ description }}</div>
        </div>
      </div>
    </vue-dropzone>

    <div class="ds-errors" v-if="inputErrors.length && touched">
      {{ inputErrors[0] }}
    </div>
  </div>
  
</template>

<script>
import Icon from './Icon.vue'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { isEqual, isEmpty } from 'lodash'

export default {
  name: "FileUpload",
  components: {
    vueDropzone: vue2Dropzone,
    Icon
  },
  props: {
    icon: String,
    iconSize: String,
    title: String,
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
    imageType: String
  },
  data() {
    return {
      mainOptions: {
        addedfile: (file) => {
          this.touched = true
          this.errors = []

          if (this.multiple && this.inputValue.find(f => f.name === file.name)) {
            let message = this.dsTranslate('File selected')

            this.$emit('invalidfile', message)
            this.errors.push(message)
            return
          }

          if (!this.fileTypeCheck(file)) {
            let message = this.dsTranslate('File invalid')

            this.$emit('invalidfile', message)
            this.errors.push(message)
            return
          }

          setTimeout(() => {
            if (!this.multiple) {
              this.inputValue = file.dataURL
            } else {
              this.inputValue.push(file)
            }
            this.$emit('input', this.inputValue)
            this.$emit('validation', this.validation)
          }, 300)
        },
        url: 'https://*',
        addRemoveLinks: true,
        acceptedFiles: "image/*"
      },
      touched: false,
      errors: [],
      inputValue: []
    }
  },
  methods: {
    removeFile(file) {
      if (!this.multiple) {
        this.inputValue = null
      } else {
        this.inputValue = this.inputValue.filter(f => !isEqual(f, file))
      }
      this.$emit('input', this.inputValue)
      this.$emit('validation', this.validation)
    },
    fileTypeCheck(file) {
      if (file.type === this.mainOptions.acceptedFiles) {
        return true
      }

      if (this.mainOptions.acceptedFiles === "*") {
        return true
      }

      if (this.mainOptions.acceptedFiles.includes("/*")) {
        const type = this.mainOptions.acceptedFiles.replace("/*", '')
        if (file.type.includes(type)) {
          return true
        }
      }

      return false
    }
  },
  computed: {
    checkEmptyFile() {
      if (isEmpty(this.inputValue)) return true
      return false
    },
    fileUploadOptions() {
      return { ...this.uploadOptions, ...this.mainOptions }
    },
    validation() {
      if (!this.validators || !this.validators.length) {
        return []
      }

      let data = []
      for (var i = 0; i < this.validators.length; i++) {
        data.push([
          this.validators[i].name,
          this.validators[i].validator(this.inputValue)
        ])
      }
      return data
    },
    inputErrors() {
      if (this.errors.length > 0) {
        return this.errors
      }

      let errors = []

      for (var i = 0; i < this.validation.length; i++) {
        if (!this.validation[i][1]) {
          errors.push(this.validators[i].message)
        }
      }

      return errors
    },
    wrapperStyles() {
      if (this.disabled) {
        return {
          backgroundColor: '#F8FAFB',
          borderColor: '#F8FAFB',
          pointerEvents: 'none'
        }
      }

      return {
        backgroundColor: '#FFFFFF',
        border: 'solid 1px #E8ECEF'
      } 
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
      this.$emit('validation', this.validation)
    }
  },
  mounted() {
    this.inputValue = this.value
  }
}
</script>

<style lang="less" scoped>
@import '../styles/vars';

.ds-upload-wrapper {
  width: 100%;
  font-family: @robotoFont;

  #ds-file-upload {
    width: 100%;
    position: relative;
    min-height: @file-upload-panel-height;
    padding: 26px;

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
  }

  .ds-errors {
    color: @color-red;
    font-family: @robotoFont;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    display: block;
    max-width: 100%;
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
