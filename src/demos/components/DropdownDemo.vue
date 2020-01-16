<template>
  <div class="row-col dropdown-demo">
    <h3>Dropdown</h3>

    Dropdown that can hold different things
    <Description compnent-name="Dropdown"></Description>

    <Collapser :opened.sync="visiblePosition" label="Position Scheme">
      <pre class="scheme" v-highlightjs="scheme"><code class="html"></code></pre>
    </Collapser>

    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <Button ref="dropButton" @click="dropdownOpened = !dropdownOpened">
      Choose position
    </Button>
    <Dropdown
      :target="$refs.dropButton"
      :opened.sync="dropdownOpened"
      :position="position"
      :just-fade="false"
    >
      <div class="dropdown-content">
        Position:<br />

        <template v-for="option in positions">
          <input type="radio" :id="option" :value="option" v-model="position">
          <label :for="option">{{ option }}</label>
          <br />
        </template>
      </div>
    </Dropdown>

    <Button ref="dropButton2" @click="dropdown2Opened = !dropdown2Opened">
      Simple animation
    </Button>
    <Dropdown
      :target="$refs.dropButton2"
      :opened.sync="dropdown2Opened"
      :position="position"
    >
      <div class="dropdown-content">
        Hello!
      </div>
    </Dropdown>

    <a class="hover-me"
      ref="hoverMe"
      @mouseover="dropdown3Opened = true"
    >Hover me!</a>
    <Dropdown
      :target="$refs.hoverMe"
      :opened.sync="dropdown3Opened"
      :position="position"
      :just-fade="false"
      just-fade-in
    >
      <div class="dropdown-content">
        Good job!
      </div>
    </Dropdown>

  </div>
</template>

<script>
import Button from '../../components/Button.vue'
import Collapser from '../../components/Collapser.vue'
import Dropdown from '../../components/Dropdown.vue'
import Description from '../../descriptions/Description'
import {DropdownData} from '../../static/index'

export default {
  name: 'DropdownDemo',
  components: {Button, Dropdown, Description, Collapser},
  data: () => ({
    usage: DropdownData.usage,
    scheme: DropdownData.scheme,
    openUsage: true,
    visiblePosition: false,
    dropdownOpened: false,
    dropdown2Opened: false,
    dropdown3Opened: false,
    position: 'bottom-right',
    positions: DropdownData.positions
  }),
}
</script>

<style lang="less" scoped>
@import '../../styles/vars';

.dropdown-demo {

  .button {
    margin-right: 8px
  }

  .dropdown-content {
    display: inline-block;
    border-radius: 2px;
    box-shadow: @dropdown-shadow;
    padding: 20px;
    background: white;
  }

  .hover-me {
    border: 1px dashed @color-primary;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 10px;
  }

  .scheme {
    font-size: 14px;
    line-height: 14px;
  }
}
</style>
