let usage = `
<!-- Grid container -->
<div class="ds-grid">
  <!-- Single row element can have multiple rows of cells if they warp -->
  <div class="row">
    <!-- Element with col-x class taking x columns -->
    <div class="col-12">
      <!-- Single inner element. Important! (Thanks IE) -->
      <div>col-12</div>
    </div>
    <!-- You can have column elements that add up to more than 12 -->
    <!-- They will warp to the next "row" -->
    <!-- Make sure that orphans add up to 12 columns -->
    <div class="col-6"><div>col-6</div></div>
    <div class="col-6"><div>col-6</div></div>
    <!-- ... -->
  </div>

  <!-- Row with a single 12 column item shortcut: -->
  <div class="row-col">...</div>
  <!-- Is equal to: -->
  <div class="row"><div class="col-12"><div>...</div></div></div>
</div>
`.slice(1);

export default {
  usage
};
