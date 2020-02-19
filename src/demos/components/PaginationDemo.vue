<template>
  <div class="row-col">
    <h3>Pagination</h3>
    <p>Pagination component for display data like table with pagination</p>

    <Description compnent-name="Pagination"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Pagination
      :total="total"
      :pageSize="pageSize"
      :current="current"
      @page:change="updatePage"
    />
  </div>
</template>

<script>
import Pagination from '../../components/Pagination';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { PaginationData } from '../../static/index';

export default {
  name: 'PaginationDemo',
  components: { Pagination, Collapser, Description },
  data: () => ({
    usage: PaginationData.usage,
    openUsage: true,
    pageSize: 10,
    current: 1,
    total: 301
  }),
  methods: {
    updatePage(page) {
      this.current = page;
    }
  }
};
</script>

<style lang="less" scoped></style>
