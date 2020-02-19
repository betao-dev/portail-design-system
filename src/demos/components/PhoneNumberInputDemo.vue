<template>
  <div class="row-col">
    <h3>Phone Number Input</h3>

    <Description compnent-name="PhoneNumberInput"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <PhoneNumberInput
      @onInput="onInput"
      :inputOptions="{ showDialCode: true }"
      label="Phone Number"
      value="+33234324234"
    />
  </div>
</template>

<script>
import PhoneNumberInput from '../../components/PhoneNumberInput.vue';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { PhoneNumberInputData } from '../../static/index';

export default {
  name: 'PhoneNumberInputDemo',
  components: { PhoneNumberInput, Description, Collapser },
  data: () => {
    return {
      openUsage: true,
      usage: PhoneNumberInputData.usage,
      phone: {
        number: '',
        isValid: false,
        country: undefined
      }
    };
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.phone.number = number;
      this.phone.isValid = isValid;
      this.phone.country = country && country.name;
    }
  }
};
</script>
