<template>
  <div class="row-col">
    <h3>Tabs</h3>

    <h4>Usage</h4>
    <p>Tabs component can be controlled by next properties:</p>
    <Description compnent-name="Tabs"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <h3>Normal Usage</h3>
    <div class="tabs-container">
      <Tabs
        :tabs="tabs"
        :active="active"
        :enableLoader="enableLoader"
        :disabled="disabled"
        :additional-content-styles="styles"
        tabs-align="flex-start"
        alt-tabs
        @tab:click="onTabClick"
      >
        <template #tabs-header-additional-content>
          <Toggle v-model="toggleValue" label="A company"></Toggle>
        </template>
        <template #tabs-1>
          <div class="ds-demo-body-title">Infos personelles</div>
          <div class="ds-demo-tabs-body">
            <Card class="ds-dashboard-report">
              <div class="report-title">
                Chiffre d'affaires réalisé en 2018
              </div>
              <div class="ds-report-amount green">
                <Icon arrow_upward></Icon>95,00 €
              </div>
              <div class="ds-report-subtitle">
                dont 0,00 € ce mois-ci
              </div>
            </Card>
          </div>
        </template>
        <template #tabs-2>
          <div class="ds-demo-body-title">Adresse</div>
          <div class="ds-demo-tabs-body">
            <div class="ds-demo-tab-icons">
              <Icon account_circle size="12px" padding="30px 2px" />
              <Icon
                account_circle
                size="16px"
                padding="28px 2px"
                color="primary"
              />
              <Icon account_circle padding="24px 2px" color="blue" />
              <Icon account_circle size="36px" padding="18px 2px" color="red" />
              <Icon
                account_circle
                size="52px"
                padding="10px 2px"
                color="gray-400"
              />
              <Icon account_circle size="72px" color="#55aaff" />
            </div>
          </div>
        </template>
        <template #tabs-3>
          <div class="ds-demo-body-title">Commentaires</div>
          <div class="ds-demo-tabs-body">
            <div class="ds-demo-tab-inputs">
              <Input sm label="Small" />
              <Input md label="Medium" />
              <Input lg label="Large" />
            </div>
          </div>
        </template>
      </Tabs>
    </div>

    <h3>Customized Tab</h3>
    <div class="tabs-container">
      <Tabs
        :tabs="2"
        :active="customTabActive"
        full-header
        plain-header
        card-wrapper
        inactive-tabs
        @tab:click="onCustomTabClick"
        class="ds-demo-income-overdue"
      >
        <template #tab-header-1>
          <div key="alt-tab-1">
            <div>Customized header line1</div>
            <div>Customized header line2</div>
          </div>
        </template>

        <template #tab-header-2>
          <div key="alt-tab-2">
            Tab header 2
          </div>
        </template>

        <template #tabs-1>
          <div class="ds-demo-income-overdue-empty-body-wrapper">
            <div class="ds-demo-income-overdue-empty-body-data">
              <div class="ds-demo-empty-body-title">
                Créer ma première facture
              </div>
              <div class="ds-demo-empty-body-additional-info">
                Vous n’avez pas encore créé de facture pour le moment. Cliquez
                sur le bouton ci-dessous pour éditer votre première facture.
              </div>
            </div>
            <Button width="100%" padding="15px">Créer</Button>
          </div>
        </template>
        <template #tabs-2>
          <div class="ds-demo-tabs-body-alt">
            Tab 2
          </div>
        </template>
      </Tabs>
    </div>

    <Button
      class="ds-demo-loader-mode-button"
      @click="loaderMode = !loaderMode"
    >
      Switch loader mode
    </Button>
    <p><b>Loader mode during 3 sec:</b> {{ loaderMode }}</p>
  </div>
</template>

<script>
import Tabs from '../../components/Tabs';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Toggle from '../../components/Toggle';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { TabsData } from '../../static/index';

export default {
  name: 'TabsDemo',
  components: {
    Tabs,
    Card,
    Icon,
    Input,
    Description,
    Collapser,
    Button,
    Toggle
  },
  data() {
    return {
      openUsage: true,
      usage: TabsData.usage,
      active: 1,
      customTabActive: 1,
      tabs: TabsData.tabs,
      customTabs: TabsData.customTabs,
      enableLoader: false,
      loaderMode: false,
      disabled: false,
      toggleValue: true,
      styles: {
        left: 'calc(100% - 148px)',
        top: '17px'
      }
    };
  },
  methods: {
    onTabClick(tab, index) {
      this.active = index;

      if (this.loaderMode) {
        this.disabled = true;
        this.enableLoader = true;

        setTimeout(() => {
          this.enableLoader = false;
          this.disabled = false;
        }, 3000);
      }
    },
    onCustomTabClick(tab, index) {
      this.customTabActive = index;
    }
  }
};
</script>

<style scoped lang="less">
@import '../../styles/vars';
.ds-demo-body-title {
  background-color: @color-white;
  text-align: center;
  padding: 10px 0;
}

.ds-demo-tabs-body {
  background-color: @color-white;
  height: 150px;
  padding: 0 24px;

  .ds-demo-tab-inputs,
  .ds-demo-tab-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.ds-demo-tabs-body-alt {
  padding: 20px;
}

.ds-demo-loader-mode-button {
  margin: 16px 0 0;
}

.ds-demo-income-overdue {
  height: 372px;

  .ds-demo-income-overdue-empty-body-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 295px;
    padding: 50px 20px 20px;
    box-sizing: border-box;

    .ds-demo-income-overdue-empty-body-data {
      .ds-demo-empty-body-title {
        color: @color-dark;
        font-family: Roboto, sans-serif;
        font-size: 16px;
        letter-spacing: 0.2px;
        line-height: 19px;
        text-align: center;
        margin-bottom: 7px;
      }

      .ds-demo-empty-body-additional-info {
        color: @color-gray-400;
        font-family: Roboto, sans-serif;
        font-size: 12px;
        letter-spacing: 0;
        line-height: 18px;
        text-align: center;
        margin-bottom: 50px;
      }
    }
  }
}
</style>
