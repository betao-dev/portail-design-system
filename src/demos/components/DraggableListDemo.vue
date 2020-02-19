<template>
  <div class="row-col">
    <h3>DraggableList</h3>

    <Description compnent-name="DraggableList"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <DraggableList
      :list="dragList"
      :headers="headers"
      @update:list="updateDraggableLists"
      orderby="position"
    />
  </div>
</template>

<script>
import DraggableList from '../../components/DraggableList';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { DraggableListData } from '../../static/index';

export default {
  name: 'DraggableListDemo',
  components: { DraggableList, Description, Collapser },
  data() {
    return {
      openUsage: true,
      usage: DraggableListData.usage,
      dragList: [
        {
          name: 'item 1',
          quantity: '1',
          price: '$42 303,43',
          percentage: '44%',
          total: '$42 303,43',
          position: 0
        },
        {
          name: 'item 2',
          quantity: '2',
          price: '$42 303,43',
          percentage: '44%',
          total: '$42 303,43',
          position: 1
        },
        {
          name: 'item 3',
          quantity: '6',
          price: '$42 303,43',
          percentage: '44%',
          total: '$42 303,43',
          position: 2
        },
        {
          name: 'item 4',
          quantity: '8',
          price: '$42 303,43',
          percentage: '44%',
          total: '$42 303,43',
          position: 3
        },
        {
          name: 'item 5',
          quantity: '1',
          price: '$42 303,43',
          percentage: '44%',
          total: '$42 303,43',
          position: 4
        },
        {
          name: 'item 6',
          quantity: '1',
          price: '$42 303,43',
          percentage: '44%',
          total: '$42 303,43',
          position: 5
        }
      ],
      headers: [
        {
          key: 'name',
          title: 'Name',
          width: '40%',
          textDirection: 'left',
          flexGrow: true
        },
        {
          key: 'quantity',
          title: 'Quantity',
          width: '10%',
          textDirection: 'right'
        },
        {
          key: 'price',
          title: 'Price',
          width: '10%',
          textDirection: 'right'
        },
        {
          key: 'percentage',
          title: 'Percentage',
          width: '10%',
          textDirection: 'right'
        },
        {
          key: 'total',
          title: 'Total',
          width: '10%',
          textDirection: 'right'
        }
      ]
    };
  },
  methods: {
    updateDraggableLists(value) {
      this.dragList = [...value];
    }
  }
};
</script>
