<template>
  <div class="logo-upload">
    <vue-dropzone
      id="ds-file-upload"
      :class="[
        'ds-file-upload-area',
        { 'ds-file-upload-area-full': !checkEmptyFile }
      ]"
      ref="pane"
      :options="{ ...mainOptions }"
      :useCustomSlot="true"
    >
      <div class="ds-selected-files-wrapper">
        <div
          :class="[
            'ds-file-wrapper',
            { 'ds-file-wrapper-cover-initial': initialImageCover }
          ]"
        >
          <template v-if="checkEmptyFile">
            <div class="ds-file-empty">
              <Icon
                source="cloud-upload-alt-solid"
                color="#1EB386"
                :size="iconUploadSize"
              />
              <div>Ajouter un logo</div>
            </div>
          </template>

          <template v-else>
            <img
              :src="inputValue === 'object' ? inputValue.dataURL : inputValue"
            />
          </template>
        </div>
      </div>
    </vue-dropzone>

    <div class="logo-footer">
      <div
        :class="[
          'empty-message',
          { 'empty-message-invalid': !isValid || isTemporaryInvalid }
        ]"
        v-if="checkEmptyFile || isTemporaryInvalid"
      >
        Votre logo doit être au format JPG ou PNG et inférieur à 1Mo.
      </div>
      <div class="actions" v-if="!checkEmptyFile">
        <div class="remove-action" @click="removeFile">
          <Icon source="trash-alt" size="18px" color="#778CA2" />
          <span>Effacer logo</span>
        </div>

        <div class="upload-action" @click="add">
          <Icon source="cloud-upload-alt-solid" size="18px" color="#1EB386" />
          <span>Nouveau logo</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { isEmpty } from 'lodash';

export default {
  name: 'LogoUpload',
  props: {
    value: [File, String],
    iconUploadSize: {
      type: String,
      default: '30px'
    },
    sizeRestriction: {
      type: Number,
      default: 1
    },
    acceptedFiles: {
      type: [String, Array],
      default: 'image/*'
    },
    isValid: Boolean,
    initialImageCover: {
      type: Boolean,
      default: false
    }
  },
  components: {
    vueDropzone: vue2Dropzone,
    Icon
  },
  data() {
    return {
      mainOptions: {
        addedfile: file => {
          this.touched = true;
          this.errors = [];

          if (!this.sizeCheck(file)) {
            return this.fileInvalid();
          }

          if (!this.fileTypeCheck(file)) {
            return this.fileInvalid();
          }

          this.isTemporaryInvalid = false;
          setTimeout(() => {
            this.inputValue = file.dataURL;
            this.$emit('update:isValid', true);
            this.$emit('input', this.inputValue);
            this.$emit('validation', this.validation);
          }, 300);
        },
        url: () => '',
        autoProcessQueue: false,
        addRemoveLinks: true
      },
      touched: false,
      errors: [],
      inputValue: null,
      timeoutId: undefined,
      isTemporaryInvalid: false
    };
  },
  methods: {
    fileInvalid() {
      let message = this.dsTranslate('File invalid');
      this.$emit('invalidfile', message);
      if (!this.value) {
        this.$emit('update:isValid', false);
      } else {
        this.setTemporaryInvalid();
      }
      this.errors.push(message);
    },
    setTemporaryInvalid() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.isTemporaryInvalid = true;
      this.timeoutId = setTimeout(() => {
        this.isTemporaryInvalid = false;
      }, 3000);
    },
    removeFile() {
      this.inputValue = null;
      this.$emit('input', this.inputValue);
      this.$emit('validation', this.validation);
      this.$emit('update:isValid', true);
    },
    add() {
      if (this.$refs.pane) {
        this.$refs.pane.$el.click();
      }
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
    },
    sizeCheck(file) {
      return this.sizeRestriction >= file.size / 1024 / 1024;
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

.logo-upload {
  width: 100%;
  font-family: @robotoFont;

  #ds-file-upload {
    width: 100%;
    position: relative;
    min-height: 120px;
    padding: 0;
    border-radius: 4px;
    cursor: pointer;

    .ds-selected-files-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      font-family: @robotoFont;

      &:hover {
        background-color: #f4fbf9;
      }

      .ds-file-wrapper {
        position: relative;
        height: 118px;
        width: 100%;

        .ds-file-empty {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          line-height: 14px;
          color: @color-gray-500;
          font-family: 'Roboto Medium';
          background-color: white;
          text-transform: uppercase;

          .icon-wrapper {
            cursor: pointer;
            margin-bottom: 4px;
          }

          &:hover {
            background-color: #f4fbf9;
          }
        }

        img {
          object-fit: cover;
          height: 118px;
          width: 100%;
        }

        &.ds-file-wrapper-cover-initial {
          img {
            object-fit: initial;
          }
        }
      }
    }
  }

  .ds-file-upload-area {
    background-color: @color-white;
    border: dashed 1px @color-gray-500;

    &.ds-file-upload-area-full {
      border: solid 1px @color-gray-300;

      img {
        cursor: pointer;
      }

      &:hover {
        border: 1px solid @color-primary;

        img {
          opacity: 0.5;
        }
      }
    }

    &:not(.ds-file-upload-area-full) {
      &:hover {
        border: dashed 1px @color-primary;
      }
    }
  }

  .logo-footer {
    margin-top: 12px;

    .empty-message {
      font-size: 12px;
      line-height: 21px;
      color: @color-gray-400;
      font-family: Roboto, sans-serif;
      letter-spacing: 0;
      cursor: default;

      &.empty-message-invalid {
        color: @color-red;
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      text-transform: uppercase;
      font-family: Roboto Medium, sans-serif;

      .remove-action {
        display: flex;
        align-items: center;
        line-height: 14px;
        color: @color-gray-500;
        cursor: pointer;
        font-weight: 500;
        letter-spacing: 0;

        .icon-wrapper {
          margin-right: 8px;
        }
      }

      .upload-action {
        display: flex;
        align-items: center;
        line-height: 14px;
        color: @color-primary;
        cursor: pointer;
        font-weight: 500;
        letter-spacing: 0;

        .icon-wrapper {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
