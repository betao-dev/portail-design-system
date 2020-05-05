let usage = `
<Tabs
  :tabs="tabs"
  :active="active"
  :enableLoader="enableLoader"
  :disabled="disabled"
  :additional-content-styles="styles"
  tabs-align="flex-start"
  alt-tabs
  @tab:click="onTabClick"
>
  <template #tabs-header-additional-content>
    <Toggle v-model="toggleValue" label="A company"></Toggle>
  </template>
  <template #tabs-1>
    ...
  </template>
    ...
</Tabs>

<Tabs
  :tabs="2"
  :active="customTabActive"
  full-header
  plain-header
  card-wrapper
  inactive-tabs
  @tab:click="onCustomTabClick"
  class="ds-demo-income-overdue"
>
  <template #tab-header-1>
    ...
  </template>
    ...
  <template #tabs-1>
    ...
  </template>
    ...
</Tabs>
`.slice(1);

const tabs = [
  {
    text: 'Infos personelles'
  },
  {
    text: 'Adresse'
  },
  {
    text: 'Commentaires'
  }
];

const customTabs = [{}, {}];

export default {
  usage,
  tabs,
  customTabs
};
