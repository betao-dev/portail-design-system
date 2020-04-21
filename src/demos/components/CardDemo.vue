<template>
  <div class="row-col">
    <h3>Card</h3>

    Basic styled component: background, padding, shadow.
    <Description compnent-name="Card"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="ds-grid">
      <div class="row-col">
        <Card alt>
          <div class="ds-card-content-wrapper">
            Hello, World!
          </div>
        </Card>
      </div>

      <div class="row">
        <div class="col-4">
          <Card class="ds-dashboard-report">
            <div class="ds-report-title">
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
        <div class="col-4">
          <Card class="ds-dashboard-report">
            <div class="ds-report-title">
              Factures en attente
            </div>
            <div class="ds-report-amount yellow">
              <Icon arrow_upward></Icon>43,00 €
            </div>
            <div class="ds-report-subtitle">
              0 facture(s) en attente
            </div>
          </Card>
        </div>
        <div class="col-4">
          <Card class="ds-dashboard-report">
            <div class="ds-report-title">
              Factures impayées
            </div>
            <div class="ds-report-amount red">
              <Icon arrow_upward></Icon>95,00 €
            </div>
            <div class="ds-report-subtitle">
              0 facture(s) impayée(s)
            </div>
          </Card>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <Card class="ds-user-todo">
            <Icon error_outline color="red"></Icon>
            <div class="ds-todo-title">
              Ajout des documents nécessaires
            </div>
            <div class="ds-todo-badge">Needs Response</div>
          </Card>
        </div>
        <div class="col-6">
          <Card class="ds-user-todo">
            <Icon query_builder color="yellow"></Icon>
            <div class="ds-todo-title">
              Ajout des documents nécessaires
            </div>
            <div class="ds-todo-badge">Processing</div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '../../components/Card.vue';
import Icon from '../../components/Icon.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { CardData } from '../../static/index';

export default {
  name: 'CardDemo',
  components: { Card, Icon, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: CardData.usage
  })
};
</script>
<style lang="less" scoped>
.ds-card-content-wrapper {
  padding: 20px 24px;
}
</style>
