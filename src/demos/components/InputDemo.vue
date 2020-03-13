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
      Grouped fields do not have any fixed widths as their width are pre-defined
      by the layout and they always have 16px margin between them.
    </p>

    <h4>Validation</h4>

    <p>
      When input field begin validation, it is emit event <b>@validation</b>
      <br />
      <i>@return</i> Boolean, is valid field or no.
    </p>

    <p>
      All inputs are listen <b>@validate</b> event, which will run validation
      inside input, even if this input field was not touched.

      <i>@emit</i> event @validation
    </p>

    <p>
      If you need validate some field(s) separately, you can specify validation
      by name property. <br />
      Input with name property will be listen event <b>@validate{name}</b>.
      <br /><br />

      <i
        >Example:
        <br />
        name: 'test', <br />
        listener = 'validateTest'
      </i>
    </p>
    <Description compnent-name="Input"></Description>
    <Collapser :opened.sync="openUsage" label="Usage">
      <pre v-highlightjs="usage"><code class="html"></code></pre>
    </Collapser>

    <div class="input-component-demo">
      Basic inputs:<br />
      <Input
        sm
        required
        label="Small"
        icon="search-solid"
        icon-color="gray-500"
        icon-size="18px"
        v-model="textValue"
      />
      <Input md label="Medium" v-model="textValue" required />
      <Input
        lg
        icon="search-solid"
        icon-size="16px"
        label="Large"
        v-model="textValue"
      />
      <Input md label="Mask: 12/20" v-mask="'##/##'" v-model="maskValue" />
      <!-- eslint-disable -->
      <Input
        md
        icon="search-solid"
        icon-color="gray-500"
        icon-size="18px"
        label="Icon, placeholder and help text"
        placeholder="Search"
        v-model="textValue"
      >
        <div slot="help">
          This is an explanation of what the field is used for.
        </div>
        <!-- eslint-disable-next-line vue/max-attributes-per-line -->
      </Input>

      <Input
        md
        label="Clear content example:"
        placeholder="Search"
        v-model="textValue"
        icon="close"
        icon-color="gray-500"
        icon-size="16px"
        :active-icon="true"
        @icon-click="clearContent"
      />

      <Input
        md
        help="This is an explanation of what the field is used for."
        iconRight="search"
        label="Icon, placeholder and help text"
        placeholder="Search"
        v-model="textValue"
      />
      <Input
        lg
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
      <Input slideLabel md label="Slide label" v-model="slideTextValue" />
      <br />

      <Input
        md
        icon="euro_symbol"
        iconSize="16px"
        iconColor="#3f4352"
        textAlign="right"
        label="Euro Input"
        placeholder="Input Currency"
        v-model="currencyValue"
      />

      <Input
        md
        v-model="cvvValue"
        type="number"
        :maxlength="3"
        placeholder="xxx"
        label="CVV"
        help="This is an explanation of what the field is used for."
      />

      <Input
        md
        v-model="cardNumber"
        type="payment-card"
        :maxlength="19"
        label="Card number"
      />
      <br />

      <Input
        md
        v-model="password"
        type="password"
        :confirmModel="confirmPassword"
        placeholder="Placeholder"
        label="New Password"
        :validators="passwordValidators"
        :show-validations="passwordShowErrors.firstField"
        @lastKeyDownDelay="onlastKeyDownDelay('firstField')"
      />

      <Input
        md
        v-model="confirmPassword"
        type="password"
        :confirmModel="password"
        placeholder="Placeholder"
        label="Confirm the new password"
        :validators="confirmPasswordValidators"
        :show-validations="passwordShowErrors.secondField"
        @lastKeyDownDelay="onlastKeyDownDelay('secondField')"
      />
      <br />

      <Button alt @click="validate()">
        VALIDATE
      </Button>
    </div>
  </div>
</template>

<script>
import Input from '../../components/Input';
import Button from '../../components/Button';
import Description from '../../descriptions/Description';
import Collapser from '../../components/Collapser.vue';
import { InputData } from '../../static/index';

import _ from 'lodash';

export default {
  name: 'InputDemo',
  components: { Input, Button, Description, Collapser },
  data() {
    return {
      openUsage: true,
      usage: InputData.usage,
      textValue: '',
      maskValue: '',
      currencyValue: 20,
      slideTextValue: 'Test text',
      demoValidators: [
        {
          name: 'required',
          message: this.dsTranslate('Field Required'),
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
        }
      ],
      passwordValidators: [
        {
          name: 'match-fields-values',
          message: `The value of field doesn't match to values related fields`,
          validator: (value, confirmPassword) =>
            !_.isUndefined(value) &&
            !_.isUndefined(confirmPassword) &&
            value == confirmPassword
        }
      ],
      confirmPasswordValidators: [
        {
          name: 'match-fields-values',
          message: `The value of field doesn't match to values related fields`,
          validator: (value, confirmPassword) =>
            !_.isUndefined(value) &&
            !_.isUndefined(confirmPassword) &&
            value == confirmPassword
        }
      ],
      cvvValue: null,
      cardNumber: null,
      password: undefined,
      confirmPassword: undefined,
      passwordShowErrors: {
        firstField: false,
        secondField: false
      },
      showErrorSupport: {
        firstField: false,
        secondField: false
      }
    };
  },
  methods: {
    validate() {
      const event = new CustomEvent('validate', {});
      document.dispatchEvent(event);
    },
    onlastKeyDownDelay(field) {
      this.showErrorSupport[field] = true;
      this.checkShowErrors();
    },
    checkShowErrors() {
      let { firstField, secondField } = this.showErrorSupport;
      let err = this.passwordShowErrors;

      if (firstField === true && secondField === true) {
        err.firstField = err.secondField = true;
      }
    },
    clearContent() {
      this.textValue = '';
    }
  }
};
</script>

<style lang="less" scoped>
.input-demo {
  .ds-input {
    margin-right: 32px;
    margin-bottom: 60px;
  }
}
</style>
