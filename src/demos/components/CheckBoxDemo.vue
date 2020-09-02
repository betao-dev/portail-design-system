<template>
  <div class="row-col">
    <h3>CheckBox</h3>
    <p>Custom checkBox component</p>

    <Description compnent-name="CheckBox"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div>
      <CheckBox v-model="value" label="Client international"></CheckBox>
    </div>

    <div>
      <CheckBox
        v-model="value"
        label="Checkbox Demo"
        help="how are you ?"
      ></CheckBox>
    </div>

    <div>
      <CheckBox
        v-model="value2"
        label="Joint un chèque à l’ordre du Greffe de votre département (montant exact à vérifier auprès du Greffe, entre 25 et 30 €)"
        text-through
      ></CheckBox>
    </div>
    <div>
      <CheckBox v-model="value3">
        <template>
          <div class="label-wrapper">
            <span class="number">Avoir #000002</span>
            <span class="price">(400 €)</span>
          </div>
        </template>
      </CheckBox>
    </div>
  </div>
</template>

<script>
import CheckBox from '../../components/CheckBox.vue';
import Description from '../../descriptions/Description.vue';
import Collapser from '../../components/Collapser.vue';
import { CheckBoxData } from '../../static/index';

export default {
  name: 'CheckBoxDemo',
  components: { CheckBox, Description, Collapser },
  data: () => ({
    openUsage: true,
    usage: CheckBoxData.usage,
    value: true,
    value2: true,
    value3: false
  })
};
</script>

<style lang="less" scoped>
.label-wrapper {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 16px;
  margin-left: 12px;

  .number {
    font-family: Roboto, sans-serif;
    color: #1b1e24;
  }

  .price {
    font-family: 'Roboto Medium';
    color: #1eb386;
    margin-left: 5px;
  }
}
</style>
