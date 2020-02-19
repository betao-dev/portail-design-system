let usage = `
  <Select
    lg
    v-model="selectValue"
    label="Select"
    :options="options"
    :validators="selectValidators"
    :placeholder="'Input Value'"
    :idMode="true"
  />

  <Select
    md
    v-model="selectValue2"
    label="Select"
    help="This is an explanation of what the select is used for."
    :options="options"
    :idMode="true"
    @change="changeSelect"
  />
`.slice(1);

export default {
  usage
};
