let usage = `
<Accordion v-model="data">
  <template #first>
    <h4>Ma pièce d’identité</h4>
  </template>
  ...
  <template #fifth>
    <h4>Mon extrait d'acte de mariage ou un justificatif de PACS</h4>
  </template>
</Accordion>
`.slice(1);

let data = [
  {
    label: 'Ma pièce d’identité',
    name: 'first',
    open: false
  },
  {
    label: 'Un justificatif de domiciliation et',
    name: 'second',
    open: false
  },
  {
    label: 'Ma carte vitale ou mon attestation de droits à la sécurité sociale',
    name: 'third',
    open: false
  },
  {
    label: 'Un contrat de mandataire',
    name: 'fourth',
    open: false
  },
  {
    label: `Mon extrait d'acte de mariage ou un justificatif de PACS`,
    name: 'fifth',
    open: false
  }
];

export default {
  usage,
  data
};
