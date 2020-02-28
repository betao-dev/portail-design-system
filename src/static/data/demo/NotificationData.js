let usage = `
<Notification
  icon="query_builder"
  color="#FFAB2B"
  :title="title"
  :description="description"
  badge
  :badge-title="badgeTitle"
/>

<Notification icon="file-invoice-solid"
              color="#1EB386"
              :additionalTitle="additionalTitle"
              :additionalDescription="additionalDescription">
  <div class="ds-notification-demo-body">
    ...
  </div>
</Notification>

<div class="ds-notification-small-demo-wrapper">
  <Notification
    short
    icon="query_builder"
    color="#FFAB2B"
    :title="title"
    :description="description"
  />
</div>
`.slice(1);

export default {
  usage
};
