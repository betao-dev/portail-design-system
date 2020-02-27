<template>
  <div class="row-col">
    <h3>Notification</h3>
    <p>Notification component for displaying notifications data</p>

    <Description compnent-name="Notification"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Notification
      icon="query_builder"
      color="#FFAB2B"
      :title="title"
      :description="description"
      badge
      :badge-title="badgeTitle"
    />

    <Notification
      icon="file-invoice-solid"
      color="#1EB386"
      :additionalTitle="additionalTitle"
      :additionalDescription="additionalDescription"
    >
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
  </div>
</template>

<script>
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import Notification from '../../components/Notification';
import { NotificationData } from '../../static/index';

export default {
  name: 'NotificationDemo',
  components: { Collapser, Description, Notification },
  data: () => ({
    usage: NotificationData.usage,
    openUsage: true,
    title: 'Ajout des documents nécessaires',
    description: 'Go to Paramètres du compte and add your SIRET number',
    badgeTitle: 'En traitement',
    additionalTitle: '+ $42.20',
    additionalDescription: '14 Nov 4:00 PM'
  })
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';

.ds-notification-wrapper {
  margin-bottom: 8px;
}

.ds-notification-demo-body {
  .ds-notification-demo-title {
    height: 19px;
    color: @color-dark;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    letter-spacing: 0.2px;
    line-height: 19px;
    margin-bottom: 1px;
  }

  .ds-notification-demo-description {
    height: 21px;
    color: @color-gray-400;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    letter-spacing: 0.2px;
    line-height: 21px;

    .ds-notification-demo-description-backlit {
      height: 21px;
      color: @color-primary;
      font-family: 'Roboto Medium';
      font-size: 14px;
      letter-spacing: 0.2px;
      line-height: 21px;
    }
  }
}

.ds-notification-small-demo-wrapper {
  width: 280px;
}
</style>
