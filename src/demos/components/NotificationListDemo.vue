<template>
  <div class="row-col">
    <h3>NotificationList</h3>
    <p>NotificationList component for displaying list of notifications</p>

    <Description compnent-name="NotificationList"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <NotificationList v-model="notificationListBadge">
      <template slot="header">
        <div class="ds-notification-list-demo-header">
          <div class="ds-notification-list-demo-header-title">
            Liste de choses à faire
          </div>
          <div class="ds-notification-list-demo-counter-wrapper">
            <div class="ds-notification-list-demo-shape">
              <div class="ds-notification-list-demo-data">
                1
              </div>
            </div>
          </div>
        </div>
      </template>
    </NotificationList>

    <NotificationList
      v-model="notificationList"
      title="All Notifications"
      title-right="Mark all as read"
    >
      <template slot="notification1">
        <div class="ds-notification-demo-body">
          <div class="ds-notification-demo-title">
            Invoice overdue
          </div>
          <div class="ds-notification-demo-description">
            Invoice
            <span class="ds-notification-demo-description-backlit"
              >#654321</span
            >
            to
            <span class="ds-notification-demo-description-backlit">
              Level UP Coffee
            </span>
            is overdue by 2 days
          </div>
        </div>
      </template>
      <template slot="notification2">
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
      </template>
    </NotificationList>

    <NotificationList
      v-model="notificationListShort"
      width="280px"
      title="Liste de choses à faire"
    ></NotificationList>
  </div>
</template>

<script>
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import NotificationList from '../../components/NotificationList';
import { NotificationListData } from '../../static/index';

export default {
  name: 'NotificationListDemo',
  components: { Collapser, Description, NotificationList },
  data: () => ({
    usage: NotificationListData.usage,
    openUsage: true,
    notificationListBadge: [
      {
        icon: 'exclamation-circle-solid',
        color: '#FB4544',
        title: 'Renseignez votre SIRET',
        description: 'Go to Paramètres du compte and add your SIRET number',
        badge: true,
        badgeTitle: 'Action requise'
      },
      {
        icon: 'query_builder',
        color: '#FFAB2B',
        title: 'Ajout des documents nécessaires',
        description: 'Go to Paramètres du compte and add your SIRET number',
        badge: true,
        badgeTitle: 'En traitement'
      }
    ],
    notificationList: [
      {
        icon: 'file-invoice-solid',
        color: '#FFAB2B',
        additionalTitle: '€10.60',
        additionalDescription: '2 days ago'
      },
      {
        icon: 'file-invoice-solid',
        color: '#1EB386',
        additionalTitle: '+ $42.20',
        additionalDescription: '14 Nov 4:00 PM'
      }
    ],
    notificationListShort: [
      {
        short: true,
        icon: 'exclamation-circle-solid',
        color: '#FB4544',
        title: 'Renseignez votre SIRET',
        description: 'Go to Paramètres du compte and add your SIRET number'
      },
      {
        short: true,
        icon: 'query_builder',
        color: '#FFAB2B',
        title: 'Ajout des documents nécessaires',
        description: 'Go to Paramètres du compte and add your SIRET number'
      }
    ]
  })
};
</script>

<style lang="less" scoped>
@import '../../styles/mixins';

.ds-notification-list-demo-header {
  display: flex;
  margin-bottom: 20px;
  cursor: default;

  .ds-notification-list-demo-header-title {
    height: 19px;
    color: @color-gray-500;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    letter-spacing: 0.2px;
    line-height: 19px;
    margin-right: 8px;
  }
  .ds-notification-list-demo-counter-wrapper {
    .ds-notification-list-demo-shape {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      width: 20px;
      background-color: @color-red;
      border-radius: 50%;

      .ds-notification-list-demo-data {
        height: 21px;
        width: 9px;
        color: @color-white;
        font-family: Roboto, sans-serif;
        font-size: 14px;
        font-weight: bold;
        line-height: 21px;
        text-align: center;
        user-select: none;
      }
    }
  }
}

.ds-notification-list-wrapper {
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
}

.ds-notification-demo-body();
</style>
