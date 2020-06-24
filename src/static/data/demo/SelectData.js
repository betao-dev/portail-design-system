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

  <Select
    lg
    alt-icon
    class="ds-select-demo"
    v-model="selectValue3"
    :options="options2"
    :placeholder="placeholderSelect"
    :option-styles="optionStyles"
    custom-content
    reversible-icon
    width="414px"
    data-mode
    :readonly="false"
  >
    <template #1>
      <div class="ds-demo-square">
        <Icon percent-solid size="18px" color="primary"></Icon>
      </div>
    </template>
    ...
  </Select>
`.slice(1);

export default {
  usage
};
