let usage = `
<CollapserMenu
  :active.sync="active"
  :titles="titles"
  :status-data="statusData"
  title-object>
  <template #1>
    ...
    First Step
  </template>
  ...
</CollapserMenu>

<CollapserMenu
  :active.sync="secondActive"
  :count-items="3"
  :header-slot-active="headerSlotActive"
>
  <template #header1>
    ...
    Custom header 1
  </template>
  <template #1>
    ...
    First Step body
  </template>
</CollapserMenu>
`.slice(1);

export default {
  usage
};
