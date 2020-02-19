<template>
  <div class="row-col">
    <h3>Form</h3>

    Basic styled componnet: Form, Input, Button
    <Description compnent-name="Form"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="form-demo">
      <Button @click="dialogOpen = !dialogOpen">Open Dialog</Button>
      <Dialog :opened.sync="dialogOpen">
        <Form @submit="formSubmit">
          <div class="form-wrapper">
            <div class="form-title">Form Demo</div>

            <div class="form-item">
              <Input name="name" v-model="name" :validators="inputValidators" />
            </div>

            <div class="form-item">
              <Input name="age" v-model="age" :validators="inputValidators" />
            </div>

            <div class="form-item">
              <Input name="sex" v-model="sex" :validators="inputValidators" />
            </div>

            <Button>Submit</Button>
          </div>
        </Form>
      </Dialog>
    </div>
  </div>
</template>

<script>
import Form from '../../components/Form';
import Button from '../../components/Button.vue';
import Input from '../../components/Input';
import Dialog from '../../components/Dialog';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser';
import { FormData } from '../../static/index';

export default {
  name: 'FormDemo',
  components: { Form, Button, Input, Dialog, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: FormData.usage,
    inputValidators: [
      {
        name: 'required',
        message: 'This field is required',
        validator: value => !!value
      }
    ],
    name: '',
    age: '',
    sex: '',
    dialogOpen: false
  }),
  methods: {
    formSubmit() {}
  }
};
</script>

<style lang="less" scoped>
.form-wrapper {
  padding: 20px;
  width: 500px;
  font-family: Roboto Regular;

  .form-title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }

  .form-item {
    margin-bottom: 20px;

    > * {
      width: 100%;
    }
  }
}
</style>
