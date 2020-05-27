let usage = `
<CollapserMenu :active.sync="active" :titles="titles">
  <template #1>
    <div class="ds-demo-collapser-menu-content">
      First Step
    </div>
  </template>
    ...
</CollapserMenu>
`.slice(1);

export default {
  usage
};
