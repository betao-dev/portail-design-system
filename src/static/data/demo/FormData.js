let usage = `
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
`.slice(1);

export default {
  usage
};
