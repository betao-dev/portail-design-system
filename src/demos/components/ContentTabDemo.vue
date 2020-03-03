<template>
  <div class="row-col">
    <h3>ContentTab</h3>
    <p>
      ContentTab component for displaying content with icon and active bottom
      part
    </p>

    <Description compnent-name="ContentTab"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="ds-content-tab-demo-wrapper">
      <ContentTab
        :header="header"
        :description="description"
        :actionText="actionText"
        icon="user-edit-solid"
      ></ContentTab>

      <ContentTab
        :header="header"
        :actionText="actionText"
        icon="user-edit-solid"
      >
        <div class="ds-content-tab-demo-data">
          <Icon visa size="32px" class="ds-content-tab-demo-icon"></Icon>
          <span class="ds-content-tab-demo-card-number"
            >3210 **** **** 4008</span
          >
        </div>
      </ContentTab>
    </div>
  </div>
</template>

<script>
import ContentTab from '../../components/ContentTab';
import Icon from '../../components/Icon';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { ContentTabData } from '../../static/index';

export default {
  name: 'ContentTabDemo',
  components: {
    ContentTab,
    Description,
    Collapser,
    Icon
  },
  data() {
    return {
      usage: ContentTabData.usage,
      openUsage: true,
      header: 'Informations personnelles',
      description:
        'Modifiez vos informations: nom, numéro de téléphone, adresse email, adresse de facturation',
      actionText: 'UPDATE PERSONAL SETTINGS'
    };
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';
.ds-content-tab-demo-wrapper {
  display: flex;

  .ds-content-tab-demo-data {
    display: flex;
    align-items: center;

    .ds-content-tab-demo-icon {
      margin-right: 12px;
    }

    .ds-content-tab-demo-card-number {
      height: 21px;
      color: @color-gray-400;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      line-height: 21px;
    }
  }

  .ds-content-tab {
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
