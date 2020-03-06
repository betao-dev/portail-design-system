<template>
  <div class="row-col">
    <h3>NotificationPopup</h3>
    <p>
      Notification Popup component for display small notification rows that
      appear on the top of the page
    </p>

    <Description compnent-name="NotificationPopup"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <NotificationPopup
      v-model="notificationOpen"
      icon="check-circle"
      background-color="#1EB386"
      :message="message"
    />
    <Button @click="notificationOpen = !notificationOpen">
      Active Notification Popup
    </Button>
  </div>
</template>

<script>
import NotificationPopup from '../../components/NotificationPopup';
import Button from '../../components/Button';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { NotificationPopupData } from '../../static/index';

export default {
  name: 'NotificationPopupDemo',
  components: { NotificationPopup, Button, Collapser, Description },
  data: () => ({
    usage: NotificationPopupData.usage,
    openUsage: true,
    notificationOpen: false,
    message: 'Your new password has been saved'
  })
};
</script>

<style lang="less" scoped></style>
