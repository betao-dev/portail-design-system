<template>
  <div class="row-col">
    <h3>Input</h3>

    A styled input with an ability to set icon and validation.

    <h4>Usage guidlines</h4>
    Input fields can be used either standalone or grouped.

    <p>
      Standalone fields can be in 3 different widths:
    </p>

    <ul>
      <li>Small — 144px</li>
      <li>
        Medium - 252px
      </li>
      <li>
        Large - 464px
      </li>
    </ul>

    <p>
      When used on the same row, there can be only two standalone fields with
      32px margin between them. <br />
      If there is need to use 2 or more fields on the same row that are
      contextually belong together, those fields are called <b>grouped</b>
    </p>

    <p>
      Grouped fields do not have any fixed widths as their width are
      pre-defined by the layout and they always have 16px margin between them.
    </p>

    <p>
      Font size for inputs is 16px on mobile and 14px on screens sizes > 961px to
      avoid zooming in behaviour on mobile devices on click
    </p>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="input-component-demo">
      <Input
        placeholder="Maximum 10 characters"
        icon="search"
        top-title="Input with icon and help"
        help="Some info"
        v-model="inputValue"
        :validators="validators"
      />
      <Input
        placeholder="Placeholder"
        icon="today"
        v-model="inputValue2"
        top-title="Input with icon and bottom help"
        :bottom-help="{label: 'bottom help', text: 'This is bottom help tooltip'}"
      />
      <Input
        placeholder="Disabled"
        v-model="inputValue3"
        top-title="Disabled input"
        disabled
      />
    </div>

  </div>
</template>

<script>
import Input from '../../components/Input'

let usage = `
<Input
  placeholder="Maximum 10 characters"
  icon="search"
  top-title="Input with icon and help"
  help="Some info"
  v-model="inputValue"
  :validators="validators"
  @validation="logError($event)"
/>
<Input
  placeholder="Placeholder"
  icon="today"
  top-title="Input with icon and bottom help"
  v-model="inputValue2"
  :bottom-help="{label: 'bottom help', text: 'This is bottom help tooltip'}"
/>
<Input
  placeholder="Disabled"
  top-title="Disabled input"
  v-model="inputValue3"
  disabled
/>`
.slice(1)

export default {
  name: "InputDemo",
  components: {Input},
  data: () => ({
    usage,
    inputValue: 'Input with validator',
    inputValue2: '',
    inputValue3: '',
    validators: [
      {
        message: 'Maximum length is 10 characters',
        validator: (value) => {
          return value.length <= 10
        }
      },
    ]
  })
}
</script>

<style lang="less" scoped>
.input-component-demo {
  display: flex;

  .input-component-wrapper:not(:first-child) {
    margin-left: 30px;
  }
}
</style>
