let usage = `
<CheckBox v-model="value" label="Client international"></CheckBox>

<CheckBox
  v-model="value"
  label="Checkbox Demo"
  help="how are you ?"
></CheckBox>

<CheckBox
  v-model="value2"
  label="Joint un chèque à l’ordre du Greffe de votre département (montant exact à vérifier auprès du Greffe, entre 25 et 30 €)"
  text-through
></CheckBox>
`.slice(1);

export default {
  usage
};
