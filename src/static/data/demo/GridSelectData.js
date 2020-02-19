let usage = `
<GridSelect
  :items="[[1, 2, 3], [4, {title: 5, disabled: true}, 6], [7, 8, 9]]"
  :labels-top="['A', 'B', 'C']"
  v-model="selected"
></GridSelect>

<!-- Using scoped slot -->
<GridSelect
  :items="[[1, 2, 3], [4, 5, 6], [7, 8, 9]]"
  :labels-top="['A', 'B', 'C']"
  v-model="selected"
  #default="{item}"
>
  {{ item + 10 }}
</GridSelect>
`.slice(1);

export default {
  usage
};
