let usage = `
<Card>Hello, World!</Card>
<!-- OR -->
<div class="ds-card">Hello, World!</div>

<!-- Dashboard Report card -->
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

<!-- User TODO card -->
<Card class="ds-user-todo">
  <Icon error_outline color="red"></Icon>
  <div class="ds-todo-title">
    Ajout des documents nécessaires
  </div>
  <div class="ds-todo-badge">Needs Response</div>
</Card>
`.slice(1);

export default {
  usage
};
