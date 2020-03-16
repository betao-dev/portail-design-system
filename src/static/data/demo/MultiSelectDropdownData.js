let usage = `
  <MultiSelectDropdown
    sm
    label="Multi Select Small"
    class="example"
    v-model="multiSelectValue"
    :options="options"
    :validators="multiSelectValidators"
    :placeholder="'Input Value'"
    :idMode="true"
  />

  <MultiSelectDropdown
    md
    label="Multi Select Medium"
    class="example"
    v-model="multiSelectValue"
    :options="options"
    :validators="multiSelectValidators"
    :placeholder="'Input Value'"
    :idMode="true"
  />

  <MultiSelectDropdown
    lg
    label="Multi Select Large"
    class="example"
    v-model="multiSelectValue"
    :options="options"
    :validators="multiSelectValidators"
    :placeholder="'Input Value'"
    :idMode="true"
  />
`.slice(1);

export default {
  usage
};
