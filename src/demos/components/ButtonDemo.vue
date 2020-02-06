<template>
  <div class="row-col">
    <h3>Button</h3>

    Button with an optional icon and different styles
    <Description compnent-name="Button"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div style="line-height: 64px">
      <Button big>Big</Button>&nbsp;
      <Button icon="add">Left Icon</Button>&nbsp;
      <Button icon-right="expand_more">Right Icon</Button>&nbsp;
      <Button alt>Alt</Button>&nbsp;
      <Button icon="add" alt>Alt icon</Button>&nbsp;
      <Button plain>Plain </Button>&nbsp;
      <Button disabled>Disabled</Button>&nbsp;
      <Button icon="menu" big plain></Button>&nbsp;
      <Button icon="menu" big></Button>&nbsp;
      <Button icon="menu" small plain>Small Button</Button>&nbsp;
      <Button mobile-bottom>Mobile Button</Button>&nbsp;
      <Button icon="menu" plain></Button>&nbsp;
      <Button icon="menu"></Button>&nbsp;
      <Button link="https://github.com/highqualitycode" plain>Click here</Button>
      <Button link="https://github.com/highqualitycode" icon="account_circle">Github</Button>&nbsp;
      <Button link="https://github.com/highqualitycode" icon="insert_chart" small link-ico>Full Report</Button>&nbsp;
      <Button padding="15px 40px">Add</Button>&nbsp;
      <Button padding="13px 40px" alt-two>Cancel</Button>&nbsp;
      <Button icon="add_circle" icon-color="primary" color="primary" plain-two space-between="4px">Add New Item</Button>&nbsp;
      <Button icon="add_circle" plain-two disabled space-between="4px">Add New Item</Button>&nbsp;
      <!-- OR -->
      <button class="ds-button ds-button-primary">
        Button Label
      </button>
    </div>

  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Description from '../../descriptions/Description'
import Collapser from '../../components/Collapser.vue'
import {ButtonData} from '../../static/index'

export default {
  name: 'ButtonDemo',
  components: {Button, Description, Collapser},
  data: () => ({
    openUsage: true,
    usage: ButtonData.usage
  }),
}
</script>

<style lang="less">

</style>
