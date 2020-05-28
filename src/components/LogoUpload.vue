<template>
  <div class="logo-upload">
    <vue-dropzone
      id="ds-file-upload"
      ref="pane"
      :options="mainOptions"
      :style="wrapperStyles"
      :useCustomSlot="true"
    >
      <div class="ds-selected-files-wrapper">
        <div class="ds-file-wrapper">
          <template v-if="checkEmptyFile">
            <div class="ds-file-empty">
              <Icon
                source="cloud-upload-alt-solid"
                color="#1EB386"
                size="30px"
              />
              <div>Ajouter un logo</div>
            </div>
          </template>

          <template v-else>
            <img :src="inputValue === 'object' ? inputValue.dataURL : inputValue" />
          </template>
        </div>
      </div>
    </vue-dropzone>

    <div class="logo-footer">
      <div class="empty-message" v-if="checkEmptyFile">
        Votre logo doit être au format JPG ou PNG et inférieur à 1Mo.
      </div>
      <div class="actions" v-else>
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
    value: [File, String]
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
          if (!this.fileTypeCheck(file)) {
            let message = this.dsTranslate('File invalid');
            this.$emit('invalidfile', message);
            this.errors.push(message);
            return;
          }
          setTimeout(() => {
            this.inputValue = file.dataURL;
            this.$emit('input', this.inputValue);
            this.$emit('validation', this.validation);
          }, 300);
        },
        url: 'https://*',
        addRemoveLinks: true,
        acceptedFiles: 'image/*'
      },
      touched: false,
      errors: [],
      inputValue: null
    }
  },
  methods: {
    removeFile() {
      this.inputValue = null;
      this.$emit('input', this.inputValue);
      this.$emit('validation', this.validation);
    },
    add() {
      if (this.$refs.pane) {
        this.$refs.pane.$el.click();
      }
    },
    fileTypeCheck(file) {
      if (file.type === this.mainOptions.acceptedFiles) {
        return true;
      }

      if (this.mainOptions.acceptedFiles === '*') {
        return true;
      }

      if (this.mainOptions.acceptedFiles.includes('/*')) {
        const type = this.mainOptions.acceptedFiles.replace('/*', '');
        if (file.type.includes(type)) {
          return true;
        }
      }

      return false;
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
      const wrapperStyle = {
        backgroundColor: '#FFFFFF',
      };

      if (this.checkEmptyFile) {
        wrapperStyle.border = 'dashed 1px #1EB386';
      } else {
        wrapperStyle.border = 'solid 1px #E8ECEF'
      }
      
      return wrapperStyle;
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
}
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

    .ds-selected-files-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      font-family: @robotoFont;

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
          font-family: "Roboto Medium";
          background-color: white;
          text-transform: uppercase;

          .icon-wrapper {
            margin-bottom: 4px;
          }
        }

        img {
          object-fit: cover;
          height: 118px;
          width: 100%;
        }
      }
    }
  }


  .logo-footer {
    margin-top: 12px;

    .empty-message {
      font-size: 12px;
      line-height: 21px;
      color: @color-gray-400;
      font-family: 'Roboto Regular';
    }

    .actions {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      text-transform: uppercase;
      font-family: 'Roboto Medium';

      .remove-action {
        display: flex;
        align-items: center;
        line-height: 14px;
        color: @color-gray-500;
        cursor: pointer;

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

        .icon-wrapper {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
