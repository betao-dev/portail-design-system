<template>
  <div class="row-col input-demo">
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

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="input-component-demo">
      Basic inputs:<br />
      <Input sm label="Small" v-model="textValue"/>
      <Input md label="Medium" v-model="textValue"/>
      <Input lg label="Large" v-model="textValue"/>
      <Input
        md
        help="This is an explanation of what the field is used for."
        icon="search"
        label="Icon, placeholder and help text"
        placeholder="Search"
        v-model="textValue"
      />
      <Input
        sm
        disabled
        label="Disabled input"
        placeholder="Disabled"
        v-model="textValue"
      />
      <Input
        md
        label="Input with errors"
        :validators="demoValidators"
        v-model="textValue"
      />
      <br />

      Date inputs:<br />
      <Input
        sm
        type="date"
        label="Date input"
        v-model="dateValue"
      />
      <Input
        sm
        type="date"
        label="Min and max dates"
        placeholder="Date"
        :minDate="new Date('2019-02-16')"
        :maxDate="new Date('2019-02-25')"
        v-model="dateValue2"
      />
      <Input
        sm
        type="date"
        label="N days min/max range"
        placeholder="Date"
        :dateRange="{min: 5, max: 10}"
        v-model="dateValue3"
      />
      <Input
        sm
        type="date"
        label="Modal"
        datepickerPosition="modal"
        placeholder="Date"
        v-model="dateValue4"
      />
      <br />

      Select:<br />
      <Input
        md
        type="select"
        placeholder="Select a value"
        v-model="selectValue"
        :options="[{
          title: 'Hello',
          value: 1,
        }, {
          value: 'World',
        }, {
          value: 'Hello World',
        }]"
      />
    </div>
  </div>
</template>

<script>
import Input from '../../components/Input'

let usage = `
Basic inputs:<br />
<Input sm label="Small" v-model="textValue"/>
<Input md label="Medium" v-model="textValue"/>
<Input lg label="Large" v-model="textValue"/>
<Input
  md
  help="This is an explation of what the field is used for."
  icon="search"
  label="Icon, placeholder and help text"
  placeholder="Search"
  v-model="textValue"
/>
<Input
  sm
  disabled
  label="Disabled input"
  placeholder="Disabled"
  v-model="textValue"
/>
<Input
  md
  label="Input with errors"
  :validators="demoValidators"
  v-model="textValue"
/>
<br />

Date inputs:<br />
<Input
  sm
  type="date"
  label="Date input"
  v-model="dateValue"
/>
<Input
  sm
  type="date"
  label="Min and max dates"
  placeholder="Date"
  :minDate="new Date('2019-02-16')"
  :maxDate="new Date('2019-02-25')"
  v-model="dateValue2"
/>
<Input
  sm
  type="date"
  label="N days min/max range"
  placeholder="Date"
  :dateRange="{min: 5, max: 10}"
  v-model="dateValue4"
/>
<Input
  md
  type="select"
  placeholder="Select a value"
  v-model="selectValue"
  :options="[{
    title: 'Hello',
    value: 1,
  }, {
    value: 'World',
  }, {
    value: 'Hello World',
  }]"
/>
`.slice(1)

export default {
  name: "InputDemo",
  components: {Input},
  data: () => ({
    usage,
    textValue: '',
    dateValue: new Date(),
    dateValue2: null,
    dateValue3: null,
    dateValue4: null,
    selectValue: null,
    demoValidators: [
      {
        name: 'required',
        message: 'The field is required',
        validator: value => !!value
      },
      {
        name: 'long-error',
        message: `
          Long error message: Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam mollis ullamcorper rutrum. Pellentesque
          rutrum consectetur nulla, eget euismod justo vehicula
        `,
        validator: () => false
      },
    ]
  })
}
</script>

<style lang="less" scoped>
.input-demo {
  .input {
    margin-bottom: 60px;
  }
}
</style>
