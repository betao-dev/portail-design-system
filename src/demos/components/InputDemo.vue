<template>
  <div class="row-col input-demo">
    <h3>Input</h3>

    A styled input with an ability to set icon and validation.

    <h4>Usage guidlines</h4>
    Input fields can be used either standalone or grouped.

    <p>
      Fields can be in 3 different widths:
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

    <h4>Input general properties</h4>

    <ul>
      <li>disabled - Boolean. Is input disabled. Passed directly to the input</li>
      <li>help - String. Text for the tooltip at the bottom of the input</li>
      <li>helpLabel - String. Text for the tooltip label</li>
      <li>icon - String. Icon name for icons from src/icons folder or an svg code</li>
      <li>label - String. Label at the top of the input</li>
      <li>lang - String. BCP 47 code. Language to be used in the datepicker
        for month names and weekday labels. Can be set globally with
        $root.locale. This property overrides global setting</li>
      <li>lg - Boolean. Large size - 464px</li>
      <li>md - Boolean. Medium size - 252px</li>
      <li>sm - Boolean. Small size -  144px</li>
      <li>placeholder - String. Passed directly to the input</li>
      <li>type - String. Passed to the input with type_ computed property.</li>
      <li>
        <p>validators - Array of validator Objects. Each Object should
          have three fields:</p>
        <ul>
          <li>name (String) - Validator id</li>
          <li>message (String) - Error message that shown when validation fails</li>
          <li>validator (function) - Function that takes input value as an argument</li>
        </ul>

        <p>
          and returns true/false.
        </p>

        <p> When multiple validators fail, only one error is displayed, determined
          by their order in the array</p>
      </li>
    </ul>

    <h4>Date</h4>

    <ul>
      <li>minDate - Date. Earliest selectable day for the datepicker</li>
      <li>maxDate - Date. Latest selectable day for the datepicker</li>
      <li>dateRangeStart - Date. Point of reference for the dateRange property</li>
      <li>
        <p>dateRange - Object. An alternative to minDate/maxDate. It should have props:</p>
        <ul>
          <li> min - calendar days in the past from the dateRangeStart</li>
          <li> max - calendar days in the future from the dateRangeStart</li>
        </ul>
      </li>
      <li>datepickerPosition - String. Forwarded to datepicker dropdown position</li>
    </ul>

    <h4>Select</h4>

    <p>Options for select could be setted by property <i>options</i>.</p>

    <h4>Events</h4>

    <p>
      validation - Emitted when the input value changes. The event payload is
      an array of the following structure:
    </p>

    <pre>[['validator.name', isValid], ...]</pre>

    <h4>Modal</h4>

    <p> Input value is updated through v-model directive </p>

    <pre v-highlightjs="usage"><code class="html"></code></pre>

    <div class="input-component-demo">
      <div class="label">Basic inputs:</div>

      <div class="input-wrapper">
        <Input sm label="Small" v-model="textValue"/>
      </div>

      <div class="input-wrapper">
        <Input md label="Medium" v-model="textValue"/>
      </div>

      <div class="input-wrapper">
        <Input lg label="Large" v-model="textValue"/>
      </div>

      <div class="input-wrapper">
        <Input
          class="test-width"
          md
          help="This is an explanation of what the field is used for."
          icon="search"
          label="Icon, placeholder and help text"
          placeholder="Search"
          v-model="textValue"
        />
      </div>

      <div class="input-wrapper">
        <Input
          sm
          disabled
          label="Disabled input"
          placeholder="Disabled"
          v-model="textValue"
        />
      </div>

      <div class="input-wrapper">
        <Input
          md
          label="Input with errors"
          :validators="demoValidators"
          v-model="textValue"
        />
      </div>

      <div class="label">
        Date inputs:
      </div>

      <div class="input-wrapper">
        <Input
          sm
          type="date"
          label="Date input"
          v-model="dateValue"
        />
      </div>

      <div class="input-wrapper">
        <Input
          sm
          type="date"
          label="Min and max dates"
          placeholder="Date"
          :minDate="new Date('2019-02-16')"
          :maxDate="new Date('2019-02-25')"
          v-model="dateValue2"
        />
      </div>

      <div class="input-wrapper">
        <Input
          sm
          type="date"
          label="N days min/max range"
          placeholder="Date"
          :dateRange="{min: 5, max: 10}"
          v-model="dateValue3"
        />
      </div>

      <div class="input-wrapper">
        <Input
          type="date"
          label="Modal"
          datepickerPosition="modal"
          placeholder="Date"
          v-model="dateValue4"
        />
      </div>

      <div class="label">
        Select:
      </div>

      <div class="input-wrapper">
        <Input
          type="select"
          placeholder="Select a value"
          v-model="selectValue"
          :options="[{
            title: 'Hello',
            value: 1,
          }, {
            value: 'World',
          }]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Input from '../../components/Input'

let usage = `
  <div class="label">Basic inputs:</div>

      <div class="input-wrapper">
        <Input sm label="Small" v-model="textValue"/>
      </div>

      <div class="input-wrapper">
        <Input md label="Medium" v-model="textValue"/>
      </div>

      <div class="input-wrapper">
        <Input lg label="Large" v-model="textValue"/>
      </div>

      <div class="input-wrapper">
        <Input
          class="test-width"
          md
          help="This is an explanation of what the field is used for."
          icon="search"
          label="Icon, placeholder and help text"
          placeholder="Search"
          v-model="textValue"
        />
      </div>

      <div class="input-wrapper">
        <Input
          sm
          disabled
          label="Disabled input"
          placeholder="Disabled"
          v-model="textValue"
        />
      </div>

      <div class="input-wrapper">
        <Input
          md
          label="Input with errors"
          :validators="demoValidators"
          v-model="textValue"
        />
      </div>

      <div class="label">
        Date inputs:
      </div>

      <div class="input-wrapper">
        <Input
          sm
          type="date"
          label="Date input"
          v-model="dateValue"
        />
      </div>

      <div class="input-wrapper">
        <Input
          sm
          type="date"
          label="Min and max dates"
          placeholder="Date"
          :minDate="new Date('2019-02-16')"
          :maxDate="new Date('2019-02-25')"
          v-model="dateValue2"
        />
      </div>

      <div class="input-wrapper">
        <Input
          sm
          type="date"
          label="N days min/max range"
          placeholder="Date"
          :dateRange="{min: 5, max: 10}"
          v-model="dateValue3"
        />
      </div>

      <div class="input-wrapper">
        <Input
          type="date"
          label="Modal"
          datepickerPosition="modal"
          placeholder="Date"
          v-model="dateValue4"
        />
      </div>

      <div class="label">
        Select:
      </div>

      <div class="input-wrapper">
        <Input
          type="select"
          placeholder="Select a value"
          v-model="selectValue"
          :options="[{
            title: 'Hello',
            value: 1,
          }, {
            value: 'World',
          }]"
        />
      </div>
`.slice(1)

export default {
  name: "InputDemo",
  components: {Input},
  data: () => ({
    usage,
    textValue: '',
    selectValue: '',
    dateValue: new Date(),
    dateValue2: null,
    dateValue3: null,
    dateValue4: null,
    emailValue: null,
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
  @import "../../styles/vars";

  .input-demo {
  .input-component-demo {
    display: flex;
    flex-wrap: wrap;

    .input-wrapper {
      .flex-space-around(16px);

      @media @screen-small {
        .flex-space-around(0.5em);
      }
    }

    .label {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
