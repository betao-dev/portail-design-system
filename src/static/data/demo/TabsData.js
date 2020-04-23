let usage = `    
<Tabs :tabs="tabs"
      :active="active"
      :enableLoader="enableLoader"
      :disabled="disabled"
      :additional-content-styles="styles"
      tabs-align="flex-start"
      alt-tabs
      @tab:click="onTabClick">
  <template #tabs-header-additional-content>
    <Toggle v-model="toggleValue" label="A company"></Toggle>
  </template>
  <template #tabs-1>
    <div class="body-title">Infos personelles</div>
    <div class="ds-demo-tabs-body">
      <Card class="ds-dashboard-report">
      ...
      </Card>
    </div>
  </template>
  <template #tabs-2>
    <div class="body-title">Adresse</div>
    <div class="ds-demo-tabs-body">
      <div class="ds-demo-tab-icons">
        <Icon account_circle size="12px" padding="30px 2px"/>
        ...
      </div>
    </div>
  </template>
  <template #tabs-3>
    <div class="body-title">Commentaires</div>
    <div class="ds-demo-tabs-body">
      <div class="ds-demo-tab-inputs">
        <Input sm label="Small"/>
        ...
      </div>
    </div>
  </template>
</Tabs>

<Tabs
  :tabs="2"
  :active="customTabActive"
  :full-header="true"
  :card-wrapper="true"
  @tab:click="onCustomTabClick"
>
  <template #tab-header-1>
    How things are going?
  </template>

  <template #tab-header-2>
    Nice
  </template>

  <template #tabs-1>
    Tab 1
  </template>
  <template #tabs-2>
    Tab 2
  </template>
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
