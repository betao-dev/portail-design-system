let usage = `
  <NumberRange
    sm
    class="example"
    prefix="€"
    placeholder="Number Range Select"
    :minLimit="0"
    :maxLimit="200"
    :min="0"
    :max="0"
    @change:range="rangeUpdate"
  />

  <NumberRange
    md
    class="example"
    prefix="€"
    placeholder="Number Range Select"
    :minLimit="0"
    :maxLimit="200"
    :min="0"
    :max="0"
    @change:range="rangeUpdate"
  />

  <NumberRange
    lg
    class="example"
    prefix="€"
    placeholder="Number Range Select"
    :minLimit="0"
    :maxLimit="200"
    :min="0"
    :max="0"
    @change:range="rangeUpdate"
  />
`.slice(1);

export default {
  usage
};
