let usage = `
<NotificationList
  v-model="notificationListBadge"
>
  <template slot="header">
    ...
  </template>
</NotificationList>

<NotificationList v-model="notificationList"
                  title="All Notifications"
                  title-right="Mark all as read">
  <template slot="notification1">
    ...
  </template>
  <template slot="notification2">
    ...
  </template>
</NotificationList>

<NotificationList
  v-model="notificationListShort"
  width="280px"
  title="Liste de choses à faire"
  short
></NotificationList>
`.slice(1);

export default {
  usage
};
