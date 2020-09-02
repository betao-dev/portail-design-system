let usage = `
  <Select
    lg
    v-model="selectValue"
    label="Select"
    :options="options"
    :validators="selectValidators"
    :placeholder="'Input Value'"
    :idMode="true"
    extra-error-padding
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
    :validators="selectValidators3"
    custom-content
    reversible-icon
    type="number-dot-comma"
    width="414px"
    data-mode
    :readonly="false"
    :maxlength="3"
    extra-error-padding
  >
    <template #1>
      <div class="ds-demo-square">
        <Icon percent-solid size="18px" color="primary"></Icon>
      </div>
    </template>
    ...
  </Select>

  <Select
    lg
    class="ds-select-demo"
    v-model="selectValue4"
    label="Select"
    :options="options"
    :validators="selectValidators"
    :idMode="true"
    extra-error-padding
    alt-select
    alt-icon
    reversible-icon
    disabled
  />

  <Select
    lg
    class="ds-select-option-checkbox"
    v-model="selectValue5"
    label="Utiliser un avoir"
    placeholder="Sélectionnez un ou des avoirs"
    :options="options3"
    :idMode="true"
    extra-error-padding
    alt-select
    alt-icon
    reversible-icon
    option-content
    width="336px"
  >
    <template #option1>
      <CheckBox class="option-checkbox" v-model="checkbox1">
        <template>
          <div class="label-wrapper">
            <span class="number">Avoir #000001</span>
            <span class="price">(230 €)</span>
          </div>
        </template>
      </CheckBox>
    </template>
    <template #option2>
        ...
    </template>
  </Select>
`.slice(1);

export default {
  usage
};
