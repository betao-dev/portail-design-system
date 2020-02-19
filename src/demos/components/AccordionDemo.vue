<template>
  <div class="row-col">
    <h3>Accordion</h3>
    <p>
      Accordion component are useful when you want to toggle between hiding and
      showing large amount of content
    </p>

    <Description compnent-name="Accordion"></Description>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Accordion v-model="data" class="accordion">
      <template #first>
        <h4>Ma pièce d’identité</h4>
      </template>
      <template #second>
        <h4>Un justificatif de domiciliation et</h4>
      </template>
      <template #third>
        <h4>
          Ma carte vitale ou mon attestation de droits à la sécurité sociale
        </h4>
      </template>
      <template #fourth>
        <h4>Un contrat de mandataire</h4>
      </template>
      <template #fifth>
        <h4>Mon extrait d'acte de mariage ou un justificatif de PACS</h4>
      </template>
    </Accordion>
  </div>
</template>

<script>
import Accordion from '../../components/Accordion';
import Collapser from '../../components/Collapser';
import Description from '../../descriptions/Description';
import { AccordionData } from '../../static/index';

export default {
  name: 'AccordionDemo',
  components: { Accordion, Collapser, Description },
  data: () => ({
    usage: AccordionData.usage,
    openUsage: true,
    data: AccordionData.data
  })
};
</script>

<style lang="less" scoped>
@import '../../styles/vars';

.row-col {
  .accordion {
    width: 640px;
  }
}
</style>
