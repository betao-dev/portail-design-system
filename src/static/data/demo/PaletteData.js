let usage = `
<Palette
  v-model="palette"
  :colors="colors"
  :opacities="opacities"
  auto-init
  :default-mode="false"
></Palette>

<Palette
  v-model="secondPalette"
  auto-init
></Palette>
`.slice(1);

export default {
  usage
};
