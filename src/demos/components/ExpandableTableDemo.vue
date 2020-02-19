<template>
  <div class="row-col">
    <h3>Expandable Table</h3>
    <p>Expandable Table component for displaying list of data</p>

    <Description compnent-name="ExpandableTable"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <ExpandableTable
      :dataSource="clients"
      :columns="columns"
      @edit="editRow"
      @sendMail="sendMail"
      @overview="overviewRow"
      @print="printRow"
      @download="downloadRow"
      @copy="copyRow"
      @remove="removeRow"
      @convert="convertRow"
    />
  </div>
</template>

<script>
import moment from 'moment';
import ExpandableTable from '../../components/ExpandableTable';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { GeneralData } from '../../static/index';

export default {
  name: 'ExpandableTableDemo',
  components: { ExpandableTable, Collapser, Description },
  data: () => ({
    usage: '',
    openUsage: true,
    clients: GeneralData.clients,
    columns: [
      { key: 'name', title: 'Name', width: '300px', sortable: true },
      { key: 'type.name', title: 'Type', width: '10%' },
      {
        key: 'invoice_date',
        title: 'Date',
        filter: value => moment(value).format('DD-MM-YYYY')
      },
      { key: 'earned', title: 'Earned', prefix: '$' }
    ]
  }),
  methods: {
    editRow() {},
    sendMail() {},
    overviewRow() {},
    printRow() {},
    downloadRow() {},
    copyRow() {},
    removeRow() {},
    convertRow() {}
  }
};
</script>
