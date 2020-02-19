<template>
  <div class="row-col">
    <h3>Autocomplete</h3>
    Input with the dropdown list available to search for matches from local or
    remote data sources
    <Description compnent-name="Autocomplete"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="ds-row">
      <div class="ds-column">
        <Autocomplete
          v-model="chosenDay"
          type="day"
          label="Day"
          :validators="validators"
          :daysMonth="28"
          keyboard="digital"
          required
        >
        </Autocomplete>
      </div>
      <div class="ds-column">
        <Autocomplete
          v-model="chosenMonth"
          type="month"
          label="Month"
          :validators="validators"
          required
        >
        </Autocomplete>
      </div>
      <div class="ds-column">
        <Autocomplete
          v-model="chosenYear"
          type="year"
          label="Year"
          :validators="validators"
          required
        >
        </Autocomplete>
      </div>
    </div>

    <Autocomplete
      v-model="chosenCustom"
      :data-list="dataList"
      label="Custom"
      :validators="validators"
      keyboard="alphabet"
    >
    </Autocomplete>
  </div>
</template>

<script>
import Autocomplete from '../../components/Autocomplete.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { AutocompleteData } from '../../static/index';

export default {
  name: 'AutocompleteDemo',
  components: { Autocomplete, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: AutocompleteData.usage,
    chosenDay: undefined,
    chosenMonth: undefined,
    chosenYear: undefined,
    chosenCustom: undefined,
    dataList: [
      { title: 'apple' },
      { title: 'banana' },
      { title: 'coco' },
      { title: 'pineapple' },
      { title: 'mango' },
      { title: 'grapefruit' }
    ],
    validators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => !!value
      },
      {
        name: 'valid-date',
        message: 'Please choose a valid date',
        validator: (value, dataListWrapper) =>
          !!dataListWrapper &&
          !!dataListWrapper.find(item => {
            let dataStr = '';

            if (item.number) {
              dataStr = `${item.number} - `;
            }

            dataStr = dataStr + item.title;

            return dataStr === value;
          })
      }
    ]
  })
};
</script>

<style lang="less">
.ds-row {
  display: flex;

  .ds-column {
    flex: 1;
    padding-right: 15px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
