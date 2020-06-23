let usage = `
Basic inputs:<br />
<Input sm label="Small" v-model="textValue"/>
<Input md label="Medium" v-model="textValue"/>
<Input lg label="Large" v-model="textValue"/>
<Input md label="Mask: 12/20" v-mask="'##/##'" v-model="maskValue"/>

<Input
  md
  help="This is an explanation of what the field is used for."
  icon="search-solid"
  icon-color="gray-500"
  icon-size="18px"
  label="Icon, placeholder and help text"
  placeholder="Search"
  v-model="textValue"
/>

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

<Input
  sm
  v-model="cvvValue"
  type="number"
  :maxlength="3"
  placeholder="xxx"
  label="CVV"
  help="This is an explanation of what the field is used for."
/>

<Input
  v-model="cardNumber"
  type="payment-card"
  :maxlength="19"
  label="Card number"
/>

<Input
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
  v-model="confirmPassword"
  type="password"
  :confirmModel="password"
  placeholder="Placeholder"
  label="Confirm the new password"
  :validators="confirmPasswordValidators"
  :show-validations="passwordShowErrors.secondField"
  @lastKeyDownDelay="onlastKeyDownDelay('secondField')"
/>

<Input
  class="input-tva"
  label-alt
  lg
  v-model="tva"
  width="388px"
  label="Numéro de TVA"
  placeholder="Entrez numéro de TVA"
>
  <div class="tva-block-wrapper">
    <div class="tva-block">
      FR
    </div>
  </div>
</Input>
`.slice(1);

export default {
  usage
};
