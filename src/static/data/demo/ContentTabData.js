let usage = `
<ContentTab
  :header="header"
  :description="description"
  :actionText="actionText"
  icon="user-edit-solid"/>

<ContentTab
  :header="header"
  :actionText="actionText"
  icon="user-edit-solid"
>
  <div class="ds-content-tab-demo-data">
    <Icon visa size="32px" class="ds-content-tab-demo-icon"></Icon>
    <span class="ds-content-tab-demo-card-number">
        3210 **** **** 4008
    </span>
  </div>
</ContentTab>
`.slice(1);

export default {
  usage
};
