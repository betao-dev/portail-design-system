let usage = `
<Slider
  :startIndex.sync="startIndex"
  header="Testimonials"
  actionType="fade"
>
  <template #slider-1>
    <div class="ds-demo-slider-content">
      C'est vraiment pratique, l’utilisation du mini TPE est très complète
      (en plus d’être beaucoup moins cher qu'un TPE classique en location).
      Pouvoir faire en même temps caisse enregistreuse et avoir immédiatement les statistiques des ventes,
      c'est un vrai plus !
    </div>
  </template>
  <template #slider-2>
    ...
  </template>
  <template #slider-3>
    ...
  </template>
</Slider>
`.slice(1);

export default {
  usage
};
