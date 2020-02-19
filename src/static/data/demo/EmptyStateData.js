let usage = `
<EmptyState v-model="details"></EmptyState>
`.slice(1);

let details = {
  title: `Vous n'avez pas encore créé de factures...`,
  moreInfo: `En tant qu'auto-entrepreneur vous avez l'obligation légale de facturer vos clients`,
  btnLabel: 'Create invoice',
  imgName: 'invoice-empty'
};

export default {
  usage,
  details
};
