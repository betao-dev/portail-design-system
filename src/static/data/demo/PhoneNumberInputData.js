let usage = `
<PhoneNumberInput
  @onInput="onInput"
  :inputOptions="{showDialCode: true}"
  defaultCountry="fr"
  label="Phone Number"
  value="+33 2 34 32 42 34"
/>
`.slice(1);

export default {
  usage
};
