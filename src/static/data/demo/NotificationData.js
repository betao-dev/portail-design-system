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
    <div class="ds-notification-demo-title">
      Your invoice just got paid
    </div>
    <div class="ds-notification-demo-description">
      <span class="ds-notification-demo-description-backlit">
        Black Mesa
      </span>
      <span>paid Invoice</span>
      <span class="ds-notification-demo-description-backlit">
        #123456
      </span>
    </div>
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
