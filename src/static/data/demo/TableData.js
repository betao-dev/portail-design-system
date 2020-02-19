let usage = `
<Table
  v-model="clients"
  :headers="headers"
  :pagination="true"
  :pageSize="10"
  :total="clients.length"
  :current="selectedPage"
  @update:page="updatePage"
>
  <template slot="filter-name">
    <div class="filter-wrapper">
      <Chips v-model="nameFilter" />
    </div>
  </template>

  <template slot="filter-type.name">
    <div class="filter-wrapper">
      <Select v-model="typeFilter" :options="typeOptions" :idMode="true" />
    </div>
  </template>

  <template slot="filter-earned">
    <div class="filter-wrapper">
      <Input v-model="financialFilter" />
    </div>
  </template>

  <template slot="filter-invoice_date">
    <div class="filter-wrapper">
      <Input v-model="invoiceDateFilter" />
    </div>
  </template>

  <template slot="filter-status">
    <div class="filter-wrapper">
      <Chips v-model="statusFilter" />
    </div>
  </template>

  <template v-slot:cell-name="{row, value}">
    <div class="name-wrapper">
      <Icon :source="row.type.name === 'Person' ? 'account_circle' : 'group_outline'" />
      <div class="name-number">
        <div class="name">{{ value }}</div>
        <div class="number">Client ID: {{ row.number }}</div>
      </div>
    </div>
  </template>

  <template v-slot:cell-status="{value, orgValue}">
    <Badge :color="colors[orgValue]" >{{ value }}</Badge>
  </template>

  <template v-slot:cell-actions="{ row }">
    <Icon source="edit" color="#888" />
    <Icon source="delete" color="#888" />
  </template>
</Table>
`.slice(1);

export default {
  usage
};
