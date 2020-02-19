<template>
  <div class="ds-grid grid-demo">
    <div class="row-col">
      <h2>Grid</h2>
      <p>
        Grid is used to align only primary content. The top-level components,
        such as sidebar and header are used outside of the grid.
      </p>
      <p>
        Our grid has 12 columns on screens &gt; 786px and 4 columns on smaller
        screens. 4+ column cells will become full width. Items warp and grow to
        fill the width of the row, so be careful to not end up with 5, 7, 8, 9,
        10 or 11 columns worth of items in a row, since that will break the
        grid. In general make sure it adds up to 12.
      </p>
      <p>
        Avoid using 1-column cells with content. They can get as narrow as 18px.
      </p>
      <p>
        Spacing between columns and on the sides - 40px (&gt; 960px), 28px (&gt;
        768px & &lt;= 960px) and 12px (&lt;= 768px).
      </p>
      <h3>Usage</h3>
      <p>
        Notice the importance of having one child element inside a cell. This is
        a workaround for IE not respecting `box-sizing: border-box;` when
        setting the element size with `flex-basis`, instead of having paddings
        inside the cell element, margins are added to the child.
      </p>
      <pre v-highlightjs="usage"><code class="html"></code></pre>
      <h3>Demo</h3>
    </div>
    <div class="row-col row-col-demo">
      <div class="ds-card">
        row-col Lorem ipsum dolor sit amet
      </div>
    </div>
    <div class="row" v-for="size in [12, 6, 4, 3, 2, 1]">
      <div :class="'col-' + size" v-for="n in 12 / size">
        <div class="ds-card">col-{{ size }} Lorem ipsum dolor sit amet</div>
      </div>
    </div>
  </div>
</template>

<script>
import { GridData } from '../static/index';

export default {
  name: 'GridDemo',
  data: () => ({
    usage: GridData.usage
  })
};
</script>

<style lang="less">
/* Layout debug */
.grid-demo {
  .row,
  .row > div,
  .row-col-demo {
    &:nth-child(odd) {
      background: rgba(0, 0, 0, 0.1);
    }
    &:nth-child(even) {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  .ds-card {
    padding: 0;
  }
}
</style>
