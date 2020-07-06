let usage = `
<Radio v-model="value" :list="radioList"></Radio>

<Radio
  v-model="value2"
  :list="radioList2"
  radioColor="#1EB386"
  objectMode
/>

<Radio
  v-model="value3"
  :list="radioList2"
  radioColor="#1EB386"
  objectMode
  disabled
/>
`.slice(1);

export default {
  usage
};
