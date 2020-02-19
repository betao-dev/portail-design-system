<template>
  <div class="row-col">
    <h3>FilterSelect</h3>

    Custom filter select dropdown
    <Description compnent-name="FilterSelect"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="row-col">
      <FilterSelect
        label="Filter select"
        optionTitleIndex="value"
        optionRatingIndex="rating"
        optionAddressIndex="address"
        optionZipCodeIndex="zipcode"
        optionCityIndex="city"
        v-model="multiSelectValue"
        :options="options"
        :validators="multiSelectValidators"
        :placeholder="'Input Value'"
      />
    </div>
  </div>
</template>

<script>
import FilterSelect from '../../components/FilterSelect';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { MultiSelectDropdownData } from '../../static/index';

export default {
  name: 'FilterSelectDemo',
  components: { FilterSelect, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: MultiSelectDropdownData.usage,
    multiSelectValue: [
      {
        id: 1,
        value: 'Espèces',
        rating: 4,
        address: 'Test Address',
        zipcode: '18227',
        city: 'Shenyang'
      },
      {
        id: 2,
        value: 'Chèque',
        rating: 4,
        address: 'Test Address 2',
        zipcode: '11122',
        city: 'Shenyang'
      }
    ],
    options: [
      {
        id: 1,
        value: 'Espèces',
        rating: 4,
        address: 'Test Address',
        zipcode: '18227',
        city: 'Shenyang'
      },
      {
        id: 2,
        value: 'Chèque',
        rating: 4,
        address: 'Test Address 2',
        zipcode: '11122',
        city: 'Shenyang'
      },
      {
        id: 3,
        value: 'Virement',
        rating: 4,
        address: 'Test Address',
        zipcode: '18227',
        city: 'Shenyang'
      },
      {
        id: 4,
        value: 'Carte bancaire',
        rating: 4,
        address: 'Test Address',
        zipcode: '18227',
        city: 'Shenyang'
      },
      {
        id: 5,
        value: 'Tout moyen de paiement',
        deselectAll: true,
        rating: 4,
        address: 'Test Address',
        zipcode: '18227',
        city: 'Shenyang'
      }
    ],
    multiSelectValidators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => value && !!value.length
      }
    ]
  })
};
</script>

<style lang="less" scoped></style>
