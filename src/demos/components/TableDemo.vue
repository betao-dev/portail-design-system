<template>
  <div class="row-col">
    <h3>Table</h3>
    <p>Table component for displaying list of data</p>

    <Description compnent-name="Table"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Table
      v-model="clients"
      :headers="headers"
      :pagination="true"
      :pageSize="10"
      :total="25"
      :current="selectedPage"
      @update:page="updatePage"
    >
      <template slot="filter-name">
        <Chips md v-model="nameFilter" :removable="true" />
      </template>

      <template slot="filter-type.name">
        <Select md v-model="typeFilter" :options="typeOptions" :idMode="true" />
      </template>

      <template slot="filter-earned">
        <Input md placeholder="Price" v-model="financialFilter" />
      </template>

      <template slot="filter-invoice_date">
        <Input md v-model="invoiceDateFilter" placeholder="Search" />
      </template>

      <template slot="filter-status">
        <Chips md placeholder="Status" v-model="statusFilter" />
      </template>

      <template v-slot:cell-name="{row, value}">
        <div class="name-wrapper">
          <Icon type="circle" size="18px" color="#1eb386" :source="row.type.name === 'Person' ? 'user-solid' : 'building'" />
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
        <Button plain icon="pen-solid" iconSize="14px" iconColor="#778ca2" padding="8px" space-between="0" />
        <Button plain icon="trash-alt" iconSize="14px" iconColor="#778ca2" padding="8px" space-between="0" />
      </template>
    </Table>
  </div>
</template>

<script>
  import moment from 'moment'
  import Table from '../../components/Table'
  import Badge from '../../components/Badge'
  import Icon from '../../components/Icon'
  import Chips from '../../components/Chips'
  import Input from '../../components/Input'
  import Select from '../../components/Select'
  import Collapser from '../../components/Collapser'
  import Description from '../../descriptions/Description'
  import {TableData, GeneralData} from '../../static/index'

  const COLORS_BY_STATUS = {
    cancelled: '#30302d',
    refunded: '#3B9AE3',
    partial_refunded: '#52a0d8',
    draft: '#9e9e9e',
    paid_with_deposit: '#66bb6a',
    paid: '#66bb6a',
    converted: '#66bb6a',
    expired: '#ef5350',
    pending_with_paid_deposit: '#68b7a3',
    pending_with_deposit_pending: '#ffa726',
    waiting: '#ffa726',
    sent: '#1E88E5',
    Pending: '#ffa726',
    Proceeded: '#963CE3',
    default: '#9e9e9e'
  };

  export default {
    name: 'TableDemo',
    components: {Table, Badge, Icon, Chips, Input, Select, Collapser, Description},
    data: () => ({
      usage: TableData.usage,
      openUsage: true,
      clients: GeneralData.clients,
      headers: [
        { key: 'name', title: 'Name', width: '30%' },
        { key: 'type.name', title: 'Type', width: '20%' },
        { key: 'earned', title: 'Earned', prefix: '€', sortable: true },
        { key: 'invoice_date', title: 'Date', sortable: true, filter: (value) => moment(value).format('DD-MM-YYYY') },
        { key: 'status', title: 'Status', badge: true },
        { key: 'actions', title: '', width: '100px'}
      ],
      colors: COLORS_BY_STATUS,
      selectedPage: 1,
      nameFilter: [],
      typeFilter: '',
      typeOptions: [
        { id: 1, value: 'Person' },
        { id: 2, value: 'Company' }
      ],
      financialFilter: '',
      invoiceDateFilter: '',
      statusFilter: []
    }),
    methods: {
      updatePage(page) {
        this.selectedPage = page
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../styles/vars';

  .name-wrapper {
    display: flex;
    align-items: center;

    .name-number {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;

      .name {
        font-size: 16px;
      }

      .number {
        font-size: 14px;
        color: @color-gray-500;
      }
    }
  }
</style>
