let usage = `
    <Star v-model="starValue"></Star>
    <Star v-model="disabledStarValue" disabled></Star>
    <Star v-model="customStarValue" :starsCount="starsCount"></Star>
`.slice(1);

export default {
  usage
};
